const express = require('express');
const router = express.Router();

const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const gameCharClass = require('../class/gameCharClass');



///////////////////////////////////////////////////////////////////////////
//
// 이벤트 리스트
//
router.post('/eventList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 이벤트 정보
//
router.post('/eventInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 이벤트 출석
//
router.post('/eventAttendance', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 이벤트 출석
//
router.post('/eventRoulette', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 이벤트 출석
//
router.post('/eventBingo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 이벤트 출석
//
router.post('/eventPuzzle', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 이벤트 출석
//
router.post('/eventQuiz', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


module.exports = router;
