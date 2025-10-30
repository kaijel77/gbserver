const baseClass = require("./baseClass");

const moment = require('moment');
const jwt = require('jsonwebtoken');

const useful = require('../utils/useful');
const config = require('../config/default');
const CONSTANT = require('../config/constant');
const ERROR_CODE = require('../config/errorCode');


///////////////////////////////////////////////////////////////
//
// 게임 계정 클래스
//
class AccountClass extends baseClass {

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
            let select = `ta.account_no, ta.id, ta.password, ta.withdraw, ta.withdraw_date, ta.block, ta.block_date, COALESCE(tc.nickname, '') AS nickname`;
            const query = `SELECT ${select} FROM tbl_account ta LEFT JOIN tbl_character tc ON ta.account_no = tc.account_no WHERE id='${gameUser_id}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    user = {
                        account_no: result.account_no,
                        user_id: result.id,
                        password: result.password,
                        nickname: result.nickname
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
            await this.mysqlHandlerClass
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
            throw err; // 계정생성에 실패했습니다.
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 토큰용 Payload 생성
    // @param data
    // @returns {*&{exp: number, iat: number}}
    //
    generatePayload(data) {
        let create_time = useful.decimal(moment.now());
        return {
            iat: create_time.toNumber(),
            exp: create_time.plus(86400).toNumber(),
            ...data
        };
    }


    ///////////////////////////////////////////////////////////////
    //
    // 로그인 토큰 생성 및 업데이트
    // @param account_info
    // @returns {Promise<*>}
    //
    async getLoginToken(account_info) {
        try {
            this.includeHandler(['redisHandler']);

            // 토큰 발행 전 이전 토큰 삭제
            let old_token = await this.redisHandlerClass.get(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id);
            if (old_token) {
                await this.redisHandlerClass.del(CONSTANT.REDIS_KEY.TOWN_TOKEN + old_token);
            }

            // 신규 토큰 발행
            let payload = this.generatePayload(account_info);
            let token = jwt.sign(payload, config.jwtSecretKey);

            let timestamp = Date.now();

            // Db 처리가 모두 성공 했다면 마지막에 Redis 기록.
            await this.redisHandlerClass.set(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id, token, 'EX', 86400 * 7); // 토큰을 Redis 저장. 세션 겸용 이므로 유효 시간 필수.
            await this.redisHandlerClass.set(CONSTANT.REDIS_KEY.TOWN_TOKEN + token,
                JSON.stringify({ // 소켓 서버 연결을 위한 세션 등록
                    user_id: account_info.user_id,
                    alliance_pk: timestamp,
                }), 'EX', 86400 * 7);

            return token;
        } catch (err) {
            throw err; // 계정생성에 실패했습니다.
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 최종 접속일자 업데이트
    // @param user_i
    // @returns {Promise<*>}
    //
    async lastAccessUpdate(account_no, authtype) {
        try {
            this.includeHandler(['mysqlHandler']);
            const nowTime = useful.getUTCDateTime(new Date());
            let set = `last_access_date = "${nowTime}"`;
            const query = `UPDATE tbl_account SET ${set} WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                }
            })
            .catch((err) => {
                throw err;
            });
            return nowTime;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // JWT 토큰 검증
    // @param token
    // @returns {Promise<*>}
    //
    async verifyToken(token) {
        if (!token) {
            throw new Error("authToken authentication failed.");
        }
        return jwt.verify(token, config.jwtSecretKey);
    }



    ///////////////////////////////////////////////////////////////
    //
    // 계정 탈퇴/ 탈퇴 취소 처리
    // @param account_no
    // @param withdraw
    // @returns {Promise<*>}
    //
    async update_AccountWithdraw(account_no, withdraw, nowTime) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `withdraw = "${withdraw}", withdraw_date = "${nowTime}"`;
            const query = `UPDATE tbl_account SET ${set} WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                    bUpdate = true;
                }
            })
            .catch((err) => {
                throw err;
            });
            return bUpdate;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new AccountClass();
