const express = require('express');
const router = express.Router();

const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const friendClass = require('../class/friendClass');


///////////////////////////////////////////////////////////////////////////
//
// 친구 리스트
//
router.post('/friendList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let friend_List = await friendClass.getFriendList();

    let result = pscHandler.successJson({
        friend_List: friend_List,
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 리스트
//
router.post('/friendInviteList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let friend_InviteList = await friendClass.getFriendInviteList(account_info.account_no);

    let result = pscHandler.successJson({
        friend_InviteList: friend_InviteList,
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 리스트
//
router.post('/friendRequestList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let friend_InviteList = await friendClass.getFriendAccountList(account_info.account_no);

    let result = pscHandler.successJson({
        friend_InviteList: friend_InviteList,
    });

    await res.json(result);
}));

///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/friendInvite', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['invite_no']);
    let invite_no = params['invite_no'];
    if(invite_no === null || invite_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_InviteList = await friendClass.getFriendList(account_info.account_no, invite_no);
    if(friend_InviteList === null || friend_InviteList === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    
    let result = pscHandler.successJson({
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/friendInviteCancel', pscHandler.asyncWrap(async function (req, res) {

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
router.post('/friendKickOut', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 삭제
//
router.post('/friendWithdrawal', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });

    await res.json(result);
}));


module.exports = router;
