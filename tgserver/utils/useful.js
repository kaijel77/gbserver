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
        let time3 = new Date(moment.now());
        return time3;
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
