const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 공지 클래스
//
class noticeClass extends baseClass {


   ///////////////////////////////////////////////////////////////
   //
   // 공지 정보 리스트 가져오기
   // @param account_no 계정 기본 아이디
   // @returns {Promise<*[]|*>} 공지 정보 리스트
   // 
   async getNoticeList(account_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let noticeList = [];
         let select = `notice_no, notice_id, notice_title, notice_detail, notice_type, start_date, end_date, notice_term, create_date`;
         const query = `SELECT ${select} FROM tbl_noticeInfo WHERE account_no='${account_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  for (let notice_info of result) {
                     noticeList.push({
                        notice_no: notice_info.notice_no,
                        notice_id: notice_info.notice_id,
                        notice_title: notice_info.notice_title,
                        notice_detail: notice_info.notice_detail,
                        notice_type: notice_info.notice_type,
                        start_date: notice_info.start_date,
                        end_date: notice_info.end_date,
                        notice_term: notice_info.notice_term,
                        create_date: notice_info.create_date,
                     });
                  }
               }
            })
            .catch((err) => {
               throw err;
            });
         return noticeList;
      } catch (err) {
         throw err;
      }
   }



   ///////////////////////////////////////////////////////////////
   //
   // 공지 정보 가져오기
   // @param account_no 계정 기본 아이디
   // @param notice_no 공지 아이디
   // @returns {Promise<*[]|*>} 공지 정보
   // 
   async getNoticeInfo(account_no, notice_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let noticeInfo = null;
         let select = `notice_no, notice_id, notice_title, notice_detail, notice_type, start_date, end_date, notice_term, create_date`;
         const query = `SELECT ${select} FROM tbl_notice WHERE account_no='${account_no}' and notice_no='${notice_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  result = result[0];
                  noticeInfo = {
                     notice_no: result.notice_no,
                     notice_id: result.notice_id,
                     notice_title: result.notice_title,
                     notice_detail: result.notice_detail,
                     notice_type: result.notice_type,
                     start_date: notice_info.start_date,
                     end_date: notice_info.end_date,
                     notice_term: notice_info.notice_term,
                     create_date: result.create_date,
                  };
               }
            })
            .catch((err) => {
               throw err;
            });
         return noticeInfo;
      } catch (err) {
         throw err;
      }
   }

   

   ///////////////////////////////////////////////////////////////
   //
   // 공지 정보 갱신
   // @param account_no 계정 기본 아이디
   // @param notice_no 공지 아이디
   // @returns {Promise<*[]|*>} 공지 정보
   // 
   async removeNoticeInfo(account_no, notice_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let bDelete = false;
         let query = `DELETE FROM tbl_notice WHERE account_no='${account_no}' and notice_no='${notice_no}'`;

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

module.exports = new noticeClass();