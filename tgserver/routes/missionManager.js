const express = require('express');
const router = express.Router();
const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const missionClass = require('../class/missionClass');



///////////////////////////////////////////////////////////////////////////
//
//  덱 리스트
//
router.post('/deckList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let deck_list = await missionClass.getDeckList(account_info.account_no);

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


module.exports = router;
