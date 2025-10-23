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

module.exports = CONSTANT;