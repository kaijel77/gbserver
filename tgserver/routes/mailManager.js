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
