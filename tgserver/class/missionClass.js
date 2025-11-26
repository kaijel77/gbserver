const baseClass = require("./baseClass");
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
//
// 미션 클래스
//
class missionClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 리스트 가져오기
    // @param account_no 계정 기본 아이디
    // @returns {Promise<*[]|*>} 미션 정보 리스트
    // 
    async getMissionList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let missionList = [];
            let select = `mission_id, mission_type, mission_count, create_date`;
            const query = `SELECT ${select} FROM tbl_missionInfo WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let mission_info of result)
                    {
                        missionList.push({
                            mission_id: mission_info.mission_id,
                            mission_type: mission_info.mission_type,
                            mission_count: mission_info.mission_count,
                            create_date: mission_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return missionList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param mission_no 미션 아이디
    // @returns {Promise<*[]|*>} 미션 정보
    // 
    async getMissionInfo (account_no, mission_id) {
       try {
            this.includeHandler(['mysqlHandler']);

            let missionInfo = null;
            let select = `mission_id, mission_type, mission_count, create_date`;
            const query = `SELECT ${select} FROM tbl_missionInfo WHERE account_no='${account_no}' and mission_id='${mission_id}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    missionInfo = {
                        mission_id: result.mission_id,
                        mission_type: result.mission_type,
                        mission_count: result.mission_count,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return missionInfo;
        } catch (err) {
            throw err;
        }
    }




    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param mission_id 미션 미션
    // @param mission_count 미션 갯수
    // @returns {Promise<*[]|*>} 미션 정보
    // 
    async addSettingMissionInfo(account_no, mission_id, mission_count) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;

            let columns = 'account_no, mission_id, mission_type, mission_subtype, mission_status, mission_count, mission_curcount, mission_reward';
            let values = `'${account_no}', '${mission_id}', 1, 1, 1, '${mission_count}', '${mission_count}', 0`;

            let query = `INSERT INTO tbl_missionInfo (${columns}) VALUES (${values})`;
            
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
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param mission_no 미션 아이디
    // @param mission_count 미션 갯수
    // @returns {Promise<*[]|*>} 미션 정보
    // 
    async updateSettingMissionInfo (account_no, mission_id, mission_count) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `mission_count = "${mission_count}"`;
            const query = `UPDATE tbl_missionInfo SET ${set} WHERE account_no='${account_no}' and mission_id='${mission_id}'`;

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


    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param mission_no 미션 아이디
    // @param mission_count 미션 갯수
    // @returns {Promise<*[]|*>} 미션 정보
    // 
    async completeSettingMissionInfo (account_no, mission_id) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `mission_status = 2`;
            const query = `UPDATE tbl_missionInfo SET ${set} WHERE account_no='${account_no}' and mission_id='${mission_id}'`;

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


    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param mission_no 미션 아이디
    // @param mission_count 미션 갯수
    // @returns {Promise<*[]|*>} 미션 정보
    // 
    async rewardSettingMissionInfo (account_no, mission_id) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `mission_reward = 2`;
            const query = `UPDATE tbl_missionInfo SET ${set} WHERE account_no='${account_no}' and mission_id='${mission_id}'`;

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

    ///////////////////////////////////////////////////////////////
    //
    // 미션 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param mission_id 미션 아이디
    // @returns {Promise<*[]|*>} 미션 정보
    // 
    async removeMissionInfo(account_no, mission_id) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_missionInfo WHERE account_no='${account_no}' and mission_id='${mission_id}'`;
            
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                    bDelete = true;
                }
            })
            .catch((err) => {
                throw err;
            });
            return bDelete;
        } catch (err) {
            throw err;
        }
    }    
}

module.exports = new missionClass();