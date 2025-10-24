const mysql = require('mysql2/promise');
const config = require('../config/default');
const CONSTANT = require('../config/constant');
const useful = require('../utils/useful');

class MysqlHandler {
    constructor() {
        this.pool = {};
        this.pool[CONSTANT.DB.GAME] = mysql.createPool({
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            database: 'im_game',
        });
        this.pool[CONSTANT.DB.STATIC] = mysql.createPool({
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            database: 'im_static',
        });
        this.pool[CONSTANT.DB.LOG] = mysql.createPool({
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            database: 'im_log',
        });
    }
    async query(db, sql, values) {
        const connection = await this.pool[db].getConnection();
        try {
            console.log(useful.getUTCDateTime(new Date()), `|| query msg: ${sql}${values ? ` | values: ${values}` : ''}`);
            const [result] = await connection.query(sql, values);
            return result;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    getPool(db) {
        return this.pool[db];
    }
}
module.exports = new MysqlHandler();
