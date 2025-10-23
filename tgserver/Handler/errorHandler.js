const config = require('../config/default');
const useful = require('../utils/useful');

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
      throw this.setError(code, textCode, info);
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

     if (err.name !== 'System') {   
         this.errorLog(err);
     }

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

}


module.exports = new errorHandler();