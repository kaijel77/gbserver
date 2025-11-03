const express = require('express');
const router = express.Router();

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const mailClass = require('../class/mailClass');
const itemClass = require('../class/itemClass');



///////////////////////////////////////////////////////////////////////////
//
// 우편함 리스트
//
router.post('/mailList', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let mail_list = await mailClass.getMailList(account_info.account_no);
/*
   let accountInfo =await accounts.getUserEmail(body.mb_email);

   await emailsend.message(accountInfo.id, accountInfo.password);
*/
   let result = pscHandler.successJson({
      mail_list: mail_list,
   });


   
   await res.json(result);
}));




///////////////////////////////////////////////////////////////////////////
//
// 우편 읽기
//
router.post('/mailRead', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;
   let gameChar_info = req.gameChar_info;

   let params = pscHandler.verifyParams(req, ['mail_no']);
   let mail_no = params['mail_no'];
   if(mail_no === null || mail_no === undefined){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let mail_info = await mailClass.getMailInfo(mail_no, gameChar_info.char_no);
   if(mail_info === null || mail_info === undefined){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let result = pscHandler.successJson({
      mail_info: mail_info,
   });

   await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 우편 보상받기
//
router.post('/mailReward', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;
   let gameChar_info = req.gameChar_info;
   let mail_no = params['mail_no'];
   if(mail_no === null || mail_no === undefined){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let bDelete = await mailClass.rewardMailInfo(mail_no, gameChar_info.char_no);
   if(bDelete == false){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let result = pscHandler.successJson({
      result: true,
   });

   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 우편 삭제
//
router.post('/mailDelete', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;
   let gameChar_info = req.gameChar_info;
   let mail_no = params['mail_no'];
   if(mail_no === null || mail_no === undefined){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let bDelete = await mailClass.deleteMailInfo(mail_no, gameChar_info.char_no);
   if(bDelete == false){
      // 닉네임이 있어서 실패 
      errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let result = pscHandler.successJson({
      result: true,
   });

   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 우편 보내기
//


///////////////////////////////////////////////////////////////////////////
//
// E메일 보내기
//
router.post('/password_lostcheck', pscHandler.asyncWrap(async function (req, res) {

   let body = req.body;

   let accountInfo =await accounts.getUserEmail(body.mb_email);

   await emailsend.message(accountInfo.id, accountInfo.password);


   data = {
      page: 'bbsMng/password_lostcheck',
      cate: 'password_lostcheck',
      accountinfo:accountInfo,      
   }

   res.render('main', data);
}));



module.exports = router;
