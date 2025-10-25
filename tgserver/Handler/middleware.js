const ERROR_CODE = require('../config/errCode');

class MiddlewareClass {
    constructor () {
        if (this.instance) {
            return this.instance;
        }
        // 사용 class
        // middleware
        this.errorHandler = null;
        
        this.instance = this;
        return this.instance;
    }

    includeClass (classes = []) {
        for (let name of classes) {
            if (! this?.[`${name}Class`]) {
                this[`${name}Class`] = require(`../controller/${name}`);
            }
        }
    }
    includeMiddleware (classes = []) {
        for (let name of classes) {
            if (! this?.[`${name}`]) {
                this[`${name}`] = require(`./${name}`);
            }
        }
    }

    /**
     * 미들웨어 함수, app.js에서 선언
     * @returns {function} 모든 API 실행전 데이터 처리
     * @memberOf middleware
     */
    init () {
        this.includeMiddleware(['middleware']);
        return (req, res, next) => {
            // 요청 확인
            const ip = req.clientIp;
            console.log(`\n`, require('../config/time').utcDateTime(new Date()),`|| ${ip} [${req.method}] ${req.originalUrl}`);
            next();
        }
    }
    /**
     * 미들웨어 함수
     * @param {function} fn 미들웨어 실행 후 실행될 함수
     * @returns {function} try-catch
     * @memberOf middleware
     */
    wrapAsync (fn) {
        return (req, res, next) => {
            console.log('$ middleware.wrapAsync');
            fn(req, res, next).catch(next);
        };
    }
    /**
     * 미들웨어 함수, 로그인 여부 확인
     * @returns {Boolean} 로그인 여부
     * @memberOf middleware
     */
    async isLogin (req) {
        console.log('$ middleware.isLogin');
        if(!req.session.user){
            return false;
        }
        return true;
    }

    /**
     * API의 필수 파라미터 확인
     * @param {Object} request
     * @param {String[]} paramList 파라미터 목록, paramList format : ['param:opt',]
     * @returns {Object} 파라미터 확인 및 반환
     * @memberOf middleware
     */
    verifyParams (request, paramList) {
        let reqParams = {};
        let body = (request.method === 'GET') ? request.query : (request.method === 'POST') ? request.body : (() => {
            throw Error(ERROR_CODE.VERIFY_PARAMS_9003);
        })();
        if (typeof body !== 'object') throw Error(ERROR_CODE.VERIFY_PARAMS_9005);

        // parse paramList
        console.log('body:', body);
        let params = [], optParams = [];
        for(let param of paramList){
            let p = param.split(':');
            params.push(p[0]);
            if(p.length > 1) optParams.push(p[0]);
        }
        if(Object.keys(body).length < params.length - optParams.length){ // 파라미터 개수 부족
            throw Error(ERROR_CODE.VERIFY_PARAMS_9000); // 선언되지 않은 파라미터가 있습니다.
        }
        if(Object.keys(body).length > params.length){ // 잘못된 파라미터를 포함
            throw Error(ERROR_CODE.VERIFY_PARAMS_9001); // 정의되지 않은 파라미터가 존재합니다.
        }
        if (! body || Object.keys(body).length == 0) {
            return reqParams;
        }

        for(let key of Object.keys(body)){
            let obj = body[key];
            if(!params.includes(key)){
                throw Error(ERROR_CODE.VERIFY_PARAMS_9002); // 잘못된 파라미터 입니다.
            }
            reqParams[key] = obj;
        }
        return reqParams;

    }

    validateParams (body, paramList) {
        //request.body의 수와 paramList의 수가 같은지 확인
        if (Object.keys(body).length !== paramList.length) {
            throw Error(ERROR_CODE.VERIFY_PARAMS_9000); // 선언되지 않은 파라미터가 있습니다.
            return false;
        }

        //request.body의 key가 paramList에 있는지 확인
        for (let key in body) {
            if (!paramList.includes(key)) {
                throw Error(ERROR_CODE.VERIFY_PARAMS_9002); // 잘못된 파라미터 입니다.
                return false;
            }
        }
        return true;
    }
}

module.exports = new MiddlewareClass();