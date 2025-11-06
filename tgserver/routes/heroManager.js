const express = require('express');
const router = express.Router();

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const heroClass = require('../class/heroClass');



///////////////////////////////////////////////////////////////////////////
//
// 영웅 리스트
//
router.post('/heroList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let hero_list = await heroClass.getHeroList(account_info.account_no);

    let result = pscHandler.successJson({
        hero_list: hero_list,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 영웅 정보보기
//
router.post('/heroInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['hero_no']);
    let hero_no = params['hero_no'];
    if(hero_no === null || hero_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let hero_info = await heroClass.getHeroInfo(account_info.account_no, hero_no);

    let result = pscHandler.successJson({
        hero_info: hero_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 영웅 획득
//
router.post('/heroCreate', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['hero_id', 'hero_type', 'hero_grade', 'hero_star']);
    let hero_id = params['hero_id'];
    let hero_type = params['hero_type'];
    let hero_grade = params['hero_grade'];
    let hero_star = params['hero_star'];

    if(hero_id === null || hero_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    if(hero_type === null || hero_type === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    item_count = useful.toNum(item_count);
    if (useful.decimal(item_count).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let hero_no = await heroClass.createHeroInfo(account_info.account_no, hero_id, hero_type, hero_grade, hero_star);
    if (hero_no === 0) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let hero_info = await heroClass.getItemInfo(account_info.account_no, hero_no);
    if(hero_info === null || hero_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        hero_info: hero_info,
    });
      
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 영웅 삭제
//
router.post('/heroRemove', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['hero_no']);
    let hero_no = params['hero_no'];
    if(hero_no === null || hero_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let hero_info = await heroClass.getHeroInfo(account_info.account_no, hero_no);
    if(hero_info !== null && hero_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bDelete = await heroClass.removeHeroInfo(account_info.account_no, hero_no);
    if (bDelete === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let result = pscHandler.successJson({
        hero_info: hero_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 영웅 경험치 증가
//
router.post('/heroLevelExp', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['item_no', 'item_count']);
    let item_no = params['item_no'];
    let item_count = params['item_count'];
    if(item_no === null || item_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    item_count = useful.toNum(item_count);
    if (useful.decimal(item_count).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let item_info = await itemClass.getItemInfo(account_info.account_no, item_no);
    if(item_info === null || item_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    if (useful.decimal(item_info.item_count).lessThanOrEqualTo(item_count)) {
        errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
    }   

    let bUpdate = await itemClass.updateItemInfo(account_info.account_no, item_no, item_count);
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    item_info.item_count = useful.decimal(item_info.item_count).minus(item_count).toNumber();

    let result = pscHandler.successJson({
        item_info: item_info,
        useitem_count:item_count
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 영웅 등급 및 성급 변경
//
router.post('/heroGradeStar', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['hero_no', 'hero_grade', 'hero_star']);
    let hero_no = params['hero_no'];
    let hero_grade = params['hero_grade'];
    let hero_star = params['hero_star'];
    if(hero_no === null || hero_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    hero_grade = useful.toNum(hero_grade);
    if (useful.decimal(hero_grade).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    hero_star = useful.toNum(hero_star);
    if (useful.decimal(hero_star).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let hero_info = await heroClass.getHeroInfo(account_info.account_no, hero_no);
    if(hero_info === null || hero_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    if (useful.decimal(hero_info.hero_grade).lessThanOrEqualTo(hero_grade)) {
        errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
    }

    if (useful.decimal(hero_info.hero_star).lessThanOrEqualTo(hero_star)) {
        errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
    }

    let bUpdate = await itemClass.updateHeroGradeStar(account_info.account_no, hero_no, hero_grade, hero_star);
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let result = pscHandler.successJson({
        hero_info: hero_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 영웅 경험치 증가
//
router.post('/heroLevelExp', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['item_no', 'item_count']);
    let item_no = params['item_no'];
    let item_count = params['item_count'];
    if(item_no === null || item_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    item_count = useful.toNum(item_count);
    if (useful.decimal(item_count).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let item_info = await itemClass.getItemInfo(account_info.account_no, item_no);
    if(item_info === null || item_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    if (useful.decimal(item_info.item_count).lessThanOrEqualTo(item_count)) {
        errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
    }   

    let bUpdate = await itemClass.updateItemInfo(account_info.account_no, item_no, item_count);
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    item_info.item_count = useful.decimal(item_info.item_count).minus(item_count).toNumber();

    let result = pscHandler.successJson({
        item_info: item_info,
        useitem_count:item_count
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 영웅 세팅
//

module.exports = router;
