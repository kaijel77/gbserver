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

   let params = pscHandler.verifyParams(req, ['item_id', 'item_type', 'item_count', 'item_no']);
   let item_no = params['item_no'];
   let item_id = params['item_id'];
   let item_type = params['item_type'];
   let item_count = params['item_count'];

   if(item_id === null || item_id === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
   }

   if(item_type === null || item_type === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
   }

   item_count = useful.toNum(item_count);
   if (useful.decimal(item_count).lessThanOrEqualTo(0)) {
       errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
   }

   let item_info = null;
   if(item_no === null || item_no === undefined || item_no === 0){

       item_info = await itemClass.getItemIDInfo(account_info.account_no, item_id);
       if(false == (item_info === null || item_info === undefined)){
           item_no = item_info.item_no;
       }        
   }

   if(item_info === null || item_info === undefined){

       item_no = await itemClass.addItemInfo(account_info.account_no, item_id, item_type, item_count);
       if (item_no === 0) {
           errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
       }
   }
   else {

       let bUpdate = await itemClass.updateItemInfo(account_info.account_no, item_no, item_count);
       if (bUpdate === false) {
           errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
       }
   }


    item_info = await itemClass.getItemInfo(account_info.account_no, item_no);
   if(item_info === null || item_info === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let result = pscHandler.successJson({
       item_info: item_info,
       additem_count: item_count
   });
     
   await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 덱 삭제
//
router.post('/deckRemove', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let params = pscHandler.verifyParams(req, ['item_id', 'item_type', 'item_count', 'item_no']);
   let item_no = params['item_no'];
   let item_id = params['item_id'];
   let item_type = params['item_type'];
   let item_count = params['item_count'];

   if(item_id === null || item_id === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
   }

   if(item_type === null || item_type === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
   }

   item_count = useful.toNum(item_count);
   if (useful.decimal(item_count).lessThanOrEqualTo(0)) {
       errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
   }

   let item_info = null;
   if(item_no === null || item_no === undefined || item_no === 0){

       item_info = await itemClass.getItemIDInfo(account_info.account_no, item_id);
       if(false == (item_info === null || item_info === undefined)){
           item_no = item_info.item_no;
       }        
   }

   if(item_info === null || item_info === undefined){

       item_no = await itemClass.addItemInfo(account_info.account_no, item_id, item_type, item_count);
       if (item_no === 0) {
           errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
       }
   }
   else {

       let bUpdate = await itemClass.updateItemInfo(account_info.account_no, item_no, item_count);
       if (bUpdate === false) {
           errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
       }
   }


    item_info = await itemClass.getItemInfo(account_info.account_no, item_no);
   if(item_info === null || item_info === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   let result = pscHandler.successJson({
       item_info: item_info,
       additem_count: item_count
   });
     
   await res.json(result);
}));


module.exports = router;
