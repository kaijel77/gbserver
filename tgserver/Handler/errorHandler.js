const config = require('../config/default');
const useful = require('../utils/useful');
const ERR_CODE = require('../config/errorCode');


///////////////////////////////////////////////////////////////
// 
//  오류 관리 클래스 
//
class errorHandler {
   constructor() {
      if(this.instance) {
         return this.instance;
      }

      this.clearError();
      this.instance = this;
      return this.instance;
   }

   clearError() {
      this._err = null;
      this._error = {};
      this._errorCode = 0;
      this._serverCode = 0;
      this._errorMessage = '';
   }

   get error() {
      return this._error;
   }

   get errorMessage() {
      return this._errorMessage;
   }

   get errorCode() {
      return this._errorCode;
   }

   get serverCode() {
      return this._serverCode;
   }

   setError(code, textCode, info) {
      this._err = new Error(textCode);
      this._err.name = 'System'             // System 오류 인 경우에는 게임 내 오류.
      this._err.code = code;
      this._err.textCode = textCode;
      this._err.info = info;
      
      let error_message = textCode;          // 나중에 에러메시지테이블에 정보연동처리한다.
      this._err.message  = error_message;

      this.addError(this._err);
      return this._err;
   }

   
   throwError(code, textCode, info = '') {
        let test = this.setError(code, textCode, info); 
      throw test;
   }

   addError(err) {
      if (config.debug_mode && err.name !== 'System') {
         console.trace(err.code, err.name);
      }

      if(typeof err.code !== 'undefined') {
         this._errorCode = err.textCode;
         this._serverCode = err.code;
         this._errorMessage = err.message;         
      }

      let error = {};
      error['code'] = (! this._errorCode) ? err.textCode : this._errorCode;
      error['name'] = err.name;
      error['serverCode'] = err.code;
      error['info'] = err.info;
      error['message'] = err.message;
      error['stack'] = err.stack.split('\n');
      if (err?.req) {
         error['data'] = {
             user_id: err.req?.account_info?.user_id,
             router: err.req?.originalUrl,
             params: (err.req?.method === 'GET') ? err.req?.query : err.req?.body,
             'x-real-ip': err.req?.headers?.['x-real-ip'],
             'user-agent': err.req?.headers?.['user-agent']
         }
     }
     error['log_date'] = useful.getNowTime();

// OHTG_ING    if (err.name !== 'System') {   
         this.errorLog(err);
  //   }

     this._error = error;
   }
   
   
   errorLog (err) {
      const fs = require('fs');
      let text = `\n\n
log_time: ${useful.getDateTimeWithTz(useful.getNowTime(), 'YYYY-MM-DD HH:mm:ss')}
code: ${err.code}
servercode: ${err?.serverCode}
info: ${err?.info}
message: ${err.message}\n`;

      if (err?.req) {
          let params = (err.req?.method === 'GET') ? err.req?.query : err.req?.body;
          text = text + `user_id: ${err.req?.account_info?.user_id},
router: ${err?.req?.originalUrl}
params: ${JSON.stringify(params)}
x-real-ip: ${err?.req?.headers?.['x-real-ip']}
gb-user-id: ${err?.req?.headers?.['gb-user-id']}
user-agent: ${err?.req?.headers?.['user-agent']}\n`;
      }

      text = text + `stack: ${err.stack}`;

      let log_time = useful.getDateTimeWithTz(useful.getNowTime(), 'YYYY-MM-DD_HH');
      fs.appendFileSync(`./log/game_error_${log_time}.txt`, '\ufeff' + text, {encoding: 'utf8'});
  }

   ///////////////////////////////////////////////////////////////
   // 
   // 에러 정보 세팅 함수
   // @param {String} error_code 에러코드
   // @memberOf errorHandler
   //

    async #getErrorInfo (error_code) {
        try {
            let error = {};
            const mysqlHandler = require('./mysqlHandler');
            const CONSTANT = require('../config/constant');

            const query = `SELECT error_code, action_code, message_ko, message_en FROM error_code`
                +` WHERE error_code = ?`;
            const values = [error_code];

            await mysqlHandler.query(CONSTANT.DB.STATIC, query, values).then((res) => {
                if(res.length > 0){
                    error = res[0];
                }
            }).catch((err) => { console.log(err); });
            if(Object.keys(error).length > 0){
                this._error = {
                    "message": error.message_en,
                    "message_ko": error.message_ko,
                    "code": error.error_code,
                    "action": error.action_code
                };
            } else {
                // DB에 존재하지 않는 Error Code
                this._error = {
                    "message": 'Not in use',
                    "message_ko": 'DB에 존재하지 않는 Error Code, 서버 개발자에게 알려주세요!',
                    "code": error_code,
                    "action": 0
                };
            }
        } catch (err){
            console.log(err)
        }
    }  

   ///////////////////////////////////////////////////////////////
   // 
   // 에러 핸들러 함수, app.js에서 선언
   // @returns {function} 모든 API 후 에러 데이터 처리 함수
   // @memberOf errorHandler
   //
    wrapAsync () {
        return (async (error, req, res, next) => {
            try {
                console.info('$ errorHandler.wrapAsync');
                console.error(error);
                // error.message 가 코드면, 코드값 처리, 그 외에는 에러 메시지 반환
                let error_code = error.message;
                if(!error_code || isNaN(error_code)){
                    error_code = ERR_CODE.SERVER_9100;
                }
                await this.#getErrorInfo(error_code);
                res.send(this._error);
            } catch (err) { 
                res.send(error);
            }
        });
    }

}

/*
module.exports = new ErrorHandler();
*/
module.exports = new errorHandler();