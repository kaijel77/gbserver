const config = require('../config/default');
const CONSTANT = require('../config/constant');
const crypto = require("crypto");



///////////////////////////////////////////////////////////////////////////
//
// Router 용 클래스
//
class tgRouteHandler {
   constructor() {
      if (this.instance) {
         return this.instance;
      }
      this.request = null;
      this.response = null;
      this.socket = null;
      this.cryptAUTHKEY = '';
      this.cryptSOCKETKEY = '';

      // 필요 클래스
      this.mongoClass = null;
      this.cacheClass = null;
      this.redisSocketClass = null;
      this.achievementClass = null;
      this.errorHandlerClass = null;
      this.conditionClass = null;

      this.instance = this;
      return this.instance;
   }

   includeClass(classes = []) {
      for (let name of classes) {
         if (!this?.[`${name}Class`]) {
            this[`${name}Class`] = require(`./${name}`);
         }
      }
   }
   includeHandler(classes = []) {
      for (let name of classes) {
         if (!this?.[`${name}`]) {
            this[`${name}`] = require(`../Handler/${name}`);
         }
      }
   }

   
   ///////////////////////////////////////////////////////////////////////////
   //
   // 접속 확인
   // @returns {Promise<void>}
   //
   async server_connectCheck(account_info) {
      this.includeHandler(['mysqlHandler', 'errorHandler']);

      //나중에 DB 또는 Redis 에서 서버 접속가능 여부 체크
      //if (setting_info['connect_block'] === false) {
      //   return ;
      //}

      // 임시로 넘어간다.
      return;
      if (account_info === null || account_info === undefined) {
         this.errorHandler.throwError(1004, 9999999); // 게임 점검 진행 중 입니다.
      }
      else {
         // DB에서 화이트 리스트에 정보가 있는지 체크 해서 있으면 무조건 접속을 시킨다.
         let white = null;
         if (white === null || white === undefined) {
            this.errorHandler.throwError(1004, 9999999); // 권한이 없습니다.
         }
         if (white.whitetype == 0) {
            this.errorHandler.throwError(1004, 9999999); // 게임 점검 진행 중 입니다.
         }
      }
   }


   // 암호화                                      
   encrypt(plainText) {
      let strText = JSON.stringify(plainText);
      const keyString = CONSTANT.CRYPT_KEY;
      const iv = crypto.randomBytes(CONSTANT.CRYPT_IV_SIZE);
      const cipher = crypto.createCipheriv("aes-256-cbc", keyString, iv);
      let cipherText = cipher.update(Buffer.from(strText, "utf8"));
      cipherText = Buffer.concat([cipherText, cipher.final()]);
      const combinedData = Buffer.concat([iv, cipherText]);
      const combinedString = combinedData.toString("base64");
      return combinedString;
   }



   /*
require('dotenv').config();
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPT_KEY, 'utf8');
const iv = Buffer.from(process.env.ENCRYPT_IV, 'utf8');

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]).toString('base64');
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64')), decipher.final()]).toString('utf8');
}
   */


   // 암호화                                      
   encrypt(plainText) {
      let strText = JSON.stringify(plainText);
      const keyString = CONSTANT.CRYPT_KEY;
      const iv = crypto.randomBytes(CONSTANT.CRYPT_IV_SIZE);
      const cipher = crypto.createCipheriv("aes-256-cbc", keyString, iv);
      let cipherText = cipher.update(Buffer.from(strText, "utf8"));
      cipherText = Buffer.concat([cipherText, cipher.final()]);
      const combinedData = Buffer.concat([iv, cipherText]);
      const combinedString = combinedData.toString("base64");
      return combinedString;
   }

   /**
    * 복호화 작업
    */
   decrypt(combinedString) {
      const keyString = CONSTANT.CRYPT_KEY;
      const combinedData = Buffer.from(combinedString, "base64");
      const iv = Buffer.alloc(CONSTANT.CRYPT_IV_SIZE);
      const cipherText = Buffer.alloc(combinedData.length - iv.length);
      combinedData.copy(iv, 0, 0, iv.length);
      combinedData.copy(cipherText, 0, iv.length);
      const decipher = crypto.createDecipheriv("aes-256-cbc", keyString, iv);
      let plainText = decipher.update(cipherText, "utf8");
      plainText += decipher.final("utf8");
      return plainText;
   }


   ///////////////////////////////////////////////////////////////////////////
   //
   // 성공 데이터 정리
   // @param data
   // @returns {{data: {}, errorCode: number, isSuccess: boolean}}
   //
   successJson(data = {}, isCrypt = true) {

//      if (isCrypt)
//         data = this.encrypt(data);

      return {
         errorCode: 0,
         isSuccess: true,
         data: data
      };
   }


   ///////////////////////////////////////////////////////////////////////////
   //
   // 오류 데이터 정리
   // @param code
   // @param message
   // @param message
   // @returns {{errorCode: (*|number), isSuccess: boolean}}
   //
   errorJson(code, serverCode, message, data = {}) {
      let debug_data = {};
      if (config.debug_mode) {
         debug_data = {
            message: message,
            data: data
         }
      }
      return {
         isSuccess: false,
         errorCode: (code) ? code : 0,
         serverCode: (serverCode) ? serverCode : 0,
         ...debug_data
      };
   }

   /**
    * API 반환 시 기본
    * @param result
    * @param data
    * @returns {{result, data: null}}
    */
   return(result, data = null) {
      this.includeHandler(['errorHandler']);
      if (result === false) {
         this.errorHandlerClass.addError(data);
      }
      return {
         result: result,
         data: (result === false) ? this.errorHandlerClass.error : data
      }
   }



   /**
    * API 필수 파라미터 확인
    * @param request
    * @param params
    * @returns {{}}
    */
   verifyParams(request, params) {
      this.includeHandler(['errorHandler']);
      let query = {};
      let body = (request.method === 'GET') ? request.query : (request.method === 'POST') ? request.body : (() => {
         this.errorHandler.throwError(1102, 9000008); // TODO 잘못된 타입의 Method
      })();
      if (!body) {
         return query;
      }

      if (Object.keys(body).length == 0) {
         return query;
      }

      if ((typeof body !== 'object' || !body['crypt'] || body['crypt'] === '')) {
         this.errorHandler.throwError(1100, 9000008);
      }
      let crypt = body['crypt'];

      let data = this.decrypt(crypt);

      let body2 = JSON.parse(data);

      if (typeof params === 'object' && Array.isArray(params)) {
         for (let param of params) {
            let p = param.split(':');
            if (typeof p[0] === 'string' && !p[1]) { // 필수적 파라미터
               if ((typeof body2 !== 'object' || !body2[p[0]] || body2[p[0]] === '')) {
                  this.errorHandler.throwError(1100, 9000008);
               }
               query[p[0]] = body2[p[0]];
            } else if (typeof p[0] === 'string' && p[1] === 'opt') { // 선택적 파라미터 key:opt
               query[p[0]] = (body2[p[0]]) ? body2[p[0]] : null;
            }
            else if (typeof p[0] === 'string' && p[1] === 'optl') { // 선택적 파라미터 key:opt

               if (body2[p[0]]) {
                  let test = body2[p[0]].split('-');
                  query[p[0]] = test;
               }
               else {

                  query[p[0]] = null;
               }
            }
         }
      }

      return query;
   }

}

module.exports = new tgRouteHandler();
