const express = require('express');
const router = express.Router();
const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const missionClass = require('../class/missionClass');



///////////////////////////////////////////////////////////////////////////
//
//   미션 리스트
//
router.post('/missionList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let mission_list = await missionClass.getMissionList(account_info.account_no);

    let result = pscHandler.successJson({
    mission_list: mission_list,
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 미션 정보보기
//
router.post('/missionInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['mission_id']);
    let mission_id = params['mission_id'];
    if(mission_id === null || mission_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id);

    let result = pscHandler.successJson({
    mission_info: mission_info,
    });

    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 미션 업데이트
//
router.post('/missionUpdate', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['mission_id', 'mission_count']);
    let mission_id = params['mission_id'];
    let mission_count = params['mission_count'];

    if(mission_id === null || mission_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id, mission_count);
    if(mission_info === null || mission_info === undefined ){

        mission_info = await missionClass.addMissionInfo(account_info.account_no, mission_id);
        if(mission_info === null || mission_info === undefined ){
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }        
    }
    else {

        let bUpdate = await missionClass.updateMiissionInfo(account_info.account_no, mission_id, mission_count);
        if (bUpdate === false) {
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }
    }


    mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id);
    if(mission_info === null || mission_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        mission_info: mission_info,
    });
     
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 미션 보상
//
router.post('/missionComplete', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['mission_id', 'mission_count']);
    let mission_id = params['mission_id'];
    let mission_count = params['mission_count'];

    if(mission_id === null || mission_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id, mission_count);
    if(mission_info === null || mission_info === undefined ){

        mission_info = await missionClass.addMissionInfo(account_info.account_no, mission_id);
        if(mission_info === null || mission_info === undefined ){
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }        
    }
    else {

        let bUpdate = await missionClass.updateMiissionInfo(account_info.account_no, mission_id, mission_count);
        if (bUpdate === false) {
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }
    }


    mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id);
    if(mission_info === null || mission_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        mission_info: mission_info,
    });
     
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 미션 보상
//
router.post('/missionReward', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['mission_id', 'mission_count']);
    let mission_id = params['mission_id'];
    let mission_count = params['mission_count'];

    if(mission_id === null || mission_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id, mission_count);
    if(mission_info === null || mission_info === undefined ){

        mission_info = await missionClass.addMissionInfo(account_info.account_no, mission_id);
        if(mission_info === null || mission_info === undefined ){
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }        
    }
    else {

        let bUpdate = await missionClass.updateMiissionInfo(account_info.account_no, mission_id, mission_count);
        if (bUpdate === false) {
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }
    }


    mission_info = await missionClass.getMissionInfo(account_info.account_no, mission_id);
    if(mission_info === null || mission_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        mission_info: mission_info,
    });
     
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 덱 삭제
//
router.post('/missionRemove', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['mission_type']);
    let mission_type = params['mission_type'];

    if(mission_type === null || mission_type === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let mission_info = await missionClass.getDeckInfo(account_info.account_no, mission_type);
    if(mission_info === null || mission_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }    


    let bDelete = await missionClass.removeDeckInfo(account_info.account_no, mission_type);
    if(bDelete === null || bDelete === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        mission_info: mission_info,
    });
        
    await res.json(result);
}));


module.exports = router;
