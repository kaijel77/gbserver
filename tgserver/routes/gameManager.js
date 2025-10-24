const express = require('express');
const router = express.Router();

const tgRouteHandler = require('../Handler/tgRouteHandler');
const errorHandler = require('../Handler/errorHandler');

const gameCharClass = require('../class/gameCharClass');




//
// 게임 접속시 게임 계정 생성 및 닉네임 생성0.
//
router.post('/gameNickCreate', async(req, res, next) => {

   let account_info = req.account_info;
   let user_id = account_info.user_id;

   let params = tgRouteHandler.verifyParams(req, ['gamechar_name']);
   let gamechar_name = params['gamechar_name'];
   if(gamechar_name === null || gamechar_name === undefined){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let char_name = await gameCharClass.checkGameUserName(gamechar_name); // 닉네임 체크
   if(char_name !== null && char_name !== undefined)
   {
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let bCreate = await gameCharClass.createGameChar(account_info.account_no, gamechar_name);
   if(bCreate == false){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }
/*   
   if(authtype === CONSTANT.AUTHNEWTYPE.GOOGLE){ // 구글 계정 연동 업적 추가
       await missionMng.missionCheckValue(user_id, CONSTANT.ACHIEVEMENT.CONNECT_ACCOUNT, CONSTANT.ACHIEVEMENT.CONNECT_ACCOUNT, 1); // 계정 첫 연동
   }
*/
   let result = tgRouteHandler.successJson({
       result: 'ok'
   });

   await res.json(result);
});


///////////////////////////////////////////////////////////////////////////
//
// 게임 기본 정보를 받는다.
//
router.post('/startGame', async (req, res, next) => {
    let account_info = req.account_info;
    let user_id = account_info.user_id;

   //  접속가능 여부 체크 시스템 관리 쪽에서 처리
   await tgRouteHandler.server_connectCheck(account_info);
   
   if( account_info.tutorial_clear == false) {
      // 1. 게임데이터를 생성한다는건 튜토리얼을 완료했다는 의미.
      await account.tutorialComplete(user_id);
   }

   // 캐싱 초기화.
//   await cache.truncate(user_id);
   let item_list = {};
   let hero_list = {};
   let equip_list = {};
   

   // 여기서 출석 체크를 할 여부를 정한다.

   let result = tgRouteHandler.successJson({
      itemList: item_list,
      heroList: hero_list,
      equipList: equip_list,
   });

   await res.json(result);
});



///////////////////////////////////////////////////////////////////////////
//
// 출석 체크.
//


module.exports = router;
