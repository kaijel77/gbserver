const baseClass = require("./baseClass");
const CONSTANT = require('../config/constant');

const useful = require('../utils/useful');

///////////////////////////////////////////////////////////////////////////
//
// 건물 클래스
//
class buildingClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 건물 정보 리스트 가져오기
    // @param account_no 계정 기본 아이디
    // @returns {Promise<*[]|*>} 건물 정보 리스트
    // 
    async getBuildingList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let buildingList = [];
            let select = `building_id, building_type, building_level, building_status, building_endtime, create_date`;
            const query = `SELECT ${select} FROM tbl_buildingInfo WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let building_info of result)
                    {
                        buildingList.push({
                            building_id: building_info.building_id,
                            building_type: building_info.building_type,
                            building_level: building_info.building_level,
                            building_status: building_info.building_status,
                            building_endtime: building_info.building_endtime,
                            create_date: building_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return buildingList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 건물 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param building_no 건물 아이디
    // @returns {Promise<*[]|*>} 건물 정보
    // 
    async getBuildingInfo (account_no, building_id) {
       try {
            this.includeHandler(['mysqlHandler']);

            let buildingInfo = null;
            let select = `building_id, building_type, building_level, building_status, building_endtime, create_date`;
            const query = `SELECT ${select} FROM tbl_buildingInfo WHERE account_no='${account_no}' and building_id='${building_id}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    buildingInfo = {
                        building_id: result.building_id,
                        building_type: result.building_type,
                        building_level: result.building_level,
                        building_status: result.building_status,
                        building_endtime: result.building_endtime, 
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return buildingInfo;
        } catch (err) {
            throw err;
        }
    }
    

    ///////////////////////////////////////////////////////////////
    //
    // 빌딩 생성
    // @param account_no 계정 기본 아이디
    // @param building_id 빌딩 빌딩
    // @param building_type 빌딩 타입
    // @param building_level 빌딩 레벨
    // @param building_status 빌딩 상태
    // @returns {Promise<*[]|*>} 빌딩 정보
    // 
    async insertBuildingInfo(account_no, building_id, building_type, building_level, building_status) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;
            let nowTime = useful.getNowUtcTime();

            let columns = 'account_no, building_id, building_type, building_level, building_status, building_endtime, create_date';
            let values = `'${account_no}', '${building_id}', '${building_type}', '${building_level}', '${building_status}', '${nowTime}', '${nowTime}'`;

            let query = `INSERT INTO tbl_buildingInfo (${columns}) VALUES (${values})`;
            
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
    // 빌딩 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param building_id 빌딩 아이디
    // @param building_level 빌딩 레벨
    // @param building_status 빌딩 상태    
    // @param building_endtime 빌딩 업데이트 종료시간
    // @returns {Promise<*[]|*>} 빌딩 정보
    // 
    async upgradeBuildingInfo (account_no, building_id, building_level, building_status, building_endtime) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `building_level = "${building_level}", building_status = "${building_status}", building_endtime = "${building_endtime}"`;
            const query = `UPDATE tbl_buildingInfo SET ${set} WHERE account_no='${account_no}' and building_id='${building_id}'`;

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
    // 빌딩 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param building_id 빌딩 아이디
    // @param building_status 빌딩 상태    
    // @returns {Promise<*[]|*>} 빌딩 정보
    // 
    async endBuildingInfo (account_no, building_id, building_status) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `building_status = "${building_status}"`;
            const query = `UPDATE tbl_buildingInfo SET ${set} WHERE account_no='${account_no}' and building_id='${building_id}'`;

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
    // 빌드 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param building_id 빌드 아이디
    // @returns {Promise<*[]|*>} 빌드 정보
    // 
    async removeBuildingInfo(account_no, building_id) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_buildingInfo WHERE account_no='${account_no}' and building_id='${building_id}'`;
            
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

module.exports = new buildingClass();