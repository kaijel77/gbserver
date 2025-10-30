const express = require('express');
const router = express.Router();

const tgRouteHandler = require('../Handler/tgRouteHandler');
const errorHandler = require('../Handler/errorHandler');

const guildClass = require('../class/guildClass');

// 길드 창설
// guildCreate
// guildChangeInfo
// guildBeakUp
// guildSearch
// guildrecommend
// guildCheckName
// guildChatList
// guildChatSend
// guildJoinRequest
// guildjoinRequestList
// guildjoinRequestCancel
// guildJoinAccept
// guildWithdrawal
// guildKickout
// guildChangeUserGrade

// buy
// donation
// getDistribution
// changeDistribution

///////////////////////////////////////////////////////////////////////////
//
// 길드 정보
//
router.post('/guildInfo', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드멤버 정보
//
router.post('/guildMemberList', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드 초다
//
router.post('/guildInvite', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = tgRouteHandler.successJson({
   });
   
   await res.json(result);
}));



module.exports = router;
