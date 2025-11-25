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
            let select = `mission_no, mission_id, mission_type, mission_count, create_date`;
            const query = `SELECT ${select} FROM tbl_missionInfo WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let mission_info of result)
                    {
                        missionList.push({
                            mission_no: mission_info.mission_no,
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
    async getMissionInfo (account_no, mission_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let missionInfo = null;
            let select = `mission_no, mission_id, mission_type, mission_count, create_date`;
            const query = `SELECT ${select} FROM tbl_missionInfo WHERE account_no='${account_no}' and mission_no='${mission_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    missionInfo = {
                        mission_no: result.mission_no,
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
}

module.exports = new missionClass();