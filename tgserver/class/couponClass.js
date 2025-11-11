const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 쿠폰 클래스
//
class couponClass extends baseClass {


   ///////////////////////////////////////////////////////////////
   //
   // 쿠폰 정보 리스트 가져오기
   // @param account_no 계정 기본 아이디
   // @returns {Promise<*[]|*>} 쿠폰 정보 리스트
   // 
   async getCouponList(account_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let couponList = [];
         let select = `coupon_no, coupon_id, coupon_title, coupon_detail, coupon_type, coupon_rewarditem, coupon_rewardcount, coupon_rewardlevel, coupon_use, start_date, end_date, create_date`;
         const query = `SELECT ${select} FROM tbl_couponInfo WHERE account_no='${account_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  for (let coupon_info of result) {
                     couponList.push({
                        coupon_no: coupon_info.coupon_no,
                        coupon_id: coupon_info.coupon_id,
                        coupon_title: coupon_info.coupon_title,
                        coupon_detail: coupon_info.coupon_detail,
                        coupon_type: coupon_info.coupon_type,
                        coupon_rewarditem: coupon_info.coupon_rewarditem,
                        coupon_rewardcount: coupon_info.coupon_rewardcount,
                        coupon_rewardlevel: coupon_info.coupon_rewardlevel,
                        coupon_use: coupon_info.coupon_use,
                        start_date: coupon_info.start_date,
                        end_date: coupon_info.end_date,
                        create_date: coupon_info.create_date,
                     });
                  }
               }
            })
            .catch((err) => {
               throw err;
            });
         return couponList;
      } catch (err) {
         throw err;
      }
   }



   ///////////////////////////////////////////////////////////////
   //
   // 쿠폰 정보 가져오기
   // @param account_no 계정 기본 아이디
   // @param coupon_no 쿠폰 아이디
   // @returns {Promise<*[]|*>} 쿠폰 정보
   // 
   async getCouponInfo(account_no, coupon_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let couponInfo = null;
         let select = `coupon_no, coupon_id, coupon_title, coupon_detail, coupon_type, coupon_rewarditem, coupon_rewardcount, coupon_rewardlevel, coupon_use, start_date, end_date, create_date`;
         const query = `SELECT ${select} FROM tbl_coupon WHERE account_no='${account_no}' and coupon_no='${coupon_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  result = result[0];
                  couponInfo = {
                     coupon_no: result.coupon_no,
                     coupon_id: result.coupon_id,
                     coupon_title: result.coupon_title,
                     coupon_detail: result.coupon_detail,
                     coupon_type: result.coupon_type,
                     coupon_rewarditem: result.coupon_rewarditem,
                     coupon_rewardcount: result.coupon_rewardcount,
                     coupon_rewardlevel: result.coupon_rewardlevel,
                     coupon_use: coupon_info.coupon_use,
                     start_date: coupon_info.start_date,
                     end_date: coupon_info.end_date,
                     create_date: result.create_date,
                  };
               }
            })
            .catch((err) => {
               throw err;
            });
         return couponInfo;
      } catch (err) {
         throw err;
      }
   }


   ///////////////////////////////////////////////////////////////
   //
   // 쿠폰 정보 갱신
   // @param account_no 계정 기본 아이디
   // @param coupon_no 쿠폰 아이디
   // @returns {Promise<*[]|*>} 쿠폰 정보
   // 
   async consumeCouponInfo(account_no, coupon_no, coupon_count) {
      try {
          this.includeHandler(['mysqlHandler']);

          let bUpdate = false;
          let set = `coupon_use = 1, coupon_count = "${coupon_count}"`;
          const query = `UPDATE tbl_coupon SET ${set} WHERE account_no='${account_no}' and coupon_no='${coupon_no}'`;

          await this.mysqlHandlerClass
          .query(CONSTANT.DB.GAME, query)
          .then(async (result) => {
              if (result.affectedRows > 0) {
                  bUpdate = true;
              }
          })
          .catch((err) => {
              throw err;
          });
          return bUpdate;
      } catch (err) {
          throw err;
      }
  }

   ///////////////////////////////////////////////////////////////
   //
   // 쿠폰 정보 갱신
   // @param account_no 계정 기본 아이디
   // @param coupon_no 쿠폰 아이디
   // @returns {Promise<*[]|*>} 쿠폰 정보
   // 
   async removeCouponInfo(account_no, coupon_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let bDelete = false;
         let query = `DELETE FROM tbl_coupon WHERE account_no='${account_no}' and coupon_no='${coupon_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then(async (result) => {
               if (result.affectedRows > 0) {
                  bDelete = true;
               }
            })
            .catch((err) => {
               throw err;
            });
         return bDelete;
      } catch (err) {
         throw err;
      }
   }
}

module.exports = new couponClass();