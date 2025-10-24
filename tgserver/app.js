const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config/default');
   
const errorHandler = require('./Handler/errorHandler');
const tgRouteHandler = require('./Handler/tgRouteHandler');

const useful = require('./utils/useful');

app.use(cors());
if (config.debug_mode) {
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestIp.mw())

let debug_account = (config.debug_mode) ? true : false; // 디버그 모드가 아니라면 동작하면 안됨.


///////////////////////////////////////////////////////////////////////////
//
// 토큰 체크
// 
// @param req
// @param res
// @param next
// @returns {Promise<void>}
// 
let authentication = async function (req, res, next) {

    let path = req.originalUrl.split('/')[1];
    let sub_path = req.originalUrl.split('/')[2];
    if (['gameInit', 'initAll', 'checkToken', 'battleLog', 'gameNickCreate', 'test'].includes(path)) { // 게임 초기화시 필요한 기능. 디버그 모드에서만 동작 해야함.
   
        const accountClass = require('./class/accountClass');
        if (!debug_account) {
            return res.json(day1.error(1015, 9999999)); // TODO 신규 추가 코드 필요.
        }
        let user_id = req.header('user-id');

      req.account_info = await accountClass.getGameAccount(user_id);
      if (!req.account_info?.user_id) {
         errorHandler.throwError(1021, 9000042); // 토큰을 통한 계정 유무 확인
      }

      next();
   } else if (['connect'].includes(path)) { // 최초 접속시 토큰 확인
      try {
         if (!debug_account && !req.header('user-id')) {
            errorHandler.throwError(1011, 9000002);
         }
         if (!debug_account && !req.header('access-token')) {
            errorHandler.throwError(1012, 9000003);
         }
         next();
      } catch (err) {
         errorHandler.setError(err);
         return res.json(day1.error(err.code, err.message, errorHandler.error));
      }
   } else { // 그 외에는 필수체크
      try {
         const accountClass = require('./class/accountClass');
         if (!req.header('td-access-token')) {
            errorHandler.throwError(1012, 9000003);
         }
         let authToken = req.header('td-access-token');

         let token_info = await accountClass.verifyToken(authToken);
         if(token_info === null || token_info === undefined) {
            errorHandler.throwError(1021, 9000042); // 토큰을 통한 계정 유무 확인
         }

         req.account_info = await accountClass.getGameAccount(token_info.user_id);
         if (!req.account_info?.user_id) {
            errorHandler.throwError(1021, 9000042); // 토큰을 통한 계정 유무 확인
         }

         if (req.account_info?.block === true) {
            let limit = useful.dateDiff(req.account_info.block_date, useful.getNowTime(), 'seconds');
            if (limit > 1) {
               errorHandler.throwError(2104, 9000252); // 사용이 금지된 유저 계정.
            } else {
               // 여기서 해제 되어야함.
               req.account_info = await account.unblock(token_info.user_id);
            }
         }
         
         if (['withdrawCancel'].includes(path)) {
            if (req.account_info?.withdraw === false) {
               errorHandler.throwError(2103, 9001021); // 취소할 필요 없는 계정.
            }
         } else if (req.account_info?.withdraw === true) { // 그 외
            errorHandler.throwError(2101, 9001025); // 이미 탈퇴한 계정이라면 막아야함.
         }
         next();
      } catch (err) {
         errorHandler.setError(err);
         return res.json(tgRouteHandler.errorJson(err.code, err.message, errorHandler.error));
      }
   }
};


app.use(authentication);


require('./Handler/routeHandler')(app);

// =====================
// API Error Handler
// =====================
app.use(errorHandler.wrapAsync());

module.exports = app;
