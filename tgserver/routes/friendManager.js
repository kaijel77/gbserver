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

    let friend_List = await friendClass.getFriendList(account_info.account_no);

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

    let friend_Info = await friendClass.getFriendInfo(account_info.account_no, invite_no);
    if(friend_Info !== null && friend_Info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_InviteList1 = await friendClass.getFriendInviteInfo(account_info.account_no, invite_no);
    if(useful.decimal(friend_InviteList1.length).greaterThan(0)){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_InviteList2 = await friendClass.getFriendInviteInfo(invite_no, account_info.account_no);
    if(useful.decimal(friend_InviteList2.length).greaterThan(0)){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
 
    let bCreate = await friendClass.insertFriendInviteInfo (account_info.account_no, invite_no);
    if(bCreate === null || bCreate === undefined || bCreate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/friendInviteCancel', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['invite_no']);
    let invite_no = params['invite_no'];
    if(invite_no === null || invite_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_Info = await friendClass.getFriendInfo(account_info.account_no, invite_no);
    if(friend_Info !== null && friend_Info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_InviteList1 = await friendClass.getFriendInviteInfo(account_info.account_no, invite_no);
    if(useful.decimal(friend_InviteList1.length).lessThanOrEqualTo(0)){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bRemove = await friendClass.removeFriendInviteInfo (account_info.account_no, invite_no);
    if(bRemove === null || bRemove === undefined || bRemove === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 수락
//
router.post('/friendAcceptCancel', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['friend_no']);
    let friend_no = params['friend_no'];
    if(friend_no === null || friend_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_Info = await friendClass.getFriendInfo(friend_no, account_info.account_no);
    if(friend_Info !== null && friend_Info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_InviteList = await friendClass.getFriendInviteInfo(friend_no, account_info.account_no);
    if(useful.decimal(friend_InviteList.length).lessThanOrEqualTo(0)){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bRemove = await friendClass.removeFriendInviteInfo (friend_no, account_info.account_no);
    if(bRemove === null || bRemove === undefined || bRemove === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 수락
//
router.post('/friendAcceptConfirm', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['friend_no']);
    let friend_no = params['friend_no'];
    if(friend_no === null || friend_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_Info = await friendClass.getFriendInfo(friend_no, account_info.account_no);
    if(friend_Info !== null && friend_Info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_InviteList = await friendClass.getFriendInviteInfo(friend_no, account_info.account_no);
    if(useful.decimal(friend_InviteList.length).lessThanOrEqualTo(0)){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bRemove = await friendClass.removeFriendInviteInfo (friend_no, account_info.account_no);
    if(bRemove === null || bRemove === undefined || bRemove === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bCreate = await friendClass.insertFriendInfo(account_info.account_no, friend_no);
    if(bCreate === null || bCreate === undefined || bCreate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    bCreate = await friendClass.insertFriendInfo(friend_no, account_info.account_no);
    if(bCreate === null || bCreate === undefined || bCreate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 삭제
//
router.post('/friendKickOut', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['friend_no']);
    let friend_no = params['friend_no'];
    if(friend_no === null || friend_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let friend_Info = await friendClass.getFriendInfo(account_info.account_no, friend_no);
    if(friend_Info === null || friend_Info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bRemove = await friendClass.removeFriendInfo(account_info.account_no, friend_no);
    if(bRemove === null || bRemove === undefined || bRemove === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    bRemove = await friendClass.removeFriendInfo(friend_no, account_info.account_no);
    if(bRemove === null || bRemove === undefined || bRemove === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });
    
    await res.json(result);
}));

module.exports = router;
