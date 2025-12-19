const express = require('express');
const router = express.Router();
const useful = require('../utils/useful');

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const continentStageClass = require('../class/continentStageClass');
const deckClass = require('../class/deckClass');



///////////////////////////////////////////////////////////////////////////
//
//  스테이지 리스트
//
router.post('/continentStageList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let stage_list = await continentStageClass.getStageList(account_info.account_no);

    let result = pscHandler.successJson({
      stage_list: stage_list,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 정보보기
//
router.post('/continentStageInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['stage_id']);
    let stage_id = params['stage_id'];
    if(stage_id === null || stage_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_id);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 시작
//
router.post('/continentStageStart', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['stage_id', 'deck_type']);
    let stage_id = params['stage_id'];
    let deck_type = params['deck_type'];
    if(stage_id === null || stage_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let deck_info = await deckClass.getDeckInfo(account_info.account_no, deck_type);
    if(deck_info === null || deck_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 테이블 정보를 받아서 처리한다.

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_id);
    if(stage_info === null || stage_info === undefined){
        // 대륙스테이지 정보 없을경우 생성처리 한다.
        stageInfo = {
            stage_id: stage_id,
            continent_id: 1,
            stage_type: 1,
            current_stage_id: stage_id,
            create_date: useful.getNowTime(),
         };
    }

    // 이곳에서 레디스를 이용해서 대륙스테이지 전투 정보가 있는지 체크한다.
    // 없으면 전투시작 한다. 있으면 실패처리 한다.
/*
            // 토큰 발행 전 이전 토큰 삭제
            let old_token = await this.redisHandlerClass.get(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id);
            if (old_token) {
                await this.redisHandlerClass.del(CONSTANT.REDIS_KEY.TOWN_TOKEN + old_token);
            }

            // 신규 토큰 발행
            let payload = this.generatePayload(account_info);
            let token = jwt.sign(payload, config.jwtSecretKey);

            let timestamp = Date.now();

            // Db 처리가 모두 성공 했다면 마지막에 Redis 기록.
            await this.redisHandlerClass.set(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id, token, 'EX', 86400 * 7); // 토큰을 Redis 저장. 세션 겸용 이므로 유효 시간 필수.
            await this.redisHandlerClass.set(CONSTANT.REDIS_KEY.TOWN_TOKEN + token,
                JSON.stringify({ // 소켓 서버 연결을 위한 세션 등록
                    user_id: account_info.user_id,
                    alliance_pk: timestamp,
                }), 'EX', 86400 * 7);


*/    

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 종료
//
router.post('/continentStageEnd', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['stage_id', 'deck_type']);
    let stage_id = params['stage_id'];
    let deck_type = params['deck_type'];
    if(stage_id === null || stage_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_id);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 여기서 결과 처리
    let bUpdate = await continentStageClass.updateStageInfo(account_info.account_no, stage_id, stage_info.stage_id, stage_info.continent_id, stage_info.stage_currentid)
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_id);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 이곳에서 레디스를 이용해서 대륙스테이지 전투 정보가 있는지 체크한다.
    // 없으면 전투시작 한다. 있으면 실패처리 한다.
/*
            // 토큰 발행 전 이전 토큰 삭제
            let old_token = await this.redisHandlerClass.get(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id);
            if (old_token) {
                await this.redisHandlerClass.del(CONSTANT.REDIS_KEY.TOWN_TOKEN + old_token);
            }

            // 신규 토큰 발행
            let payload = this.generatePayload(account_info);
            let token = jwt.sign(payload, config.jwtSecretKey);

            let timestamp = Date.now();

            // Db 처리가 모두 성공 했다면 마지막에 Redis 기록.
            await this.redisHandlerClass.set(CONSTANT.REDIS_KEY.AUTH_TOKEN + account_info.user_id, token, 'EX', 86400 * 7); // 토큰을 Redis 저장. 세션 겸용 이므로 유효 시간 필수.
            await this.redisHandlerClass.set(CONSTANT.REDIS_KEY.TOWN_TOKEN + token,
                JSON.stringify({ // 소켓 서버 연결을 위한 세션 등록
                    user_id: account_info.user_id,
                    alliance_pk: timestamp,
                }), 'EX', 86400 * 7);


*/

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 종료
//
router.post('/continentStageReward', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['continent_id', 'stage_id']);
    let continent_id = params['continent_id'];
    let stage_id = params['stage_id'];
    if(stage_id === null || stage_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_id);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 여기서 결과 처리
    let bUpdate = await continentStageClass.updateStageInfo(account_info.account_no, stage_id, stage_info.stage_id, stage_info.continent_id, stage_info.stage_currentid)
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    stage_info = await continentStageClass.getStageInfo(account_info.account_no, stage_id);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 스테이지 종료
//
router.post('/continentReward', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['continent_id', 'deck_type']);
    let continent_id = params['continent_id'];
    let deck_type = params['deck_type'];
    if(continent_id === null || continent_id === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let contiment_info =await continentStageClass.getContimentInfo(account_info.account_no, continent_id);
    if(contiment_info === null || contiment_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 여기서 결과 처리
    let bUpdate = await continentStageClass.updateStageInfo(account_info.account_no, continent_id, contiment_info.stage_id, contiment_info.continent_id, contiment_info.stage_currentid)
    if (bUpdate === false) {
        errorHandler.throwError(5001, 9000136); // 아이템 사용 갯수를 잘못 입력한경우
    }

    stage_info = await continentStageClass.getStageInfo(account_info.account_no, continent_id);
    if(stage_info === null || stage_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
      stage_info: stage_info,
    });
   
    await res.json(result);
}));


module.exports = router;
