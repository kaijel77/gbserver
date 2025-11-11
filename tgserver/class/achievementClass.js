const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 업적 클래스
//
class achievementClass  extends baseClass {


   ///////////////////////////////////////////////////////////////
   //
   // 업적 정보 리스트 가져오기
   // @param account_no 계정 기본 아이디
   // @returns {Promise<*[]|*>} 업적 정보 리스트
   // 
   async getAchievementList(account_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let achievementList = [];
         let select = `achievement_no, achievement_id, achievement_subid, achievement_type, achievement_state, achievement_current, create_date`;
         const query = `SELECT ${select} FROM tbl_achievementInfo WHERE account_no='${account_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  for (let achievement_info of result) {
                     achievementList.push({
                        achievement_no: achievement_info.achievement_no,
                        achievement_id: achievement_info.achievement_id,
                        achievement_subid: achievement_info.achievement_subid,
                        achievement_type: achievement_info.achievement_type,
                        achievement_state: achievement_info.achievement_state,
                        achievement_current: achievement_info.achievement_current,
                        create_date: achievement_info.create_date,
                     });
                  }
               }
            })
            .catch((err) => {
               throw err;
            });
         return achievementList;
      } catch (err) {
         throw err;
      }
   }



   ///////////////////////////////////////////////////////////////
   //
   // 업적 정보 가져오기
   // @param account_no 계정 기본 아이디
   // @returns {Promise<*[]|*>} 업적 정보 리스트
   // 
   async getAchievementInfo(account_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let achievementInfo = null;
         let select = `achievement_no, achievement_id, achievement_subid, achievement_type, achievement_state, achievement_current, create_date`;
         const query = `SELECT ${select} FROM tbl_achievementInfo WHERE account_no='${account_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  result = result[0];
                  achievementInfo = {
                     achievement_no: result.achievement_no,
                     achievement_id: result.achievement_id,
                     achievement_subid: result.achievement_subid,
                     achievement_type: result.achievement_type,
                     achievement_state: result.achievement_state,
                     achievement_current: result.achievement_current,
                     create_date: result.create_date,
                  };
               }
            })
            .catch((err) => {
               throw err;
            });
         return achievementInfo;
      } catch (err) {
         throw err;
      }
   }
   

}

module.exports = new achievementClass();