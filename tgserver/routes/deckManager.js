const express = require('express');
const router = express.Router();
const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const deckClass = require('../class/deckClass');



///////////////////////////////////////////////////////////////////////////
//
//  덱 리스트
//
router.post('/deckList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let deck_list = await deckClass.getDeckList(account_info.account_no);

    let result = pscHandler.successJson({
    deck_list: deck_list,
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 덱 정보보기
//
router.post('/deckInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['deck_type']);
    let deck_type = params['deck_type'];
    if(deck_type === null || deck_type === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let deck_info = await deckClass.getDeckInfo(account_info.account_no, deck_type);

    let result = pscHandler.successJson({
    deck_info: deck_info,
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 덱세팅
//
router.post('/deckSetting', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['deck_type', 'deck_hero01', 'deck_hero02', 'deck_hero03', 'deck_hero04', 'deck_hero05', 'deck_hero06', 'deck_hero07', 'deck_hero08']);
    let deck_type = params['deck_type'];
    let deck_hero01 = params['deck_hero01'];
    let deck_hero02 = params['deck_hero02'];
    let deck_hero03 = params['deck_hero03'];
    let deck_hero04 = params['deck_hero04'];
    let deck_hero05 = params['deck_hero05'];
    let deck_hero06 = params['deck_hero06'];
    let deck_hero07 = params['deck_hero07'];
    let deck_hero08 = params['deck_hero08'];

    if(deck_type === null || deck_type === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let deck_info = await deckClass.getDeckInfo(account_info.account_no, deck_type);
    if(deck_info === null || deck_info === undefined){

        let bCreate = await deckClass.addSettingDeckInfo(account_info.account_no, deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08);
        if (bCreate === false) {
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }
    }
    else {

        let bUpdate = await deckClass.updateSettingDeckInfo(account_info.account_no, deck_type, deck_hero01, deck_hero02, deck_hero03, deck_hero04, deck_hero05, deck_hero06, deck_hero07, deck_hero08);
        if (bUpdate === false) {
            errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
        }
    }

    deck_info = await deckClass.getDeckInfo(account_info.account_no, deck_type);
    if(deck_info === null || deck_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        deck_info: deck_info
    });
        
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 덱 삭제
//
router.post('/deckRemove', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['deck_type']);
    let deck_type = params['deck_type'];

    if(deck_type === null || deck_type === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    let deck_info = await deckClass.getDeckInfo(account_info.account_no, deck_type);
    if(deck_info === null || deck_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bDelete = await deckClass.removeDeckInfo(account_info.account_no, deck_type);
    if (bDelete === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let result = pscHandler.successJson({
        deck_info: deck_info,
    });

    await res.json(result);
}));

module.exports = router;
