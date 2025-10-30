const express = require('express');
const router = express.Router();

const tgRouteHandler = require('../Handler/tgRouteHandler');
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
router.post('/friendList', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/friendInvite', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 수락
//
router.post('/friendAccept', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 삭제
//
router.post('/friendRemove', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));



module.exports = router;
