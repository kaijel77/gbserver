const moment = require('moment');

module.exports = {
    /**
     * 날짜/시간을 UTC기준의 특정 형식('YYYY-M-DD HH:mm:ss')으로 변환.
     * @param {Date} time - 날짜/시간
     * @returns {string} 'YYYY-MM-DD HH:mm:ss'형식 날짜
     * @memberOf time
     */
    utcDateTime: function(utc) {
        return moment(utc).utc().format('YYYY-MM-DD HH:mm:ss');
    },

    /**
     * 날짜/시간을 UTC기준의 특정 형식으로 변환.
     * @param {Date} utc - 날짜/시간
     * @param {String} format - 형식
     * @returns {string} format 형식 날짜
     * @memberOf time
     */
    utcTimeFormat: function(utc, format) {
        return moment(utc).utc().format(format);
    },

    /**
     * 현재 시간
     * @returns {Date} 현재 시간
     * @memberOf time
     */
    getNowTime: function() {
        return new Date(moment.now());
    },

    /**
     * 현재 시간
     * @returns {Date} 현재 시간
     * @memberOf time
     */
    getNowUtcTime: function() {
        return new Date(moment(moment.now()).utc());
    }
 
};