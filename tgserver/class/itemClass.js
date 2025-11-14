const baseClass = require("./baseClass");
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
//
// 아이템 클래스
//
class itemClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 아이템 정보 리스트 가져오기
    // @param account_no 계정 기본 아이디
    // @returns {Promise<*[]|*>} 아이템 정보 리스트
    // 
    async getItemList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let itemList = [];
            let select = `item_no, item_id, item_type, item_count, create_date`;
            const query = `SELECT ${select} FROM tbl_item WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let item_info of result)
                    {
                        itemList.push({
                            item_no: item_info.item_no,
                            item_id: mail_info.item_id,
                            item_type: mail_info.item_type,
                            item_count: mail_info.item_count,
                            create_date: mail_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return itemList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 아이템 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param item_no 아이템 아이디
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getItemInfo (account_no, item_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let itemInfo = null;
            let select = `item_no, item_id, item_type, item_count, create_date`;
            const query = `SELECT ${select} FROM tbl_item WHERE account_no='${account_no}' and item_no='${item_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    itemInfo = {
                        item_no: result.item_no,
                        item_id: result.item_id,
                        item_type: result.item_type,
                        item_count: result.item_count,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return itemInfo;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 아이템 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param item_no 아이템 아이디
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getItemIDInfo (account_no, item_id) {
        try {
             this.includeHandler(['mysqlHandler']);
 
             let itemInfo = null;
             let select = `item_no, item_id, item_type, item_count, create_date`;
             const query = `SELECT ${select} FROM tbl_item WHERE account_no='${account_no}' and item_id='${item_id}'`;
 
             await this.mysqlHandlerClass
             .query(CONSTANT.DB.GAME, query)
             .then((result) => {
                 if (result.length > 0) {
                     result = result[0];
                     itemInfo = {
                         item_no: result.item_no,
                         item_id: result.item_id,
                         item_type: result.item_type,
                         item_count: result.item_count,
                         create_date: result.create_date,
                     };
                 }                
             })
             .catch((err) => {
                 throw err;
             });
             return itemInfo;
         } catch (err) {
             throw err;
         }
     }

    ///////////////////////////////////////////////////////////////
    //
    // 아이템 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param item_no 아이템 번호
    // @param item_id 아이템 아이템
    // @param item_type 아이템 타입
    // @param item_count 아이템 갯수
    // @param create_date 생성날짜
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async addItemInfo(account_no, item_id, item_type, item_count) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;
            let item_no = 0;

            let columns = 'account_no, item_id, item_type, item_count, item_grade, item_level, item_exp, create_date';
            let values = `'${account_no}', '${item_id}', '${item_type}', '${item_count}', 1, 1, 0, now()`;

            let query = `INSERT INTO tbl_item (${columns}) VALUES (${values})`;
            
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                    bCreate = true;
                    item_no = result.insertId;
                }
            })
            .catch((err) => {
                throw err;
            });
            return item_no;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 아이템 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param item_no 아이템 아이디
    // @param item_count 아이템 갯수
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async updateItemInfo (account_no, item_no, item_count) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `item_count = "${item_count}"`;
            const query = `UPDATE tbl_item SET ${set} WHERE account_no='${account_no}' and item_no='${item_no}'`;

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
    // 아이템 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param item_no 아이템 아이디
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeItemInfo(account_no, item_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_item WHERE account_no='${account_no}' and item_no='${item_no}'`;
            
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

module.exports = new itemClass();