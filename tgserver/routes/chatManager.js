const express = require('express');
const router = express.Router();
const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/chatList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/chatNormal', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/chatServer', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/chatSpecial', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/chatWhisper', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));

///////////////////////////////////////////////////////////////////////////
/
// 친구 추가
//
router.post('/chatGuild', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 친구 추가
//
router.post('/chatFriend', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));



module.exports = router;
