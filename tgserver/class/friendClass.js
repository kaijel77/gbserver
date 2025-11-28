const baseClass = require("./baseClass");
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
//
// 친구 클래스
//
class friendClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 친구 리스트 가져오기
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getFriendList (friend_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let friendList = [];

            let select = `friend_no, account_no, create_date`;
            const query = `SELECT ${select} FROM tbl_friendInfo WHERE friend_no='${friend_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let friend_info of result)
                    {
                        friendList.push({
                            friend_no: friend_info.friend_no,
                            account_no: friend_info.account_no,
                            create_date: friend_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return friendList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 친구 정보 가져오기
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getFriendInfo (friend_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let friendInfo = null;

            let select = `friend_no, account_no, create_date`;
            const query = `SELECT ${select} FROM tbl_friendInfo WHERE friend_no='${friend_no}' and account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                result = result[0];
                friendInfo = {
                    friend_no: result.friend_no,
                    account_no: result.account_no,
                    create_date: result.create_date,
                };
                }
            })
            .catch((err) => {
                throw err;
            });
            return friendList;
        } catch (err) {
            throw err;
        }
    }
 

    ///////////////////////////////////////////////////////////////
    //
    // 친구초대 정보 가져오기
    // @param friend_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getFriendInviteList (invite_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let friendmemberList = [];

            let select = `invite_no, account_no, create_date`;
            let query = `SELECT ${select} FROM tbl_friendinviteInfo WHERE invite_no='${invite_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let friendmember_info of result)
                    {
                        friendmemberList.push({
                            friend_no: friendmember_info.friend_no,
                            account_no: friendmember_info.account_no,
                            create_date: friendmember_info.create_date,
                        });
                    }
                }                
            })
            .catch((err) => {
                throw err;
            });
            return friendmemberList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 친구초대 정보 가져오기
    // @param friend_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getFriendAccountList (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let friendmemberList = [];

            let select = `invite_no, account_no, create_date`;
            let query = `SELECT ${select} FROM tbl_friendinviteInfo WHERE account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let friendmember_info of result)
                    {
                        friendmemberList.push({
                            friend_no: friendmember_info.friend_no,
                            account_no: friendmember_info.account_no,
                            create_date: friendmember_info.create_date,
                        });
                    }
                }                
            })
            .catch((err) => {
                throw err;
            });
            return friendmemberList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 친구 요청
    // @param friend_no 친구 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async insertFriendInfo (friend_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;

            let columns = 'friend_no, account_no, create_date';
            let values = `'${friend_no}', '${account_no}', now()`;

            let query = `INSERT INTO tbl_friendInfo (${columns}) VALUES (${values})`;
            
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
    // 길드멤버 탈퇴
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeFriendInfo (friend_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_friendInfo WHERE friend_no = '${friend_no}' and  account_no='${account_no}'`;
            
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


    ///////////////////////////////////////////////////////////////
    //
    // 친구초대 요청
    // @param invite_no 친구 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async insertInviteInfo (invite_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;

            let columns = 'invite_no, account_no, create_date';
            let values = `'${invite_no}', '${account_no}', now()`;

            let query = `INSERT INTO tbl_friendinviteInfo (${columns}) VALUES (${values})`;
            
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
    // 길드멤버 탈퇴
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeInviteInfo (invite_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_friendinviteInfo WHERE invite_no = '${invite_no}' and  account_no='${account_no}'`;
            
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

module.exports = new friendClass();