const express = require('express');
const router = express.Router();

const useful = require('../utils/useful');
const mysqlHandler = require('../Handler/mysqlHandler');
const tgRouteHandler = require('../Handler/tgRouteHandler');
const redisHandler = require('../Handler/redisHandler');
const errorHandler = require('../Handler/errorHandler');

const CONSTANT = require('../config/constant');
const ERROR = require('../config/errorCode');

const accountClass = require('../class/accountClass');
const gameCharClass = require('../class/gameCharClass');


///////////////////////////////////////////////////////////////
//
// 게임 접속시 최초 1회 실행. 인증 성공시 게임용 JWT 토큰과 유저 정보를 반환함.
//
router.post('/connect', async (req, res, next) => {

   let gameuser_id = req.header('user-id');
   let authtype = req.header('isGuest');

   let game_locale = req.header('locale'), user_id;
   if (!game_locale) game_locale = 'US'; // Default

   // 이곳에서 계정이 있는지 체크해서 계정이 없을경우 신규 게정을 만드는 구분을 만든다.
   let account_info = await accountClass.getGameAccount(gameuser_id);

   //  접속가능 여부 체크 시스템 관리 쪽에서 처리
   await tgRouteHandler.server_connectCheck(account_info);
   
   // 계정이 없으니 새로 생성함.
   let is_create_account = false;
   let is_nick_setting = true;
   if (account_info === null || account_info === undefined) {
      account_info = await accountClass.createGameAccount(gameuser_id, game_locale, authtype);
      is_create_account = true;
   }
   else {
      // 로그인 기록에 대한 고민 필요. (토스트에서 로그인 로그를 어느정도 제공함.)
      await accountClass.lastAccessUpdate(account_info.user_id, authtype); // 마지막 접속 시간 갱신.
      account_info.authtype = authtype;
   }

   let gameChar_info = await gameCharClass.getGameChar(account_info.account_no);
   if(gameChar_info === null || gameChar_info === undefined) {
      is_nick_setting = false;
   }

   user_id = account_info.user_id; // 게임 유저아이디 찾아오기
  
   // 로그인 토큰 발행
   let token = await accountClass.getLoginToken(account_info);
   let server_time = useful.getNowTime();

   let serverip;
   let serverinfos;
   let servercoount = 999;
   let serverInfo = {};
   let server_list = await redisHandler.hGetAll(CONSTANT.REDIS_KEY.SERVER_CONNECT);

   if(server_list !== null && server_list !== undefined) {

       let sercount = 0;
   
       if (server_list && Object.values(server_list).length > 0) {
           for (let [serverinfo, total] of Object.entries(server_list)) {

               let vTotal = JSON.parse(total);
               count = useful.toNum(vTotal.count);
               if(servercoount > count){
                   serverInfo = vTotal;
                   servercoount = count;
               } 
               sercount++;
           }
       }
   }

   let result = tgRouteHandler.successJson({
       server_time: server_time,
       isCreateAccount: is_create_account,
       isNickSetting: is_nick_setting,
       authToken: token,
       userInfo: account_info,
       serverAddress: serverInfo,
   });

   await res.json(result);
});


///////////////////////////////////////////////////////////////////////////
//
// 탈퇴 요청
//
router.post('/withdraw', async (req, res, next) => {
   let user_id = req.account_info.user_id;

   let now_date = useful.getNowTime();

   // 지갑이 연동되어 있는지 체크한다. 

   // 길드가 있는지 체크한다.

   // 계정 임시 탈퇴처리
   let account_info = await mongo.game.select('account').updateReturn({ user_id: user_id }, {
       $set: {
           withdraw: true,
           withdraw_date: now_date
       }
   }, { projection: { id: false, gamebase_id: false } });

   // 로그 기록
   day1.log.queue_accountConn(account_info, 'withdraw');

   let result = day1.success({
       ...account_info
   });
   await res.json(result);
});


///////////////////////////////////////////////////////////////////////////
//
// 탈퇴 요청 취소
//
router.post('/withdrawCancel', async (req, res) => {
   let user_id = req.account_info.user_id;

   // 계정 탈퇴취소 가능한날짜인지 체크한다.
   let now_date = useful.getNowTime();
   let diff_time = useful.dateDiff( now_date, req.account_info.withdraw_date, 'seconds');
   if(diff_time >= parseInt(user_secession) ) {
       errorHandler.throwError(9534, 9001023);
   }

   // 계정 탈퇴취소 시킨다.
   let account_info = await mongo.game.select('account').updateReturn({ user_id: user_id }, {
       $set: {
           withdraw: false,
           withdraw_date: now_date
       }
   }, { projection: { id: false, gamebase_id: false } });

   // 로그 기록
   day1.log.queue_accountConn(account_info, 'withdraw_cancel');

   let result = day1.success({
       ...account_info
   });
   await res.json(result);
});


module.exports = router;