const express = require('express');
const router = express.Router();

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const itemClass = require('../class/itemClass');
const couponClass = require('../class/couponClass');



///////////////////////////////////////////////////////////////////////////
//
// 쿠폰 리스트
//
router.post('/couponList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let coupon_list = await couponClass.getCouponList(account_info.account_no);

    let result = pscHandler.successJson({
        coupon_list: coupon_list,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 쿠폰 확인
//
router.post('/couponInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['coupon_no']);
    let coupon_no = params['coupon_no'];
    if(coupon_no === null || coupon_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let coupon_info = await couponClass.getCouponInfo(account_info.account_no, coupon_no);

    let result = pscHandler.successJson({
        coupon_info: coupon_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 쿠폰사용
//
router.post('/couponConsume', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['coupon_no', 'coupon_count']);
    let coupon_no = params['coupon_no'];
    let coupon_count = params['coupon_count'];
    if(coupon_no === null || coupon_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
    }

    coupon_count = useful.toNum(coupon_count);
    if (useful.decimal(coupon_count).lessThanOrEqualTo(0)) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let coupon_info = await couponClass.getCouponInfo(account_info.account_no, coupon_no);
    if(coupon_info === null || coupon_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    if (useful.decimal(coupon_info.coupon_use).greateThan(0)) {
      errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
    }

    let startTime = useful.getDataTime(coupon_info.start_date, 1);
    let endTime = useful.getDataTime(coupon_info.end_date, 2);
    if(( startTime > now_date ) || ( endTime < now_date )) {
      errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
    }

    let bUpdate = await couponClass.consumeCouponInfo(account_info.account_no, coupon_no, coupon_count);
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    let result = pscHandler.successJson({
        coupon_info: coupon_info,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 쿠폰사용
//
router.post('/couponRegister', pscHandler.asyncWrap(async function (req, res) {

   let account_info = req.account_info;

   let params = pscHandler.verifyParams(req, ['coupon_no', 'coupon_count']);
   let coupon_no = params['coupon_no'];
   let coupon_count = params['coupon_count'];
   if(coupon_no === null || coupon_no === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 아이템 번호가 없을경우.
   }

   coupon_count = useful.toNum(coupon_count);
   if (useful.decimal(coupon_count).lessThanOrEqualTo(0)) {
       errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
   }

   let coupon_info = await couponClass.getCouponInfo(account_info.account_no, coupon_no);
   if(coupon_info === null || coupon_info === undefined){
       // 닉네임이 있어서 실패 
       errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
   }

   if (useful.decimal(coupon_info.coupon_use).greateThan(0)) {
     errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
   }

   let startTime = useful.getDataTime(coupon_info.start_date, 1);
   let endTime = useful.getDataTime(coupon_info.end_date, 2);
   if(( startTime > now_date ) || ( endTime < now_date )) {
     errorHandler.throwError(5001, 9000136); // 현재 소지 아이템이 부족한 경우
   }

   let bUpdate = await couponClass.consumeCouponInfo(account_info.account_no, coupon_no, coupon_count);
   if (bUpdate === false) {
       errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
   }

   let result = pscHandler.successJson({
       coupon_info: coupon_info,
   });
  
   await res.json(result);
}));



module.exports = router;
