const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 길드 클래스
//
class guildClass  extends baseClass {


    ///////////////////////////////////////////////////////////////
    //
    // 길드 리스트 가져오기
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildList () {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildList = [];

            let select = `guild_no, guild_name, guild_message, guild_isautujoin, guild_joinlimitlevel, guildmaster_no, guildmaster_name, guild_level, guild_exp, create_date`;
            const query = `SELECT ${select} FROM tbl_guild`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let guild_info of result)
                    {
                        guildList.push({
                            guild_no: guild_info.guild_no,
                            guild_name: guild_info.guild_name,
                            guild_message: guild_info.guild_message,
                            guild_isautujoin: guild_info.guild_isautujoin,
                            guild_joinlimitlevel: guild_info.guild_joinlimitlevel,
                            guildmaster_no: guild_info.guildmaster_no,
                            guildmaster_name: guild_info.guildmaster_name,
                            guild_level: guild_info.guild_level,
                            guild_exp: guild_info.guild_exp,
                            create_date: guild_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return guildList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드 리스트 가져오기
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async searchGuildList () {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildList = [];

            let withsql = `WITH random_guild AS (  SELECT guild_no  FROM tbl_guild  ORDER BY RAND()  LIMIT 10)`;
            let select = `g.guild_no, g.guild_name, g.guild_message, g.guild_isautujoin, g.guild_joinlimitlevel, g.guildmaster_no, g.guildmaster_name, g.guild_level, g.guild_exp, g.create_date`;
            const query = `${withsql}  SELECT ${select} FROM tbl_guild  g JOIN random_guild r USING (guild_no)`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let guild_info of result)
                    {
                        guildList.push({
                            guild_no: guild_info.guild_no,
                            guild_name: guild_info.guild_name,
                            guild_message: guild_info.guild_message,
                            guild_isautujoin: guild_info.guild_isautujoin,
                            guild_joinlimitlevel: guild_info.guild_joinlimitlevel,
                            guildmaster_no: guild_info.guildmaster_no,
                            guildmaster_name: guild_info.guildmaster_name,
                            guild_level: guild_info.guild_level,
                            guild_exp: guild_info.guild_exp,
                            create_date: guild_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return guildList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드 정보 가져오기
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildInfo (guild_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildInfo = null;

            let select = `guild_no, guild_name, guild_message, guild_isautujoin, guild_joinlimitlevel, guildmaster_no, guildmaster_name, guild_level, guild_exp, create_date`;
            const query = `SELECT ${select} FROM tbl_guild WHERE guild_no='${guild_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    guildInfo = {
                        guild_no: result.guild_no,
                        guild_name: result.guild_name,
                        guild_message: result.guild_message,
                        guild_isautujoin: result.guild_isautujoin,
                        guild_joinlimitlevel: result.guild_joinlimitlevel,
                        guildmaster_no: result.guildmaster_no,
                        guildmaster_name: result.guildmaster_name,
                        guild_level: result.guild_level,
                        guild_exp: result.guild_exp,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return guildInfo;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드 정보 가져오기
    // @param guild_name 길드 이름
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildNameInfo (guild_name) {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildInfo = null;

            let select = `guild_no, guild_name`;
            const query = `SELECT ${select} FROM tbl_guild WHERE guild_name='${guild_name}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    guildInfo = {
                        guild_no: result.guild_no,
                        guild_name: result.guild_name
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return guildInfo;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드 정보 가져오기
    // @param guild_name 길드 이름
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async createGuildInfo (guild_name, account_no, nick_name) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;
            let guild_no = 0;

            let column = `guild_name, guild_message, guild_isautujoin, guild_joinlimitlevel, guildmaster_no, guildmaster_name, guild_level, guild_exp, create_date`;
            let values = `'${guild_name}', '', '', '', account_no, nick_name, 1, 0, now()`;
            let query = `INSERT INTO tbl_guild (${columns}) VALUES (${values})`;
            
            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                    bCreate = true;
                    guild_no = result.insertId;
                }
            })
            .catch((err) => {
                throw err;
            });
            return guild_no;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드 탈퇴
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async updateGuildName (guild_no, change_guild_name) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `guild_name = "${change_guild_name}"`;
            const query = `UPDATE tbl_guild SET ${set} WHERE guild_no='${guild_no}'`;

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
    // 길드 탈퇴
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeGuildInfo (guild_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_guild WHERE guild_no='${guild_no}'`;
            
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
    // 길드멤버 정보 가져오기
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildMemberList (guild_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildmemberList = null;

            let select = `guild_no, account_no, guild_grade, join_date, create_date`;
            const query = `SELECT ${select} FROM tbl_guildmember WHERE guild_no='${guild_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let guildmember_info of result)
                    {
                        guildmemberList.push({
                            guild_no: guildmember_info.guild_no,
                            account_no: guildmember_info.account_no,
                            guild_grade: guildmember_info.guild_grade,
                            join_date: guildmember_info.join_date,
                            create_date: guildmember_info.create_date,
                        });
                    }
                }                
            })
            .catch((err) => {
                throw err;
            });
            return guildmemberList;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드멤버 정보 가져오기
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildMemberInfo (guild_no, account_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildmemberinfo = null;

            let select = `guild_no, account_no, guild_grade, join_date, create_date`;
            const query = `SELECT ${select} FROM tbl_guildmember WHERE guild_no='${guild_no}' and  account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    guildmemberinfo = {
                        guild_no: result.guild_no,
                        account_no: result.account_no,
                        guild_grade: result.guild_grade,
                        join_date: result.join_date,
                        create_date: result.create_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return guildmemberinfo;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드가입
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async addGuildMember_info (guild_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;

            let columns = 'guild_no, account_no, guild_grade, join_date, create_date';
            let values = `'${guild_no}', '${account_no}', 99, now(), now()`;

            let query = `INSERT INTO tbl_guildmember (${columns}) VALUES (${values})`;
            
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
    // 길드멤버 정보변경
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async updateGuildMeberInfo (guild_no, account_no, update_grade) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bUpdate = false;
            let set = `guild_grade = "${update_grade}"`;
            const query = `UPDATE tbl_guildmember SET ${set} WHERE guild_no='${guild_no}' and  account_no='${account_no}'`;

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
    // 길드멤버 탈퇴
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeGuildMeberInfo (guild_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_guildmember WHERE guild_no='${guild_no}' and  account_no='${account_no}'`;
            
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
    // 길드멤버 탈퇴
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeGuildMeberList (guild_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_guildmember WHERE guild_no='${guild_no}'`;
            
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
    // 길드가입요청 정보 리스트 가져오기
    // @param guild_no 길드 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildRequestList (guild_no, account_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildRequestList = null;

            let select = `account_no, guild_no, request_message, request_date`;
            const query = `SELECT ${select} FROM tbl_guildrequest WHERE guild_no='${guild_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let guildrequest_info of result)
                    {
                        guildRequestList.push({
                            guild_no: guildrequest_info.guild_no,
                            account_no: guildrequest_info.account_no,
                            request_message: guildrequest_info.request_message,
                            request_message: guildrequest_info.request_message,
                            create_date: guildrequest_info.create_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return guildRequestList;
        } catch (err) {
            throw err;
        }
    }
    

    ///////////////////////////////////////////////////////////////
    //
    // 길드가입요청 정보 가져오기
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async getGuildRequestInfo (guild_no, account_no) {
       try {
            this.includeHandler(['mysqlHandler']);

            let guildRequestInfo = null;

            let select = `account_no, guild_no, request_message, request_date`;
            const query = `SELECT ${select} FROM tbl_guildrequest WHERE guild_no='${guild_no}' and  account_no='${account_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    guildRequestInfo = {
                        guild_no: result.guild_no,
                        account_no: result.account_no,
                        request_message: result.request_message,
                        request_date: result.request_date,
                    };
                }                
            })
            .catch((err) => {
                throw err;
            });
            return guildRequestInfo;
        } catch (err) {
            throw err;
        }
    }


    ///////////////////////////////////////////////////////////////
    //
    // 길드가입 요청
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async insertGuildRequestInfo (guild_no, account_no, request_message) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bCreate = false;

            let columns = 'account_no, guild_no, request_message, request_date';
            let values = `'${account_no}', '${guild_no}', '${request_message}', now()`;

            let query = `INSERT INTO tbl_guildrequest (${columns}) VALUES (${values})`;
            
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
    // 길드가입 요청 취소
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeGuildRequestInfo (guild_no, account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_guildrequest WHERE guild_no='${guild_no}' and  account_no='${account_no}'`;
            
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
    // 길드가입 요청 취소
    // @param guild_no 길드 넘버
    // @param account_no 계정 넘버
    // @returns {Promise<*[]|*>} 아이템 정보
    // 
    async removeGuildRequestInfoAll (account_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            let query = `DELETE FROM tbl_guildrequest WHERE account_no='${account_no}'`;
            
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

module.exports = new guildClass();