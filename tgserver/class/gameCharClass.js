const baseClass = require("./baseClass");

const useful = require('../utils/useful');
const config = require('../config/default');
const CONSTANT = require('../config/constant');
const ERROR_CODE = require('../config/errorCode');


///////////////////////////////////////////////////////////////
//
// 게임 계정 클래스
//
class gameCharClass extends baseClass {

   ///////////////////////////////////////////////////////////////
   //
   // 게임 계정이 있는지 체크용
   // @returns {user} 게임 계정 정보
   //
   async getGameChar(account_no) {
      try {
         this.includeHandler(['mysqlHandler']);
         let user = null;
         let select = `char_no, account_no, char_name`;
         const query = `SELECT ${select} FROM tbl_character WHERE account_no ='${account_no}'`;
         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  result = result[0];
                  user = {
                     char_no: result.char_no,
                     account_no: result.account_no,
                     char_name: result.char_name,
                  };
               }
            })
            .catch((err) => {
               throw err;
            });
         return user;
      } catch (err) {
         throw err;
      }
   }


   ///////////////////////////////////////////////////////////////
   //
   // 게임 계정 케릭명 체크 함수 
   // @param gamechar_name
   // @returns {user} 게임 계정 정보
   // @returns {Promise<*>}
   //
   async checkGameUserName(gamechar_name) {
      this.includeHandler(['errorHandler', 'mysqlHandler']);

      if (typeof gamechar_name !== 'string') {
         this.errorHandlerClass.throwError(2039, "invalid type gamechar_name "); // 유저 이름 타입이 string이 아님.
      }

      gamechar_name = useful.zeroSpaceFix(gamechar_name);

      let first_string = gamechar_name.charAt(0);
      let verify = first_string.replace(/[a-zA-Z]/ug, ''); // \u4e00-\u9eff
      if (verify !== '') {
         this.errorHandlerClass.throwError(2030, 9000185); // 첫 글자는 문자여야 함.
      }
      verify = gamechar_name.replace(/[a-zA-Z0-9]/ug, ''); // \u4e00-\u9eff
      if (verify !== '') {
         this.errorHandlerClass.throwError(2031, 9000186); // 허용하지 않는 문자가 포함되어 있음.
      }

      let length = 0, add_length = 0;
      for (let c of [...gamechar_name]) {
         add_length = (c.replace(/[가-힣]/ug, '') !== '') ? 1 : 2;
         length = useful.decimal(length).plus(add_length).toNumber();
      }
      if (length > 10) {
         this.errorHandlerClass.throwError(2032, 9000187);
      }
      if (length < 3) {
         this.errorHandlerClass.throwError(2033, 9000188);
      }

      try {
         let select = `nickname`;
         const query = `SELECT ${select} FROM tbl_character WHERE nickname ='${gamechar_name}'`;
         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  result = result[0];
                  gamechar_name = result.char_name;
               }
               else {
                  gamechar_name = null;
               }
            })
            .catch((err) => {
               throw err;
            });
         return gamechar_name;
      } catch (err) {
         throw err;
      }
   }



   ///////////////////////////////////////////////////////////////
   //
   // 회원을 생성한다.
   // @param {Object} gameuser_id 계정 기본 아이디
   //
   // 
   // @param {Object} param body의 파라미터
   // @param {String} param.mb_id 계정 id
   // @param {String} param.mb_password 계정 비밀번호
   // @param {String} param.mb_name 이름
   // @param {String} param.mb_nick 닉네임
   // @param {String} param.mb_email 이메일
   // @param {String} param.mb_hp 휴대폰번호
   // @param {String} param.mb_zip 우편번호
   // @param {String} param.mb_addr1 주소
   //
   // @returns {Object} 회원 정보
   // @memberOf account
   // 
   async createGameChar(account_no, gamechar_name) {
      try {
         this.includeHandler(['mysqlHandler']);

         // 계정생성
         let columns = 'account_no, nickname';
         let values = `'${account_no}', '${gamechar_name}'`;
         let bCreate = false;

         let query = `INSERT INTO tbl_character (${columns}) VALUES (${values})`;
         await this.mysqlHandlerClass
         .query(CONSTANT.DB.GAME, query)
         .then(async (result) => {
            if (result.affectedRows > 0) {
               bCreate = true;
            }
          })
         .catch((err) => {
            throw err;
         });

         return bCreate;
      } catch (err) {
         throw new Error(ERROR_CODE.USER_LOGIN_1006); // 계정생성에 실패했습니다.
      }
   }


}

module.exports = new gameCharClass();
