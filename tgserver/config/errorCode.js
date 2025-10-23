const ERR_CODE = {
   // 전역오류(9000)
   VERIFY_PARAMS_9000: 9000, // 선언되지 않은 파라미터가 있습니다.
   VERIFY_PARAMS_9001: 9001, // 정의되지 않은 파라미터가 존재합니다.
   VERIFY_PARAMS_9002: 9002, // 선언이 잘못된 파라미터가 있습니다.
   VERIFY_PARAMS_9003: 9003, // 잘못된 요청입니다.
   VERIFY_PARAMS_9004: 9004, // 비정상적인 요청입니다.
   VERIFY_PARAMS_9005: 9005, // 사용하지 않음

   // 로그인
   USER_LOGIN_1000: 1000, // 캐릭터 정보를 찾을 수 없습니다.
   USER_LOGIN_1001: 1001, // 유저 프리셋 정보를 찾을 수 없습니다.
   USER_LOGIN_1002: 1002, // 유저 아이템 정보를 찾을 수 없습니다.
   USER_LOGIN_1003: 1003, // 출석부 데이터를 찾을 수 없습니다.
   USER_LOGIN_1003: 1004, // 서버 점검시간입니다.
   USER_LOGIN_1005: 1005, // 로그인 유저 정보를 확인할 수 없습니다.
   USER_LOGIN_1006: 1006, // 계정생성에 실패했습니다.
   USER_LOGIN_1007: 1007, // 로그인을 할 수 없습니다.
   USER_LOGIN_1008: 1008, // 서버 버전 정보 오류 재접속 합니다.
   USER_LOGIN_1009: 1009, // 시스템 에러가 발생하여 접속할 수 없습니다.
   USER_LOGIN_1010: 1010, // CDN Patch를 위해 재접속 합니다.
   USER_LOGIN_1011: 1011, // Application Update로 재접속 합니다.
   USER_LOGIN_1012: 1012, // 중복 접속으로 서버 접속 종료 됩니다.
};
module.exports = ERR_CODE;
