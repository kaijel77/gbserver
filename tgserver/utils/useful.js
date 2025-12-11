const Decimal = require('decimal.js');
const moment = require('moment-timezone');
const config = require('../config/default');
const CONSTANT = require('../config/constant');

var TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss Z';


///////////////////////////////////////////////////////////////
//
// 유용한 함수 클래스
//
class usefulClass {

    ///////////////////////////////////////////////////////////////
    //
    // 게임내 시간에 기준이 되는 현재 시간.
    // @returns Date|string
    //
    static getNowTime() {
        let time = new Date(moment.now());
        return time;
    }


    ///////////////////////////////////////////////////////////////
    //
    // 게임내 시간에 기준이 되는 현재 시간.
    // @returns {Date} 현재 시간
    // @memberOf time
    //
    static getNowTimeFormat() {
        let time = new Date(moment.now());
        return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }

    ///////////////////////////////////////////////////////////////
    //
    // 날짜/시간을 특정 형식('YYYY-M-DD HH:mm:ss')으로 변환.
    // @param {utcDate} time - 날짜/시간
    // @returns {string} 'YYYY-MM-DD HH:mm:ss'형식 날짜
    // @memberOf time
    //
    static getDateTimeFormat(utcDate) {
        let test = moment(utcDate).format('YYYY-MM-DD HH:mm:ss');
        return test;
    }


    /**
     * config 에서 설정한 타임존에 맞는 시간을 반환.
     * @param time
     * @param format
     * @returns {string}
     */
    static getDateTimeWithTz (time = null,format = null) {
        time = (! time) ? this.getNowTime() : time;
        return moment(time).format(format);
    }

    static getDateTimeWithKorea (time ,format = null) {
        time = (! time) ? this.getNowTime() : time;
        return moment(time).format(format);
    }


    ///////////////////////////////////////////////////////////////
    //
    // 두 시간의 차를 구해옴. precise 는 seconds, minuets, hours, days 등을 사용 가능.
    // @param date1
    // @param date2
    // @param unit
    // @param unit
    // @returns {number}
    //
    static dateDiff (date1, date2, unit = null, precise = false) {
        return new moment(date1).diff(date2, unit, precise);
    }

   
    ///////////////////////////////////////////////////////////////
    //
    // 시작시간을 기준으로 흐른시간 만큼 후의 시간을 가져옴.
    // @param start_datetime 시작시간 (현재시간 디폴트)
    // @param secondPassed 흐른시간 (초단위)
    // @returns {Date}
    //
    static dateAddTime (secondPassed, start_datetime = this.getNowTime()) {
        let value = new Date(moment(start_datetime).add(secondPassed, 'seconds'));
        return value;
    }


    ///////////////////////////////////////////////////////////////
    //
    // Decimal 을 함수화
    // @param n
    // @returns {Decimal}
    //
    static decimal(n) {
        return new Decimal(n);
    }


    ///////////////////////////////////////////////////////////////
    //
    // Decimal을 이용해 문자열를 숫자로 변환.
    // @param n
    // @returns {number}
    //
    static toNum (n) {
        return this.decimal(n).toNumber();
    }


    ///////////////////////////////////////////////////////////////
    //
    // Zero Space 이슈 대응용 함수.
    // @param str
    // @returns {*}
    //
    static zeroSpaceFix(str) {
        str = str.trim();
        str = str.replace(/[\u200B-\u200D\uFEFF]/g, '');
        let reg = new RegExp("\u2028|\u2029");
        return str.replace(reg, '');
    }

}


module.exports = usefulClass;
