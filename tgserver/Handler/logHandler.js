const useful = require('../utils/useful');
const ERROR_CODE = require('../config/errorCode');
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
// 게임 로그 클래스
///
class logClass  {
    constructor(request) {
        this.request = request;
    }

    includeClass (classes = []) {
        for (let name of classes) {
            if (! this?.[`${name}Class`]) {
                this[`${name}Class`] = require(`./${name}`);
            }
        }
    }

    includeHandler(classes = []) {
        for (let name of classes) {
            if (!this?.[`${name}Class`]) {
                this[`${name}Class`] = require(`../Handler/${name}`);
            }
        }
    }


    async createLogTable(){
        try {
            this.includeHandler(['mysqlHandler', 'errorHandler']);

            let nowdate = useful.getNowTime();
            const month2 = String(nowdate.getMonth()).padStart(2, "0");
            const month = String(nowdate.getMonth() + 1).padStart(2, "0");
            let tableName = 'tbl_logdata' + nowdate.getFullYear().toString()+month;

            let query = `CREATE TABLE ${tableName} (
                        log_no bigint NOT NULL AUTO_INCREMENT,
                        account_no bigint NOT NULL,
                        user_id varchar(45) NOT NULL,
                        command varchar(45) NOT NULL,
                        reason varchar(45) NOT NULL,
                        log_data varchar(3000) NOT NULL,
                        create_date datetime DEFAULT now(),
                        PRIMARY KEY (log_no),
                        KEY index_account_no (account_no),
                        KEY index_create_date (create_date)
                        ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                        `;
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.LOG, query)
            .then(async (result) => { })
            .catch((err) => {
                throw err;
            });

        } catch (err) {
            this.errorHandlerClass.setError(2032, 9000187);
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
    async createGameLog(account_info, command, reason, log_data = {}) {
        try {
            this.includeHandler(['mysqlHandler', 'errorHandler']);

            let nowdate = useful.getNowTime();
            const month = String(nowdate.getMonth() + 1).padStart(2, "0");
            let tableName = 'tbl_logdata' + nowdate.getFullYear().toString()+month;
            let strText = JSON.stringify(log_data);

            // 계정생성
            let columns = 'account_no, user_id, nickname, command, reason, char_level, log_data';
            let values = `'${account_info.account_no}', '${account_info.user_id}', '${account_info.nickname}', '${command}', '${reason}', 0, '${strText}'`;

            let query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.LOG, query)
            .then(async (result) => { })
            .catch((err) => {
                throw err;
            });

        } catch (err) {
            throw new Error(ERROR_CODE.USER_LOGIN_1006); // 계정생성에 실패했습니다.
        }
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_accountConn (account_info, reason) {

        this.createGameLog(account_info, 'accountConnect', reason, {
            log_date: useful.getNowTime(),
            ip_address: this.request._remoteAddress,
        });

    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_accountinfo (account_info, reason, log_data = {}) {

        this.createGameLog(account_info, 'accountInfo', reason, log_data);
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 대륙스테이즈 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_continentStage(account_info, reason, type, continent_id, stage_id, log_data = {}) {

        this.createGameLog(account_info, 'continentStage', reason, {
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            continent_id: continent_id, 
            stage_id : stage_id,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 빌딩 관련 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_Building(account_info, reason, type, building_id, current_level, next_level, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('building_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            building_id:building_id,
            current_level: current_level, 
            next_level : next_level,
            log_data: log_data,
        });
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 리소스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueCoupon(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('coupon_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }

    

    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueItem (account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('item_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 리소스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueVipInfo(account_info, reason, type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('vipinfo_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            log_data: log_data,
        });
    }
    

    ///////////////////////////////////////////////////////////////////////////
    // 리소스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueformation(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('formation_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueTimer (account_info, reason, type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('timer_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type: type,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueQuest (account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('quest_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueMailInfo (account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('letter_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueAttendance (account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('attendance_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueEvent (account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('event_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 패스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queuePass(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('pass_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });        
    }


    ///////////////////////////////////////////////////////////////////////////
    // 길드 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueGuild(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('guild_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 패스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_PurchaseGoods(account_info, reason, inappid, payment_seq, accessToken, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('purchasegoods_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
            inappid:inappid,
            payment_seq:payment_seq,
            accessToken:accessToken,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 패스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_Goods(account_info, reason, inappid) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('goods_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            inappid:inappid,
        });
    }        

    
    ///////////////////////////////////////////////////////////////////////////
    // 패스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_Colosseum(account_info, reason, log_data) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('colosseum_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data:log_data,
        });
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 보스 레이드 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_BossRaid(account_info, reason, bossraid_id, log_data) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('bossRaid_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            bossraid_id:bossraid_id,
            log_data:log_data,
        });
    }
}

module.exports = logClass;