const express = require('express');
const router = express.Router();

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const friendClass = require('../class/friendClass');


// friendJoinRequest
// friendjoinRequestList
// friendjoinRequestCancel
// friendJoinAccept
// friendWithdrawal
// friendKickout

///////////////////////////////////////////////////////////////////////////
//
// 친구 리스트
//
router.post('/friendList', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let result = pscHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/friendInvite', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let result = pscHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 수락
//
router.post('/friendAccept', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = pscHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 삭제
//
router.post('/friendRemove', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = pscHandler.successJson({
   });
   
   await res.json(result);
}));



module.exports = router;
