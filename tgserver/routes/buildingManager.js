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

    let result = pscHandler.successJson({
    });
    
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 건물 업그레이드
//
router.post('/buildingUpgrade', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
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
