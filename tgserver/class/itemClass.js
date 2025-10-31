const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 아이템 클래스
//
class itemClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 아이템 리스트 가져오기
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

    /**
     * 아이템 리스트 가져오기
     * @param user_id
     * @returns {Promise<*[]|*>}
     */
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

}

module.exports = new itemClass();