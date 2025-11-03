const express = require('express');
const router = express.Router();

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const itemClass = require('../class/itemClass');



///////////////////////////////////////////////////////////////////////////
//
// 아이템 리스트
//
router.post('/itemList', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let item_list = await itemClass.getItemList(account_info.account_no);

   let result = pscHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 아이템 사용
//
router.post('/itemUse', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let item_list = await itemClass.getItemList(account_info.account_no);

   let result = pscHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 아이템 획득
//
router.post('/itemAdd', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = pscHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 아이템 삭제
//
router.post('/itemRemove', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = pscHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));



module.exports = router;
