const CONSTANT = require('../config/constant');
const express = require('express');
const router = express.Router();

const pscHandler = require('../Handler/pscHandler');
const errorHandler = require('../Handler/errorHandler');

const guildClass = require('../class/guildClass');



///////////////////////////////////////////////////////////////////////////
//
// 길드 정보
//
router.post('/guildList', pscHandler.asyncWrap(async function (req, res) {

    let guild_List = await guildClass.getGuildList();

    let result = pscHandler.successJson({
        guild_List: guild_List,
    });
   
    await res.json(result);
}));

///////////////////////////////////////////////////////////////////////////
//
// 길드 임의의 정보보내주기
//
router.post('/guildSearch', pscHandler.asyncWrap(async function (req, res) {

    let guild_List = await guildClass.searchGuildList();

    let result = pscHandler.successJson({
        guild_List: guild_List,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 길드 정보
//
router.post('/guildInfo', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_info = await guildClass.getGuildInfo(guild_no);
    if(guild_info !== null || guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
    
    let result = pscHandler.successJson({
        guild_info: guild_info,
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드멤버 정보
//
router.post('/guildMemberList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_List = await guildClass.getGuildMemberList(account_info.account_no, guild_no);
    if(guildmember_List !== null || guildmember_List !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        guildmember_list: guildmember_List,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 길드멤버 정보
//
router.post('/guildRequestList', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildrequest_List = await guildClass.getGuildRequestList(guild_no);
    if(guildrequest_List !== null || guildrequest_List !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        guildrequest_list: guildrequest_List,
    });
   
    await res.json(result);
}));



///////////////////////////////////////////////////////////////////////////
//
// 길드이름 사용 가능 체크
//
router.post('/guildCheckName', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_name']);
    let guild_name = params['guild_name'];
    if(guild_name === null || guild_name === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let check_guild_info = await guildClass.getGuildNameInfo(guild_name);
    if(check_guild_info !== null || check_guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}))


///////////////////////////////////////////////////////////////////////////
//
// 길드 창설
//
router.post('/guildCreate', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_name']);
    let guild_name = params['guild_name'];
    if(guild_name === null || guild_name === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let check_guild_info = await guildClass.getGuildNameInfo(guild_name);
    if(check_guild_info !== null || check_guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_info = await guildClass.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info !== null || guildmember_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_no = await guildClass.createGuildInfo(guild_name, account_info.account_no, account_info.nick_name);
    if(guild_no === 0){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}))


///////////////////////////////////////////////////////////////////////////
//
// 길드 해체
//
router.post('/guildBeakUp', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let check_guild_info = await guildClass.getGuildInfo(guild_no);
    if(check_guild_info !== null || check_guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_info = await guildClass.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info !== null || guildmember_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    //  길드장이 아니면 해체 불가
    if(useful.decimal(guildmember_info.guild_grade).lessThan(CONSTANT.GUILD.GRADE.MASTER)){
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }
    
    let guildmember_List = await guildClass.getGuildMemberList(guild_no);
    if(guildmember_List !== null || guildmember_List !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 길드 멤버가 있어서 해체가 불가능하다.
    if(useful.decimal(guildmember_List.length).greaterThan(0)){
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }

    await guildClass.removeGuildInfo(guild_no);
    await guildClass.removeGuildMeberList(guild_no);

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}))


///////////////////////////////////////////////////////////////////////////
//
// 길드이름 변경
//
router.post('/guildChangeName', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no', 'guild_name']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
    let guild_name = params['guild_name'];
    if(guild_name === null || guild_name === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let check_guild_info = await guildClass.getGuildNameInfo(guild_name);
    if(check_guild_info !== null || check_guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_info = await guildClass.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info !== null || guildmember_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    //  길드장이 아니면 이름 변경 불가
    if(useful.decimal(guildmember_info.guild_grade).lessThan(CONSTANT.GUILD.GRADE.MASTER)){
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }
    
    let bUpdate = await guildClass.updateGuildName(guild_no, guild_name);
    if(bUpdate !== null || bUpdate !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}))




///////////////////////////////////////////////////////////////////////////
//
// 길드 가입 요청
//
router.post('/guildRequest', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_info = await guildClass.getGuildInfo(guild_no);
    if(guild_info !== null || guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
    
    let guildmember_info = await guildClass.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info !== null || guildmember_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildrequest_info = await guildClass.getGuildRequestInfo(guild_no, account_info.account_no);
    if(guildrequest_info !== null || guildrequest_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let binsert = await guildClass.insertGuildRequestInfo(guild_no, account_info.account_no, '');
    if(binsert === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드 가입 요청 수락
//
router.post('/guildRequestAccept', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_info = await guildClass.getGuildInfo(guild_no);
    if(guild_info !== null || guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
    
    let guildmember_info = await guildClass.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info !== null || guildmember_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildrequest_info = await guildClass.getGuildRequestInfo(guild_no, account_info.account_no);
    if(guildrequest_info === null || guildrequest_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bCrete = await guildClass.addGuildMember_info(guild_no, account_info.account_no);
    if(bCrete === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bdelete = await guildClass.removeGuildRequestInfo(guild_no, account_info.account_no);
    if(bdelete === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    guildmember_info = await guildClass.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info === null || guildmember_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        guildmember_info : guildmember_info,
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드 가입 요청 취소
//
router.post('/guildRequestCancel', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_info = await guildClass.getGuildInfo(guild_no);
    if(guild_info !== null || guild_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }
    
    let guildmember_info = await guildClass.getGuildMemberList(guild_no, account_info.account_no);
    if(guildmember_info !== null || guildmember_info !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildrequest_info = await guildClass.getGuildRequestInfo(guild_no, account_info.account_no);
    if(guildrequest_info === null || guildrequest_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let bdelete = await guildClass.removeGuildRequestInfo(guild_no, account_info.account_no);
    if(bdelete === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });

    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드 탈퇴
//
router.post('/guildWithdrawal', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no']);
    let guild_no = params['guild_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_ifo = await guildClas.getGuildInfo(guild_no);
    if(guild_ifo !== null || guild_ifo !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_info = await guildClas.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info === null || guildmember_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

     //  길드장, 부길드장, 장로는 탈퇴불가
    if(useful.decimal(guildmember_info.guild_grade).greaterThanOrEqualTo(CONSTANT.GUILD.GRADE.ELDER)){
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }
    
    let bdelete = await guildClass.removeGuildMeberInfo(guild_no, account_info.account_no);
    if(bdelete === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드 강제 추방
//
router.post('/guildKickOut', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no', 'kickouter_no']);
    let guild_no = params['guild_no'];
    let kickouter_no = params['kickouter_no'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_ifo = await guildClas.getGuildInfo(guild_no);
    if(guild_ifo !== null || guild_ifo !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_info = await guildClas.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info === null || guildmember_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

     // 장로이하는 강제추방 불가
    if(useful.decimal(guildmember_info.guild_grade).lessThanOrEqualTo(CONSTANT.GUILD.GRADE.ELDER)) {
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }
    
    let kickouter_info = await guildClas.getGuildMemberInfo(guild_no, kickouter_no);
    if(kickouter_info === null || kickouter_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

     // 장로이하는 강제추방 불가
    if(useful.decimal(kickouter_info.guild_grade).greaterThanOrEqualTo(CONSTANT.GUILD.GRADE.VICE)) {
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }

    let bdelete = await guildClass.removeGuildMeberInfo(guild_no, kickouter_no);
    if(bdelete === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });
   
    await res.json(result);
}));


///////////////////////////////////////////////////////////////////////////
//
// 길드멤버 권한 변경
//
router.post('/guildChangeUserGrade', pscHandler.asyncWrap(async function (req, res) {

    let account_info = req.account_info;

    let params = pscHandler.verifyParams(req, ['guild_no', 'member_no', 'change_grade']);
    let guild_no = params['guild_no'];
    let member_no = params['member_no'];
    let change_grade = params['change_grade'];
    if(guild_no === null || guild_no === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guild_ifo = await guildClas.getGuildInfo(guild_no);
    if(guild_ifo !== null || guild_ifo !== undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let guildmember_info = await guildClas.getGuildMemberInfo(guild_no, account_info.account_no);
    if(guildmember_info === null || guildmember_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 장로이하는 강제추방 불가
    if(useful.decimal(guildmember_info.guild_grade).lessThanOrEqualTo(CONSTANT.GUILD.GRADE.ELDER)) {
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }
    
    // 장로이하는 강제추방 불가
    if(useful.decimal(change_grade).greaterThanOrEqualTo(guildmember_info.guild_grade)) {
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }

    let member_info = await guildClas.getGuildMemberInfo(guild_no, member_no);
    if(member_info === null || member_info === undefined){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    // 장로이하는 강제추방 불가
    if(useful.decimal(member_info.guild_grade).greaterThanOrEqualTo(CONSTANT.GUILD.GRADE.VICE)) {
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }

    // 변경항 등급이 같으면 실패
    if(useful.decimal(member_info.guild_grade).equals(change_grade)) {
        errorHandler.throwError(5545, 9026013); // 길드장은 탈퇴할 수 없습니다.
    }

    let bUpdate = await guildClass.updateGuildMeberInfo(guild_no, member_no);
    if(bUpdate === false){
        // 닉네임이 있어서 실패 
        errorHandler.throwError(1099, 9000006); // 계정생성이 실패하였습니다.
    }

    let result = pscHandler.successJson({
        result : 'ok',
    });
   
    await res.json(result);
}));


module.exports = router;
