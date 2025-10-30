const express = require('express');
const router = express.Router();

const tgRouteHandler = require('../Handler/tgRouteHandler');
const errorHandler = require('../Handler/errorHandler');

const itemClass = require('../class/itemClass');



///////////////////////////////////////////////////////////////////////////
//
// 아이템 리스트
//
router.post('/itemList', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let item_list = await itemClass.getItemList(account_info.account_no);

   let result = tgRouteHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 아이템 사용
//
router.post('/itemUse', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let item_list = await itemClass.getItemList(account_info.account_no);

   let result = tgRouteHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 아이템 획득
//
router.post('/itemAdd', tgRouteHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;


   let result = tgRouteHandler.successJson({
      item_list: item_list,
   });
   
   await res.json(result);
}));



module.exports = router;
