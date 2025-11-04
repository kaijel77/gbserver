const CONSTANT = module.exports = {};


CONSTANT.DB = {
   GAME: 'game',
   STATIC: 'static',
   LOG: 'log'
}

CONSTANT.LOG = {
   LOGIN: 'login'
};

CONSTANT.CRYPT_IV_SIZE = 16;    // 암호화 IV 생성시 크기
CONSTANT.CRYPT_KEY = '7e510acb6ee42e08ee5a13a3e5906c7b';

/**
 * 게임내에 자주 사용될 상수값을 정리할 CONFIG 파일
 * 구분을 위해 사용시 특별한 경우가 아닌 경우에는 대문자로 사용할 것을 권장.
 */
CONSTANT.REDIS_KEY = { // REDIS 고유키
    AUTH_TOKEN: 'authToken:',
    TOWN_TOKEN: 'town:token:',
    HUNTING_MONSTER: 'monster:hunting:', // user_id:monster_pk hSet,
    SCOUT_MONSTER: 'monster:scout:', // user_id:monster_pk hSet,
    DUNGEON_MONSTER: 'monster:dungeon:', // user_id:monster_pk hSet
    HUNTING_MONSTER_LIST: 'monster_list:hunting:', // user_id:monster_pk hSet,
    SCOUT_MONSTER_LIST: 'monster_list:scout:', // user_id:monster_pk hSet,
    DUNGEON_MONSTER_LIST: 'monster_list:dungeon:', // user_id:monster_pk hSet
    HUNTING_MONSTER_TIME: 'monster_time:hunting:',
    SCOUT_MONSTER_TIME: 'monster_time:scout:',
    DUNGEON_MONSTER_TIME: 'monster_time:dungeon:',
    CACHE_BATTLE: 'cache:battle:',
    SERVER_CONNECT: 'server_connect',
    ADMIN_CONNECTEVENT: 'admin:connectevent',
    ADMIN_DAILYEVENT: 'admin:dailyevent',
    bossRaid_DAMAGE : 'bossRaid_DAMAGE',
    bossRaid_TotalDAMAGE : 'bossRaid_TotalDAMAGE',
    GUILD_CHAT : 'guild_chat',
    GUILDBOSSRAID_GUILD : 'bossRaid_Guild',
    GUILDBOSSRAID_GUILDMEMBER : 'bossRaid_GuildMember',
};

CONSTANT.DEFAULT = {
    VALUE: -1,
    ZERO: 0,
    ONE: 1,
    SUCCESS: 100,
    FAIL: 101
};

CONSTANT.USER_ACCOUNT = {
    MAX_LEVEL: 100
};

CONSTANT.MAIL = {
    STATE_NEW: 1, // 상태: 신규
    STATE_HOLDING: 2, // 상태: 보유중
    STATE_PAYMENT_COMPLETED: 3// 상태: 지급완료
};

CONSTANT.RANKER = {
    MAX_RANKER_USER_COUNT: 150
};


CONSTANT.GUILD = {
    GRADE: { // 등급
        MASTER: 5,      // 마스터
        VICE: 4,        // 부길마
        ELDER: 3,       // 장로
        MEMBER: 2,      // 정회원
        GUEST: 1        // 준회원
    },
    GRADE_TYPE: { 
        5: 'guild_master',     // 마스터
        4: 'guild_vice',       // 부길마
        3: 'guild_elder',      // 장로
        2: 'guild_member',     // 정회원
        1: 'guild_guest',      // 준회원
    },
    AUTH: { // 권한
        MEMBER_SIGN: 'member_sign',             // 가입승인
        MEMBER_PROMOTION: 'member_promotion',   // 멤버 승격 권한
        NOTICE: 'notice',                       // 공지 작성 권한
        RAID: 'raid',                           // 길드보스 참여 권한
        SHOP: 'shop',                           // 길드 상점 이용 권한
        CHAT: 'chat',                           // 채팅 사용 권한
        SKILL: 'skill',                         // 스킬 관리 권한
        VOTE: 'vote',                           // 투표 권한
        DISTRIBUTION_RATE: 'distribution_rate', // 분배율 결정 권한
    },
    REQUEST_TYPE: { // 요청 타입
        JOIN: 'join', // 가입요청
    },
    INFO_TYPE: { // 변경 가능한 길드정보 (key값)
        // NAME: 'guild_name',  // 변경 불가
        PROMOTE: 'promote',
        NOTICE: 'notice',
        AUTO_JOIN: 'auto_join',
        SYMBOL: 'guild_symbol',
    },
    TOTAL_CHAT: 1000,
    CHAT_TYPE: {
        USER: 'user', 
        SYSTEM: 'system'
    }
}

module.exports = CONSTANT;