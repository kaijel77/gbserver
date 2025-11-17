const express = require('express');
const router = express.Router();
const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const continentStageClass = require('../class/continentStageClass');
const deckClass = require('../class/deckClass');



///////////////////////////////////////////////////////////////////////////
//
//  스테이지 리스트
//
router.post('/stageList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let stage_list = await continentStageClass.getStageList(account_info.account_no);

    let result = pscHandler.successJson({
      stage_list: stage_list,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 정보보기
//
router.post('/stageInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['stage_no']);
    let stage_no = params['stage_no'];
    if(stage_no === null || stage_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_no);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 시작
//
router.post('/stageStart', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['stage_no', 'deck_type']);
    let stage_no = params['stage_no'];
    let deck_type = params['deck_type'];
    if(stage_no === null || stage_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let deck_info = await deckClass.getDeckInfo(account_info.account_no, deck_type);
    if(deck_info === null || deck_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_no);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 종료
//
router.post('/stageEnd', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['stage_no']);
    let stage_no = params['stage_no'];
    if(stage_no === null || stage_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_no);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 여기서 결과 처리
    let bUpdate = await continentStageClass.updateStageInfo(account_info.account_no, stage_no, stage_info.stage_id, stage_info.continent_id, stage_info.stage_currentid)
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_no);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


module.exports = router;
