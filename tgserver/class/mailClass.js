const baseClass = require("./baseClass");
const CONSTANT = require('../config/constant');


///////////////////////////////////////////////////////////////////////////
//
// 우편 클래스
//
class mailClass  extends baseClass {

    ///////////////////////////////////////////////////////////////////////////
    //
    // 우편 리스트 가져오기
    // @returns {Object[]} 우편 목록
    //
    async getMailList(gameChar_id) {
        try {
            this.includeHandler(['mysqlHandler']);

            let mailList = [];
            let select = `mail_no, char_no, subject, content, reward_data, create_date, is_read, is_received, receive_date`;
            const query = `SELECT ${select} FROM tbl_mail WHERE char_no='${gameChar_id}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    for(let mail_info of result)
                    {
                        mailList.push({
                            mail_no: mail_info.mail_no,
                            char_no: mail_info.char_no,
                            subject: mail_info.subject,
                            content: mail_info.content,
                            reward_data: mail_info.reward_data,
                            create_date: mail_info.create_date,
                            is_read: mail_info.is_read,
                            is_received: mail_info.is_received,
                            receive_date: mail_info.receive_date,
                        });
                    }
                }
            })
            .catch((err) => {
                throw err;
            });
            return mailList;
        } catch (err) {
            throw err;
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    // 우편 가져오기
    //
    async getMailInfo(mail_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let mailinfo = null;
            let select = `mail_no, char_no, subject, content, reward_data, create_date, is_read, is_received, receive_date`;
            const query = `SELECT ${select} FROM tbl_mail WHERE mail_no='${mail_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
                if (result.length > 0) {
                    result = result[0];
                    mailinfo = {
                        mail_no: result.mail_no,
                        char_no: result.char_no,
                        subject: result.subject,
                        content: result.content,
                        reward_data: result.reward_data,
                        create_date: result.create_date,
                        is_read: result.is_read,
                        is_received: result.is_received,
                        receive_date: result.receive_date,
                    };
                }
            })
            .catch((err) => {
                throw err;
            });
            return mailList;
        } catch (err) {
            throw err;
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    // 우편 삭제처리
    //
    async deleteMailInfo(mail_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            let bDelete = false;
            const query = `DELETE FROM tbl_mail WHERE mail_no='${mail_no}'`;

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

    async getMailReward(mail_no) {
        try {
            this.includeHandler(['mysqlHandler']);

            const nowTime = useful.getUTCDateTime(new Date());
            let set = `is_received = true`;
            const query = `UPDATE tbl_mail SET ${set} WHERE mail_no='${mail_no}'`;

            await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
                if (result.affectedRows > 0) {
                }
            })
            .catch((err) => {
                throw err;
            });
            return nowTime;
        } catch (err) {
            throw err;
        }
    }

    async sendMailInfo(char_no, subject, content, mail_day) {
        try {
            this.includeHandler(['mysqlHandler']);

            const nowTime = useful.getUTCDateTime(new Date());
            const reward_data = useful.getUTCDateTime(new Date(14));

            // mail생성
            let bCreate = false;
            let columns = 'char_no, subject, content, reward_data, create_date, is_read, is_received, receive_date';
            let values = `'${char_no}', '${subject}', '${content}', '${reward_data}', '${nowTime}', false, false, '${nowTime}'`;

            let query = `INSERT INTO tbl_mail (${columns}) VALUES (${values})`;
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

            if (Object.keys(account).length === 0) {
                throw new Error(ERROR_CODE.USER_LOGIN_1006); // 메일생성에 실패했습니다.
            }

            return bCreate;
        } catch (err) {
            throw err; // 메일생성에 실패했습니다.
        }
    }
}

module.exports = new mailClass();