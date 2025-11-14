const express = require('express');
const router = express.Router();

const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const heroClass = require('../class/heroClass');
const equipClass = require('../class/equipClass');



///////////////////////////////////////////////////////////////////////////
//
// 장비 리스트
//
router.post('/equipList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let equip_list = await equipClass.getEquipList(account_info.account_no);

    let result = pscHandler.successJson({
        equip_list: equip_list,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 확인
//
router.post('/equipInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['equip_no']);
    let equip_no = params['equip_no'];
    if(equip_no === null || equip_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 추가
//
router.post('/equipCreate', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;


    let params = pscHandler.verifyParams(req, ['equip_id', 'equip_type', 'equip_grade', 'equip_star']);
    let equip_id = params['equip_id'];
    let equip_type = params['equip_type'];
    let equip_grade = params['equip_grade'];
    let equip_star = params['equip_star'];

    if(equip_id === null || equip_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    if(equip_type === null || equip_type === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let equip_no = await equipClass.createEquipInfo(account_info.account_no, equip_id, equip_type, equip_grade, equip_star);
    if (equip_no === 0) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 착용
//
router.post('/equipInstall', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['equip_no', 'hero_no']);
    let equip_no = params['equip_no'];
    let hero_no = useful.toNum(params['hero_no']);
    if(equip_no === null || equip_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    if (useful.decimal(hero_no).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let equip_hero = useful.toNum(equip_info.equip_hero);
    if (useful.decimal(equip_hero).greaterThan(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let hero_info = await heroClass.getHeroInfo(account_info.account_no, hero_no);
    if(hero_info === null || hero_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
    

    let bUpdate = await equipClass.updateEquipHeroInfo(account_info.account_no, equip_no, hero_no);
    if(bUpdate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 이곳에서 영웅에게 장비를 착용 여부를 할지 고민

    equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 해지
//
router.post('/equipUninstall', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['equip_no']);
    let equip_no = params['equip_no'];
    if(equip_no === null || equip_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    if (useful.decimal(equip_no).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let equip_hero = useful.toNum(equip_info.equip_hero);
    if (useful.decimal(equip_hero).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }    

    let bUpdate = await equipClass.updateEquipHeroInfo(account_info.account_no, equip_no, 0);
    if(bUpdate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 이곳에서 영웅에게 장비를 착용 여부를 할지 고민

    equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 레벨업
//
router.post('/equipLevelup', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['equip_no', 'equip_star', 'equip_grade', 'equip_level', 'equip_exp']);
    let equip_no = params['equip_no'];
    let equip_star = useful.toNum(params['equip_star']);
    let equip_grade = useful.toNum(params['equip_grade']);
    let equip_level = useful.toNum(params['equip_level']);
    let equip_exp = useful.toNum(params['equip_exp']);
    if(equip_no === null || equip_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    if (useful.decimal(equip_star).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }
    if (useful.decimal(equip_grade).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }
    if (useful.decimal(equip_level).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }
    if (useful.decimal(equip_exp).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bUpdate = await equipClass.updateEquipLevelInfo(account_info.account_no, equip_no, equip_star, equip_grade, equip_level, equip_exp);
    if(bUpdate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 락/언락
//
router.post('/equipLocked', pscHandler.asyncWrap(async function (req, res) {
    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['equip_no', 'equip_lock']);
    let equip_no = params['equip_no'];
    let equip_lock = useful.toNum(params['equip_lock']);
    if(equip_no === null || equip_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    if (useful.decimal(equip_lock).equals(equip_info.equip_lock)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let bUpdate = await equipClass.updateEquipLockInfo(account_info.account_no, equip_no, equip_lock);
    if(bUpdate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));





///////////////////////////////////////////////////////////////////////////
//
// 장비 강화(미확정)
//
router.post('/equipReinforce', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 해체(미확정)
//
router.post('/equipDismantle', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 융합(미확정)
//
router.post('/equipCombine', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let result = pscHandler.successJson({
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 장비 삭제
//
router.post('/equipRemove', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['equip_no']);
    let equip_no = params['equip_no'];
    if(equip_no === null || equip_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let equip_info = await equipClass.getEquipInfo(account_info.account_no, equip_no);
    if(equip_info === null || equip_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bDelete = await equipClass.removeEquipInfo(account_info.account_no, equip_no);
    if (bDelete === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let result = pscHandler.successJson({
        equip_info: equip_info,
    });
   
    await res.json(result);
}));


module.exports = router;
