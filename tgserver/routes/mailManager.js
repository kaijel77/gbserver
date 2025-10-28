const express = require('express');
const router = express.Router();

const tgRouteHandler = require('../Handler/tgRouteHandler');
const errorHandler = require('../Handler/errorHandler');

const gameCharClass = require('../class/gameCharClass');
const mailClass = require('../class/mailClass');



///////////////////////////////////////////////////////////////////////////
//
// 우편함 리스트
//
router.post('/mailList', async function (req, res) {

   let account_info = req.account_info;
   let gameChar_info = req.gameChar_info;

   let mail_list = await mailClass.getMailList(gameChar_info.char_no);
/*
   let accountInfo =await accounts.getUserEmail(body.mb_email);

   await emailsend.message(accountInfo.id, accountInfo.password);
*/
   let result = tgRouteHandler.successJson({
      mail_list: mail_list,
   });


   
   await res.json(result);
});




///////////////////////////////////////////////////////////////////////////
//
// 우편 읽기
//

///////////////////////////////////////////////////////////////////////////
//
// 우편 삭제
//



///////////////////////////////////////////////////////////////////////////
//
// 우편 보상받기
//


///////////////////////////////////////////////////////////////////////////
//
// 우편 보내기
//



///////////////////////////////////////////////////////////////////////////
//
// E메일 보내기
//
router.post('/password_lostcheck', async function (req, res) {

   let body = req.body;

   let accountInfo =await accounts.getUserEmail(body.mb_email);

   await emailsend.message(accountInfo.id, accountInfo.password);


   data = {
      page: 'bbsMng/password_lostcheck',
      cate: 'password_lostcheck',
      accountinfo:accountInfo,      
   }

   res.render('main', data);
});



module.exports = router;
