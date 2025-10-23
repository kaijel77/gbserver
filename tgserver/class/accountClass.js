const moment = require('moment');
const jwt = require('jsonwebtoken');

const useful = require('../utils/useful');
const config = require('../config/default');

const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////
//
// 게임 계정 클래스
//
class AccountClass {
   constructor() {
      if (this.instance) {
         return this.instance;
      }
      // 사용 class
      this.mysqlHandler = null;

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


   ///////////////////////////////////////////////////////////////
   //
   // 게임 계정이 있는지 체크용
   // @param {Object} gameuser_id 계정 기본 아이디
   // @returns {user} 게임 계정 정보
   //
   async getGameAccount(gameUser_id) {
      try {
         this.includeHandler(['mysqlHandler']);

         let user = null;
         let select = `account_no, id, password`;
         const query = `SELECT ${select} FROM tbl_account WHERE id='${gameUser_id}'`;

         await this.mysqlHandler
         .query(CONSTANT.DB.GAME, query)
         .then((result) => {
            if (result.length > 0) {
               result = result[0];
               user = {
                  account_no: result.account_no,
                  user_id: result.id,
                  password: result.password,
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
   async createGameAccount(gameuser_id) {
      try {
         this.includeHandler(['mysqlHandler']);

         // 계정생성
         let columns = 'id, password';
         let values = `'${gameuser_id}', '${gameuser_id}'`;

         let query = `INSERT INTO tbl_account (${columns}) VALUES (${values})`;
         await this.mysqlHandler
         .query(CONSTANT.DB.GAME, query)
         .then(async (result) => { })
         .catch((err) => {
            throw err;
         });

         let account = await this.getGameAccount(gameuser_id);
         if (Object.keys(account).length === 0) {
            throw new Error(ERROR_CODE.USER_LOGIN_1006); // 계정생성에 실패했습니다.
         }

         return account;
      } catch (err) {
         throw new Error(ERROR_CODE.USER_LOGIN_1006); // 계정생성에 실패했습니다.
      }
   }


   /**
    * 토큰용 Payload 생성
    // @param data
    // @returns {*&{exp: number, iat: number}}
    */
   generatePayload(data) {
      let create_time = useful.decimal(moment.now());
      return {
         iat: create_time.toNumber(),
         exp: create_time.plus(86400).toNumber(),
         ...data
      };
   }


   /**
    * 로그인 토큰 생성 및 업데이트
    // @param account_info
    // @returns {Promise<*>}
    */
   async getLoginToken(account_info) {
      try {
         this.includeHandler(['redisHandler']);

         // 토큰 발행 전 이전 토큰 삭제
         let old_token = await this.redisHandler.get(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id);
         if (old_token) {
            await this.redisHandler.del(CONSTANT.REDIS_KEY.TOWN_TOKEN + old_token);
         }

         // 신규 토큰 발행
         let payload = this.generatePayload(account_info);
         let token = jwt.sign(payload, config.jwtSecretKey);

         let timestamp = Date.now();

         // Db 처리가 모두 성공 했다면 마지막에 Redis 기록.
         await this.redisHandler.set(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id, token, 'EX', 86400 * 7); // 토큰을 Redis 저장. 세션 겸용 이므로 유효 시간 필수.
         await this.redisHandler.set(CONSTANT.REDIS_KEY.TOWN_TOKEN + token,
            JSON.stringify({ // 소켓 서버 연결을 위한 세션 등록
               user_id: account_info.user_id,
               alliance_pk: timestamp,
            }), 'EX', 86400 * 7);

         return token;
      } catch (err) {
         throw new Error(err); // 계정생성에 실패했습니다.
      }


      /*
      this.includeHandler(['redisClient', 'useful']);
      
      // 게임베이스 ID는 제외시켜야함.
      account_info = useful.exceptKey(account_info, ['gamebase_id']);
      
      */
   }



   /**
    * 최종 접속일자 업데이트
    // @param user_id
    // @returns {Promise<*>}
    */
   async lastAccessUpdate(user_id, authtype) {
      //      this.includeClass(['mongo', 'useful']);
      //      let last_access = await this.mongoClass.game.select('account').updateReturn({ user_id: user_id }, {'$set': { last_access_date: this.usefulClass.getNowTime(), authtype: authtype }});
      //      return last_access['last_access_date'];
      return null;
   }

   /**
    * 커버넌트 차일드 JWT 토큰 검증
    // @param token
    // @returns {Promise<*>}
    */
   async verifyToken(token) {
      if (!token) {
         throw new Error("authToken authentication failed.");
      }
      return jwt.verify(token, config.jwtSecretKey);
   }
}

module.exports = new AccountClass();
