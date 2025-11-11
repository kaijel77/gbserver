const baseClass = require("./baseClass");


///////////////////////////////////////////////////////////////////////////
//
// 대륙 스테이지 클래스
//
class continentStageClass  extends baseClass {


   ///////////////////////////////////////////////////////////////
   //
   // 스테이지 정보 리스트 가져오기
   // @param account_no 계정 기본 아이디
   // @returns {Promise<*[]|*>} 스테이지 정보 리스트
   // 
   async getStageList(account_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let stageList = [];
         let select = `stage_no, stage_id, continent_id, stage_type, stage_currentid, create_date`;
         const query = `SELECT ${select} FROM tbl_stageInfo WHERE account_no='${account_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  for (let stage_info of result) {
                     stageList.push({
                        stage_no: stage_info.stage_no,
                        stage_id: stage_info.stage_id,
                        continent_id: stage_info.continent_id,
                        stage_type: stage_info.stage_type,
                        stage_currentid: stage_info.stage_currentid,
                        create_date: stage_info.create_date,
                     });
                  }
               }
            })
            .catch((err) => {
               throw err;
            });
         return stageList;
      } catch (err) {
         throw err;
      }
   }



   ///////////////////////////////////////////////////////////////
   //
   // 스테이지 정보 가져오기
   // @param account_no 계정 기본 아이디
   // @param stage_no 스테이지 아이디
   // @returns {Promise<*[]|*>} 스테이지 정보
   // 
   async getStageInfo(account_no, stage_no) {
      try {
         this.includeHandler(['mysqlHandler']);

         let stageInfo = null;
         let select = `stage_no, stage_id, continent_id, stage_type, stage_currentid, create_date`;
         const query = `SELECT ${select} FROM tbl_stage WHERE account_no='${account_no}' and stage_no='${stage_no}'`;

         await this.mysqlHandlerClass
            .query(CONSTANT.DB.GAME, query)
            .then((result) => {
               if (result.length > 0) {
                  result = result[0];
                  stageInfo = {
                     stage_no: result.stage_no,
                     stage_id: result.stage_id,
                     continent_id: result.continent_id,
                     stage_type: result.stage_type,
                     stage_currentid: result.stage_currentid,
                     create_date: result.create_date,
                  };
               }
            })
            .catch((err) => {
               throw err;
            });
         return stageInfo;
      } catch (err) {
         throw err;
      }
   }


   ///////////////////////////////////////////////////////////////
   //
   // 스테이지 정보 갱신
   // @param account_no 계정 기본 아이디
   // @param stage_no 스테이지 아이디
   // @returns {Promise<*[]|*>} 스테이지 정보
   // 
   async updateStageInfo(account_no, stage_no, stage_id, continent_id, stage_currentid) {
      try {
          this.includeHandler(['mysqlHandler']);

          let bUpdate = false;
          let set = `stage_id = "${stage_id}", continent_id = "${continent_id}", stage_currentid = "${stage_currentid}"`;
          const query = `UPDATE tbl_stage SET ${set} WHERE account_no='${account_no}' and stage_no='${stage_no}'`;

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
}

module.exports = new continentStageClass();