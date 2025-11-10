const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 장비 클래스
//
class equipClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 장비 정보 리스트 가져오기
    // @param account_no 계정 기본 아이디
    // @returns {Promise<*[]|*>} 장비 정보 리스트
    // 
    async getEquipList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let equipList = [];
            let select = `equip_no, equip_id, equip_type, equip_star, equip_grade, equip_level, equip_exp, equip_hero, equip_lock,  create_date`;
            const query = `SELECT ${select} FROM tbl_equipInfo WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let equip_info of result)
                    {
                        equipList.push({
                            equip_no: equip_info.equip_no,
                            equip_id: equip_info.equip_id,
                            equip_type: equip_info.equip_type,
                            equip_star: equip_info.equip_star,
                            equip_grade: equip_info.equip_grade,
                            equip_level: equip_info.equip_level,
                            equip_exp: equip_info.equip_exp,
                            equip_hero: equip_info.equip_hero,
                            equip_lock: equip_info.equip_lock,
                            create_date: equip_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return equipList;
        } catch (err) {
            throw err;
        }
    }



    ///////////////////////////////////////////////////////////////
    //
    // 장비 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param equip_no 장비 아이디
    // @returns {Promise<*[]|*>} 장비 정보
    // 
    async getEquipInfo (account_no, equip_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let equipInfo = null;
            let select = `equip_no, equip_id, equip_type, equip_star, equip_grade, equip_level, equip_exp, equip_hero, equip_lock, create_date`;
            const query = `SELECT ${select} FROM tbl_equip WHERE account_no='${account_no}' and equip_no='${equip_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    equipInfo = {
                        equip_no: result.equip_no,
                        equip_id: result.equip_id,
                        equip_type: result.equip_type,
                        equip_star: result.equip_star,
                        equip_grade: result.equip_grade,
                        equip_level: result.equip_level,
                        equip_exp: result.equip_exp,
                        equip_hero: result.equip_hero,
                        equip_lock: result.equip_lock,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return equipInfo;
        } catch (err) {
            throw err;
        }
    }



    ///////////////////////////////////////////////////////////////
    //
    // 장비 정보 생성
    // @param account_no 계정 기본 아이디
    // @param equip_no 장비 번호
    // @param equip_id 장비 장비
    // @param equip_type 장비 타입
    // @param equip_count 장비 갯수
    // @param create_date 생성날짜
    // @returns {Promise<*[]|*>} 장비 정보
    // 
    async createEquipInfo(account_no, equip_id, equip_type, equip_grade, equip_star) {
        try {
            this.includeHandler(['mysqlHandler']);

            let equip_no = 0;

            let columns = 'account_no, equip_id, equip_type, equip_star, equip_grade, equip_level, equip_exp, equip_hero, equip_lock, create_date';
            let values = `'${account_no}', '${equip_id}', '${equip_type}', '${equip_star}', '${equip_grade}', 1, 0, 0, 0, now()`;

            let query = `INSERT INTO tbl_equip (${columns}) VALUES (${values})`;
            
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                    equip_no = result.insertId;
                }
            })
            .catch((err) => {
                throw err;
            });
            return equip_no;
        } catch (err) {
            throw err;
        }
    }



    ///////////////////////////////////////////////////////////////
    //
    // 장비 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param equip_no 장비 아이디
    // @param equip_star 장비
    // @param equip_grade 장비
    // @param equip_level 장비
    // @param equip_exp 장비
    // @returns {Promise<*[]|*>} 장비 정보
    // 
    async updateEquipLevelInfo (account_no, equip_no, equip_star, equip_grade, equip_level, equip_exp) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `equip_star = "${equip_star}", equip_grade = "${equip_grade}", equip_level = "${equip_level}", equip_exp = "${equip_exp}"`;
            const query = `UPDATE tbl_equip SET ${set} WHERE account_no='${account_no}' and equip_no='${equip_no}'`;

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
    // 장비 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param equip_no 장비 아이디
    // @param equip_hero 장비 영웅 장착 / 헤제 
    // @returns {Promise<*[]|*>} 장비 정보
    // 
    async updateEquipHeroInfo (account_no, equip_no, equip_hero) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `equip_hero = "${equip_hero}"`;
            const query = `UPDATE tbl_equip SET ${set} WHERE account_no='${account_no}' and equip_no='${equip_no}'`;

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
    // 장비 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param equip_no 장비 아이디
    // @param equip_lock 장비 락 온 / 오프 
    // @returns {Promise<*[]|*>} 장비 정보
    // 
    async updateEquipLockInfo (account_no, equip_no, equip_lock) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `equip_lock = "${equip_lock}"`;
            const query = `UPDATE tbl_equip SET ${set} WHERE account_no='${account_no}' and equip_no='${equip_no}'`;

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
    // 장비 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param equip_no 장비 아이디
    // @returns {Promise<*[]|*>} 장비 정보
    // 
    async removeEquipInfo(account_no, equip_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_equip WHERE account_no='${account_no}' and equip_no='${equip_no}'`;
            
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

module.exports = new equipClass();