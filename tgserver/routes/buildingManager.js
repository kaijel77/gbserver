const CONSTANT = require('../config/constant');
const express = require('express');
const router = express.Router();

const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const buildingClass = require('../class/buildingClass');



///////////////////////////////////////////////////////////////////////////
//
// 건물 리스트
//
router.post('/buildingList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let building_list = await buildingClass.getBuildingList(account_info.account_no);

    let result = pscHandler.successJson({
        building_list: building_list,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 건물 정보
//
router.post('/buildingInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['building_id']);
    let building_id = params['building_id'];
    if(building_id === null || building_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let building_info = await buildingClass.getBuildingInfo(account_info.account_no, building_id);

    let result = pscHandler.successJson({
        building_info: building_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 건물 건설
//
router.post('/buildingBuild', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['building_id']);
    let building_id = params['building_id'];
    if(building_id === null || building_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let building_info = await buildingClass.getBuildingInfo(account_info.account_no, building_id);
    if(building_info !== null && building_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let building_type = 1;
    let building_level = 1;
    let building_status = 2;

    //  여기서 나중에 건물관련 테이블을 찾아 서 처리한다.
    bCreate = await buildingClass.insertBuildingInfo(account_info.account_no, building_id, building_type, building_level, building_status);
    if(bCreate === null || bCreate === undefined || bCreate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    building_info = await buildingClass.getBuildingInfo(account_info.account_no, building_id);
    if(building_info === null || building_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        building_info: building_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 건물 업그레이드
//
router.post('/buildingUpgrade', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['building_id']);
    let building_id = params['building_id'];
    if(building_id === null || building_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let building_info = await buildingClass.getBuildingInfo(account_info.account_no, building_id);
    if(building_info === null || building_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    //  여기서  endTime 과 상태를 체크한다.
    if(useful.decimal(building_info.building_status).equals(CONSTANT.BUILDING.STATUS.UPGRADE)) {
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 타이머 남은 시간 확인
    let remain_time = useful.dateDiff(building_info.building_endtime, useful.getNowTime(), 'seconds');
    if (useful.decimal(remain_time).greaterThan(2)) {
        errorHandler.throwError(3007, 9000009);
    }

    //  여기서 빌딩 업그레이드 최대치에 이르렀는지 체크한다.

    let building_level = useful.decimal(building_info.building_level).plus(1).toNumber();
    let building_status = 2;

    let building_endTime = useful.getDateTimeFormat(useful.dateAddTime(100));
    
    //  여기서 나중에 건물관련 테이블을 찾아 서 처리한다.
    bCreate = await buildingClass.upgradeBuildingInfo(account_info.account_no, building_id, building_level, building_status, building_endTime);
    if(bCreate === null || bCreate === undefined || bCreate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        building_info: building_info,
    });
   
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 건물 해체
//
router.post('/buildingEndtime', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['building_id']);
    let building_id = params['building_id'];

    if(building_id === null || building_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let building_info = await buildingClass.getBuildingInfo(account_info.account_no, building_id);
    if(building_info === null || building_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    //  여기서  endTime 과 상태를 체크한다.
    if(useful.decimal(building_info.building_status).equals(CONSTANT.BUILDING.STATUS.IDLE)) {
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 타이머 남은 시간 확인
    let remain_time = useful.dateDiff(building_info.building_endtime, useful.getNowTime(), 'seconds');
    if (useful.decimal(remain_time).greaterThan(0)) {
        errorHandler.throwError(3007, 9000009);
    }

    //  여기서 빌딩 업그레이드 최대치에 이르렀는지 체크한다.
    building_info.building_status = 1;
    
    //  여기서 나중에 건물관련 테이블을 찾아 서 처리한다.
    let bUpdate = await buildingClass.endBuildingInfo(account_info.account_no, building_id, building_info.building_status);
    if(bUpdate === null || bUpdate === undefined || bUpdate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        building_info: building_info,
    });
   
        
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 건물 해체
//
router.post('/buildingDestroy', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['building_id']);
    let building_id = params['building_id'];

    if(building_id === null || building_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let building_info = await buildingClass.getBuildingInfo(account_info.account_no, building_id);
    if(building_info === null || building_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }    


    let bDelete = await buildingClass.removeBuildingInfo(account_info.account_no, building_id);
    if(bDelete === null || bDelete === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        building_info: building_info,
    });
        
    await res.json(result);
}));

module.exports = router;
