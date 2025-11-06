const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 용사 클래스
//
class heroClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 용사 정보 리스트 가져오기
    // @param account_no 계정 기본 아이디
    // @returns {Promise<*[]|*>} 용사 정보 리스트
    // 
    async getHeroList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let heroList = [];
            let select = `hero_no, hero_id, hero_type, hero_star, hero_grade, hero_level, hero_exp, hero_location, hero_task, create_date`;
            const query = `SELECT ${select} FROM tbl_hero WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let hero_info of result)
                    {
                        heroList.push({
                            hero_no: hero_info.hero_no,
                            hero_id: hero_info.hero_id,
                            hero_type: hero_info.hero_type,
                            hero_star: hero_info.hero_star,
                            hero_grade: hero_info.hero_grade,
                            hero_level: hero_info.hero_level,
                            hero_exp: hero_info.hero_exp,
                            hero_location: hero_info.hero_location,
                            hero_task: hero_info.hero_task,
                            create_date: hero_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return heroList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 용사 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param hero_no 용사 아이디
    // @returns {Promise<*[]|*>} 용사 정보
    // 
    async getHeroInfo (account_no, hero_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let heroInfo = null;
            let select = `hero_no, hero_id, hero_type, hero_star, hero_grade, hero_level, hero_exp, hero_location, hero_task, create_date`;
            const query = `SELECT ${select} FROM tbl_hero WHERE account_no='${account_no}' and hero_no='${hero_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    heroInfo = {
                        hero_no: result.hero_no,
                        hero_id: result.hero_id,
                        hero_type: result.hero_type,
                        hero_star: result.hero_star,
                        hero_grade: result.hero_grade,
                        hero_level: result.hero_level,
                        hero_exp: result.hero_exp,
                        hero_location: result.hero_location,
                        hero_task: result.hero_task,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return heroInfo;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 용사 정보 생성
    // @param account_no 계정 기본 아이디
    // @param hero_no 용사 번호
    // @param hero_id 용사 용사
    // @param hero_type 용사 타입
    // @param hero_count 용사 갯수
    // @param create_date 생성날짜
    // @returns {Promise<*[]|*>} 용사 정보
    // 
    async createHeroInfo(account_no, hero_id, hero_type, hero_grade, hero_star) {
        try {
            this.includeHandler(['mysqlHandler']);

            let hero_no = 0;

            let columns = 'account_no, hero_id, hero_type, hero_star, hero_grade, hero_level, hero_exp, hero_location, hero_task, create_date';
            let values = `'${account_no}', '${hero_id}', '${hero_type}', '${hero_star}', '${hero_grade}', 1, 0, 1, 1, now()`;

            let query = `INSERT INTO tbl_hero (${columns}) VALUES (${values})`;
            
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                    hero_no = result.insertId;
                }
            })
            .catch((err) => {
                throw err;
            });
            return hero_no;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 용사 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param hero_no 용사 아이디
    // @param hero_count 용사 갯수
    // @returns {Promise<*[]|*>} 용사 정보
    // 
    async updateHeroInfo (account_no, hero_no, hero_star, hero_grade, hero_level, hero_exp, hero_location, hero_task) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `hero_star = "${hero_star}", hero_grade = "${hero_grade}", hero_level = "${hero_level}", hero_exp = "${hero_exp}", hero_location = "${hero_location}", hero_task = "${hero_task}"`;
            const query = `UPDATE tbl_hero SET ${set} WHERE account_no='${account_no}' and hero_no='${hero_no}'`;

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
    // 용사 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param hero_no 용사 아이디
    // @returns {Promise<*[]|*>} 용사 정보
    // 
    async removeHeroInfo(account_no, hero_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_hero WHERE account_no='${account_no}' and hero_no='${hero_no}'`;
            
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

module.exports = new heroClass();