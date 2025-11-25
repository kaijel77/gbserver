const baseClass = require("./baseClass");
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
//
// 덱 클래스
//
class deckClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 덱 정보 리스트 가져오기
    // @param account_no 계정 기본 아이디
    // @returns {Promise<*[]|*>} 덱 정보 리스트
    // 
    async getDeckList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let deckList = [];
            let select = `deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08, create_date`;
            const query = `SELECT ${select} FROM tbl_deckInfo WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let deck_info of result)
                    {
                        deckList.push({
                            deck_type: deck_info.deck_type,
                            deck_hero01: deck_info.deck_hero01,
                            deck_hero02: deck_info.deck_hero02,
                            deck_hero03: deck_info.deck_hero03,
                            deck_hero04: deck_info.deck_hero04,
                            deck_hero05: deck_info.deck_hero05,
                            deck_hero06: deck_info.deck_hero06,
                            deck_hero07: deck_info.deck_hero07,
                            deck_hero08: deck_info.deck_hero08,
                            create_date: deck_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return deckList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 덱 정보 가져오기
    // @param account_no 계정 기본 아이디
    // @param deck_no 덱 아이디
    // @returns {Promise<*[]|*>} 덱 정보
    // 
    async getDeckInfo (account_no, deck_type) {
       try {
            this.includeHandler(['mysqlHandler']);

            let deckInfo = null;
            let select = `deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08, create_date`;
            const query = `SELECT ${select} FROM tbl_deck WHERE account_no='${account_no}' and deck_type='${deck_type}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    deckInfo = {
                        deck_type: result.deck_type,
                        deck_hero01: result.deck_hero01,
                        deck_hero02: result.deck_hero02,
                        deck_hero03: result.deck_hero03,
                        deck_hero04: result.deck_hero04,
                        deck_hero05: result.deck_hero05,
                        deck_hero06: result.deck_hero06,
                        deck_hero07: result.deck_hero07,
                        deck_hero08: result.deck_hero08,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return deckInfo;
        } catch (err) {
            throw err;
        }
    }



    ///////////////////////////////////////////////////////////////
    //
    // 덱 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param deck_no 덱 번호
    // @param deck_id 덱 덱
    // @param deck_type 덱 타입
    // @param deck_count 덱 갯수
    // @param create_date 생성날짜
    // @returns {Promise<*[]|*>} 덱 정보
    // 
    async addSettingDeckInfo(account_no, deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;

            let columns = 'account_no, deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08, create_date';
            let values = `'${account_no}', '${deck_type}', '${deck_hero01}', '${deck_hero02}', '${deck_hero03}', '${deck_hero04}', '${deck_hero05}', '${deck_hero06}', '${deck_hero07}', '${deck_hero08 }', now()`;

            let query = `INSERT INTO tbl_deck (${columns}) VALUES (${values})`;
            
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
    // 덱 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param deck_no 덱 아이디
    // @param deck_count 덱 갯수
    // @returns {Promise<*[]|*>} 덱 정보
    // 
    async updateSettingDeckInfo (account_no, deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `deck_hero01 = "${deck_hero01}", deck_hero02 = "${deck_hero02}", deck_hero03 = "${deck_hero03}", deck_hero04 = "${deck_hero04}", deck_hero05 = "${deck_hero05}", deck_hero06 = "${deck_hero06}", deck_hero07 = "${deck_hero07}", deck_hero08 = "${deck_hero08}"`;
            const query = `UPDATE tbl_deck SET ${set} WHERE account_no='${account_no}' and deck_type='${deck_type}'`;

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
    // 덱 정보 갱신
    // @param account_no 계정 기본 아이디
    // @param deck_no 덱 아이디
    // @returns {Promise<*[]|*>} 덱 정보
    // 
    async removeDeckInfo(account_no, deck_type) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_deck WHERE account_no='${account_no}' and deck_type='${deck_type}'`;
            
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

module.exports = new deckClass();