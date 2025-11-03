const useful = require('../utils/useful');
const ERROR_CODE = require('../config/errorCode');
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
// 게임 로그 클래스
///
class logClass  {
    constructor(request) {
//        this.log_id = useful.newUuid();
//        this.log_queue = [];
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
    // 업데이트 로그tgHandler
    // @param log_data
    ///
    updateLog (account_info, reason, log_data = {}) {
        if (log_data?.item) {
            this.queueItem(account_info, reason, log_data.item)
        }
        if (log_data?.resource) {
            this.queueResource(account_info, reason, 'update', log_data.resource);
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue (user_id, type, reason, log_data = {}) {
        this.log_queue.push({
            log_date: useful.getNowTime(),
            log_table:'log',
            log_id: this.log_id,
            user_id: user_id,
            router: this.request.originalUrl,
            parameters: (this.request.method === 'GET') ? this.request.query : this.request.body,
            log_type: type,
            log_reason: reason,
            log_data: log_data,
            user_agent: this.request.headers['user-agent'],
            ip_address: this.request.headers['x-real-ip'],
        });
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
    // 파견 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param log_data
    //
    queue_exploration(account_info, reason, type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('exploration_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            log_data: log_data,
        });
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    // 요일던전 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param dungeon_id
    // @param stage_id
    // @param log_data
    //
    queue_dailydungeonStage(account_info, reason, type, dungeon_id, stage_id, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('dailydungeon_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            dungeon_id: dungeon_id,
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
    //
    // 던전 관련 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_Dungeon(user_id, user_name, reason, type, monster_id, reward_id, dungeon_field_slot, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('dungeon_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:user_id,
            user_name: user_name,
            log_reason:reason,
            log_type:type,
            monster_id:monster_id,
            reward_id: reward_id, 
            dungeon_field_slot : dungeon_field_slot,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 던전 관련 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    async queue_DungeonDirect(user_id, user_name, reason, type, monster_id, reward_id, dungeon_field_slot, log_data = {}) {
        this.includeClass(['mongo']);
        await this.mongoClass.log.select('dungeon_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:user_id,
            user_name: user_name,
            log_reason:reason,
            log_type:type,
            monster_id:monster_id,
            reward_id: reward_id,
            dungeon_field_slot : dungeon_field_slot,
            log_data: log_data,
        });        
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 장비제작 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_equipMaking(account_info, reason, type, equip_pk, equip_id, equip_type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('equipMaking_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            equip_pk:equip_pk,
            equip_id:equip_id,
            equip_type: equip_type,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 장비제작 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_equipEnchant(account_info, reason, type, equip_pk, equip_id, equip_type, current_level, next_level, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('equipEnchant_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            equip_pk:equip_pk,
            equip_id:equip_id,
            equip_type: equip_type,
            current_level:current_level,
            next_level:next_level,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 장비제작 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_equipDecompose(account_info, reason, type, equip_pk, equip_id, equip_type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('equipDecompose_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            equip_pk:equip_pk,
            equip_id:equip_id,
            equip_type: equip_type,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 장비제작 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_equipInfo(account_info, reason, type, equip_pk, equip_id, equip_type, value) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('equipInfo_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            equip_pk:equip_pk,
            equip_id:equip_id,
            equip_type: equip_type,
            value: value
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    //
    // 장비제작 로그 Queue 등록
    // @param account_info
    // @param reason
    // @param type
    // @param continent_id
    // @param stage_id
    // @param log_data
    //
    queue_equipRenewal(account_info, reason, type, equip_pk, equip_id, equip_type, log_data) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('equipRenewal_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            equip_pk:equip_pk,
            equip_id:equip_id,
            equip_type: equip_type,
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
    queueHeroQueue (account_info, reason, type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroQueue_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            log_data: log_data,
        });        
    }


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Wait 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueHeroWait (account_info, reason, hero_queue_pk, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroWait_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            hero_queue_pk:hero_queue_pk,
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
    queueHeroBase (account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroBase_log').insertOne({
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
    queueHeroInfo (account_info, reason, hero_pk, hero_id, hero_name, value) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroInfo_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            hero_pk: hero_pk,
            hero_id: hero_id,
            hero_name: hero_name,
            value: value,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueHeroLevelUp (account_info, reason, hero_pk, hero_id, hero_name, hero_grade, star_level, hero_level, next_hero_grade, next_star_level, next_hero_level, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroLevelUp_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            hero_pk: hero_pk,
            hero_id: hero_id,
            hero_name: hero_name,
            hero_grade:hero_grade,
            star_level:star_level,
            hero_level:hero_level,
            next_hero_grade:next_hero_grade,
            next_star_level:next_star_level,
            next_hero_level:next_hero_level,
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
    queueHeroSkill (account_info, reason, hero_pk, hero_id, hero_name, hero_grade, star_level, hero_level, skill_number, skill_level, next_skill_level, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroSkillLearn_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            hero_pk: hero_pk,
            hero_id: hero_id,
            hero_name: hero_name,
            hero_grade:hero_grade,
            star_level:star_level,
            hero_level:hero_level,
            skill_number:skill_number,
            skill_level:skill_level,
            next_skill_level:next_skill_level,
            log_data: log_data,
        });
    }


    queueheroParty (account_info, reason, field_Type, set_hero) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('heroParty_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            field_Type: field_Type,
            set_hero: set_hero,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 리소스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueResource(account_info, reason, type, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('resource_log').insertOne({
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
    queueFieldStage(account_info, reason, field_type, current_stage, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('fieldStage_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            field_type:field_type,
            current_stage:current_stage,
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
    queueResearch(account_info, reason, type, research_id, researchName, current_level, next_level, timer_pk) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('research_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_type:type,
            research_id:research_id,
            researchName:researchName,
            current_level:current_level,
            next_level:next_level,
            timer_pk: timer_pk,
        });
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 리소스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueExchange(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('exchange_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 이벤트 거래소 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueEventExchange(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('event_exchange_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }

    ///////////////////////////////////////////////////////////////////////////
    // 광고 거래소 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueADExchange(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('ad_exchange_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }
    ///////////////////////////////////////////////////////////////////////////
    // 이벤트 빙고 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueBingo(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('bingo_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            log_data: log_data,
        });
    }
     ///////////////////////////////////////////////////////////////////////////
    // 이벤트 스케줄러 빙고 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueBingoSystem(reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('bingo_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:'system',
            user_name: 'system',
            log_reason: reason,
            log_data: log_data,
        });
    }
    ///////////////////////////////////////////////////////////////////////////
    // 캐릭터 특성 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueAbility(account_info, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('ability_log').insertOne({
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
    // 리소스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueNftInfo(account_info, reason, address, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('nftinfo_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            address:address,
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
    queueGuidedMission (account_info, reason, mission_id) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('guidedMission_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            mission_id: mission_id,
        });
    }

    ///////////////////////////////////////////////////////////////////////////
    // 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueLetter (account_info, reason, log_data = {}) {
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
    queueLetter2 (user_id, user_name, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('letter_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:user_id,
            user_name: user_name,
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
    queueLetterDirect (user_id, user_name, reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('letter_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:user_id,
            user_name: user_name,
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
    // 길드 스케줄러 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queueGuildSystem(reason, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('guild_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:'system',
            user_name: 'system',
            log_reason: reason,
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
    // 패스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_LongUser(account_info, reason, count) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('longuser_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            count:count,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // 패스 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_WishTower(account_info, reason, event_id, stage_id, log_data = {}) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('wishTower_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:account_info.user_id,
            user_name: account_info.user_name,
            log_reason:reason,
            event_id:event_id,
            stage_id:stage_id,
            log_data: log_data
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

    ///////////////////////////////////////////////////////////////////////////
    // 보스 레이드 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_BossRaid2(user_id, user_name, reason, bossraid_id, log_data) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('bossRaid_log').insertOne({
            log_date: useful.getNowTime(),
            user_id: user_id,
            user_name: user_name,
            log_reason:reason,
            bossraid_id:bossraid_id,
            log_data:log_data,
        });
    }

    
    ///////////////////////////////////////////////////////////////////////////
    // 길드보스 레이드 관련 로그 Queue 등록
    // @param user_id
    // @param type
    // @param reason
    // @param log_data
    ///
    queue_GuildBossRaid(user_id, user_name, reason, bossraid_id, guild_id, log_data) {
        this.includeClass(['mongo']);
        this.mongoClass.log.select('guildBossRaid_log').insertOne({
            log_date: useful.getNowTime(),
            user_id:user_id,
            user_name: user_name,
            log_reason:reason,
            bossraid_id:bossraid_id,
            guild_id:guild_id,
            log_data:log_data,
        });
    }


    ///////////////////////////////////////////////////////////////////////////
    // Queue 비우기
    ///
    clearQueue () {
        this.log_queue = [];
    }

    ///////////////////////////////////////////////////////////////////////////
    // Queue에 담긴 로그 기록
    // @returns {Promise<void>}
    ///
    async submitQueue() {
        /*OHTG_ING
        if (this.log_queue.length > 0) {
            for (let log_info of this.log_queue) {
                if (log_info.log_table === null || log_info.log_table === undefined) {    
                    continue;
                }
            }
            this.clearQueue();
        }
        */
    }
}

module.exports = logClass;