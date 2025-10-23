const ERR_CODE = {
    // 전역오류(9000)
    // 파라미터
    VERIFY_PARAMS_9000: 9000, // 선언되지 않은 파라미터가 있습니다.
    VERIFY_PARAMS_9001: 9001, // 정의되지 않은 파라미터가 존재합니다.
    VERIFY_PARAMS_9002: 9002, // 선언이 잘못된 파라미터가 있습니다.
    VERIFY_PARAMS_9003: 9003, // 잘못된 요청입니다.
    VERIFY_PARAMS_9004: 9004, // 비정상적인 요청입니다.
    VERIFY_PARAMS_9005: 9005, // 사용하지 않음

    // 유저(1000)
    CLIENT_SESSION_1400: 1400, // 유저 정보를 확인할 수 없습니다.
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
    // 내정보
    USER_PROFILE_1100: 1100, // 유저 정보를 확인할 수 없습니다.
    USER_PROFILE_1101: 1101, // 랭킹 데이터를 찾을 수 없습니다.
    USER_PROFILE_1102: 1102, // 랭킹 티어 정보를 찾을 수 없습니다.
    USER_PROFILE_1103: 1103, // 유저 정보를 찾을 수 없습니다. 
    // 닉네임변겅
    NICKNAME_CHANGE_1200: 1200, // 유저 정보를 확인할 수 없습니다.
    NICKNAME_CHANGE_1201: 1201, // 변경할 닉네임을 기재해 주세요.
    NICKNAME_CHANGE_1202: 1202, // 닉네임 변경 후 24시간 이후 변경이 가능합니다.
    NICKNAME_CHANGE_1203: 1203, // 입력한 문장에 금칙어가 있습니다.
    NICKNAME_CHANGE_1204: 1204, // 영문 및 숫자만 사용 가능합니다.
    NICKNAME_CHANGE_1205: 1205, // 12자 이내만 가능합니다.
    NICKNAME_CHANGE_1206: 1206, // 닉네임이 중복됩니다.

    //닉네임 생성
    NICKNAME_CREATE_1220: 1220, // 유저 정보를 확인할 수 없습니다.
    NICKNAME_CREATE_1221: 1221, // 파라미터 검증에 실패했습니다.
    NICKNAME_CREATE_1222: 1222, // 데이터베이스에서 유저 정보를 가져오는데 실패했습니다.
    NICKNAME_CREATE_1223: 1223, // 이미 존재하는 닉네임입니다.
    NICKNAME_CREATE_1224: 1224, // 닉네임 업데이트에 실패했습니다.


    // 로그아웃
    USER_LOGOUT_1300: 1300, // 유저 정보를 확인할 수 없습니다.
    // 유저정보
    USER_REFRESH_1400: 1400, // 유저 정보를 확인할 수 없습니다.
    // 랭킹
    // 랭킹 정보
    RANKING_USER_LIST_1700: 1700, // 유저 정보를 확인할 수 없습니다.
    RANKING_USER_LIST_1701: 1701, // 랭킹 데이터를 찾을 수 없습니다.
    RANKING_USER_LIST_1702: 1702, // 랭킹 티어 정보를 찾을 수 없습니다.
    RANKING_USER_LIST_1703: 1703, // 시즌정보를 찾을 수 없습니다.
    // 랭킹 보상
    // 방생성
    CREATE_ROOM_1720: 1720, // 유저 정보를 확인할 수 없습니다.
    CREATE_ROOM_1721: 1721, // 이미 방이 존재 합니다.
    // 방종료
    EXPIRED_ROOM_1730: 1730, // 유저 정보를 확인할 수 없습니다.
    EXPIRED_ROOM_1731: 1731, // 방이 존재 하지 않습니다.
    EXPIRED_ROOM_1732: 1732, // 이미 종료된 방입니다.
    // 게임시작
    GAME_START_1740: 1740, // 유저 정보를 확인할 수 없습니다.
    GAME_START_1741: 1741, // 방이 존재 하지 않습니다.
    GAME_START_1742: 1742, // 이미 종료되거나 게임 시작된 방입니다.

    // 캐릭터&동료(2000)
    // 캐릭터 레벨업
    CHRACTER_LEVELUP_2000: 2000, // 유저 정보를 확인할 수 없습니다.
    CHRACTER_LEVELUP_2001: 2001, // 캐릭터 정보를 찾을 수 없습니다.
    CHRACTER_LEVELUP_2002: 2002, // 아이템이 존재하지 않습니다.
    CHRACTER_LEVELUP_2003: 2003, // 레벨업 데이터를 찾을 수 없습니다.
    CHRACTER_LEVELUP_2004: 2004, // 더 이상 레벨업을 할 수 없습니다.
    CHRACTER_LEVELUP_2005: 2005, // 캐릭터 레벨업에 필요한 재료가 부족합니다.
    CHRACTER_LEVELUP_2006: 2006, // 캐릭터 레벨업에 실패하였습니다.
    // 캐릭터 강화
    CHRACTER_UPGRADE_2010: 2010, // 유저 정보를 확인할 수 없습니다.
    CHRACTER_UPGRADE_2011: 2011, // 캐릭터 정보를 찾을 수 없습니다.
    CHRACTER_UPGRADE_2012: 2012, // 강화 데이터를 찾을 수 없습니다.
    CHRACTER_UPGRADE_2013: 2013, // 더 이상 강화를 할 수 없습니다.
    CHRACTER_UPGRADE_2014: 2014, // 강화를 할 수 없는 캐릭터입니다.
    CHRACTER_UPGRADE_2015: 2015, // 재료로 사용될 캐릭터를 찾을 수 없습니다.
    CHRACTER_UPGRADE_2016: 2016, // 같은 종류의 캐릭터만 강화할 수 있습니다.
    CHRACTER_UPGRADE_2017: 2017, // 강화할 수 없는 레벨입니다.
    CHRACTER_UPGRADE_2018: 2018, // 잠금상태의 캐릭터입니다.
    // 캐릭터 목록
    CHRACTER_LIST_2020: 2020, // 유저 정보를 확인할 수 없습니다.
    CHRACTER_LIST_2021: 2021, // 캐릭터 정보를 찾을 수 없습니다.
    // 동료 레벨업
    PARTNER_LEVELUP_2030: 2030, // 유저 정보를 확인할 수 없습니다.
    PARTNER_LEVELUP_2031: 2031, // 동료 정보를 찾을 수 없습니다.
    PARTNER_LEVELUP_2032: 2032, // 아이템이 존재하지 않습니다.
    PARTNER_LEVELUP_2033: 2033, // 레벨업 데이터를 찾을 수 없습니다.
    PARTNER_LEVELUP_2034: 2034, // 레벨업 할 수 없는 동료입니다.
    PARTNER_LEVELUP_2035: 2035, // 동료 레벨업에 필요한 재료가 부족합니다.
    // 동료 강화
    PARTNER_UPGRADE_2040: 2040, // 유저 정보를 확인할 수 없습니다.
    PARTNER_UPGRADE_2041: 2041, // 동료 정보를 찾을 수 없습니다.
    PARTNER_UPGRADE_2042: 2042, // 동료 강화에 실패하였습니다.
    PARTNER_UPGRADE_2043: 2043, // 더 이상 강화를 할 수 없습니다.
    PARTNER_UPGRADE_2044: 2044, // 재료로 사용될 동료를 찾을 수 없습니다.
    PARTNER_UPGRADE_2045: 2045, // 동료 강화에 필요한 재료가 부족합니다.
    PARTNER_UPGRADE_2046: 2046, // 같은 종류의 동료만 강화할 수 있습니다.
    PARTNER_UPGRADE_2047: 2047, // 같은 등급의 동료만 강화할 수 있습니다.
    PARTNER_UPGRADE_2048: 2048, // 잠겨있는 동료입니다.
    PARTNER_UPGRADE_2049: 2049, // 강화할 수 없는 레벨입니다.
    PARTNER_UPGRADE_2049: 2049, // 강화할 수 없는 레벨입니다.
    // 동료 목록
    PARTNER_REFRESH_2050: 2050, // 유저 정보를 확인할 수 없습니다.
    PARTNER_REFRESH_2051: 2051, // 동료 정보를 찾을 수 없습니다.
    // 장착
    PRESET_EQUIP_2060: 2060, // 유저 정보를 확인할 수 없습니다.
    // 동료 스킬변경
    PARTNER_SKILL_CHANGE_2070: 2070, // 유저 정보를 확인할 수 없습니다.
    PARTNER_SKILL_CHANGE_2071: 2071, // 동료 정보를 찾을 수 없습니다.
    PARTNER_SKILL_CHANGE_2072: 2072, // 스킬 변경에 실패했습니다.
    PARTNER_SKILL_CHANGE_2073: 2073, // 아이템이 존재하지 않습니다.
    PARTNER_SKILL_CHANGE_2074: 2074, // 동료 스킬변경에 필요한 재료가 부족합니다.
    // 캐릭터 잠금
    CHRACTER_LOCK_2080: 2080, // 유저 정보를 확인할 수 없습니다.
    CHRACTER_LOCK_2082: 2082, // 잠금처리가 불가능한 캐릭터입니다.
    // 동료 잠금
    PARTNER_LOCK_2090: 2090, // 유저 정보를 확인할 수 없습니다.
    PARTNER_LOCK_2091: 2091, // 동료 정보를 찾을 수 없습니다.
    PARTNER_LOCK_2092: 2092, // 잠금처리가 불가능한 동료 입니다.
    PARTNER_LOCK_2093: 2093, // 잠금처리에 실패하였습니다.
    // 캐릭터 채굴보상
    CHRACTER_MINNING_REWARD_2100: 2100, // 유저 정보를 확인할 수 없습니다.

    // 아이템(3000)
    // 아이템 목록
    ITEM_LIST_3000: 3000, // 유저 정보를 확인할 수 없습니다.
    ITEM_LIST_3001: 3001, // 아이템 정보를 찾을 수 없습니다.
    // 캐릭터 전직 아이템 합성
    ITEM_COMPOSE_CHARACTER_3010: 3010, // 유저 정보를 확인할 수 없습니다.
    ITEM_COMPOSE_CHARACTER_3011: 3011, // 합성할 수 있는 아이템이 아닙니다.
    ITEM_COMPOSE_CHARACTER_3012: 3012, // 보유 토큰 개수가 부족합니다.
    ITEM_COMPOSE_CHARACTER_3013: 3013, // 아이템 합성에 실패 하였습니다.
    // 동료 등급 아이템 합성
    ITEM_COMPOSE_PARTNER_3020: 3020, // 유저 정보를 확인할 수 없습니다.
    ITEM_COMPOSE_PARTNER_3021: 3021, // 합성 토큰 2개 이상, 5개 이하만 가능합니다.
    ITEM_COMPOSE_PARTNER_3022: 3022, // 합성할 수 있는 아이템이 아닙니다.
    ITEM_COMPOSE_PARTNER_3023: 3023, // 보유 토큰 개수가 부족합니다.
    ITEM_COMPOSE_PARTNER_3024: 3024, // 아이템 합성에 실패 하였습니다.

    // 상점(3100)
    // 뽑기 확률
    SHOP_RANDOM_RATE_3110: 3110, // 유저 정보를 확인할 수 없습니다.
    SHOP_RANDOM_RATE_3111: 3111, // 상품 정보를 찾을 수 없습니다.
    // 상점 정보
    SHOP_INFO_3120: 3120, // 유저 정보를 확인할 수 없습니다.
    SHOP_INFO_3121: 3121, // 샵 데이터를 찾을 수 없습니다.
    SHOP_INFO_3122: 3122, // 상점 목록 데이터를 찾을 수 없습니다.
    // 상품 구매
    SHOP_PRODUCT_BUY_3130: 3130, // 유저 정보를 확인할 수 없습니다.
    SHOP_PRODUCT_BUY_3131: 3131, // 아이템이 존재하지 않습니다.
    SHOP_PRODUCT_BUY_3132: 3132, // 재화가 부족합니다.
    SHOP_PRODUCT_BUY_3133: 3133, // 상품 판매 기간이 아닙니다.
    SHOP_PRODUCT_BUY_3134: 3134, // 더 이상 상품을 구매할 수 없습니다.
    SHOP_PRODUCT_BUY_3135: 3135, // 아이템을 구매할 수 없습니다.
    SHOP_PRODUCT_BUY_3136: 3136, // 아이템 지급에 실패했습니다.
    SHOP_PRODUCT_BUY_3137: 3137, // 필요한 재화 정보를 찾을 수 없습니다.

    // nft(4000)
    // nft 등록
    NFT_REGISTER_4000: 4000, // 유저 정보를 확인할 수 없습니다.
    NFT_REGISTER_4001: 4001, // nft 등록에서 유저 지갑 주소가 없습니다.
    NFT_REGISTER_4002: 4002, // nft 등록에서 response가 올바르지 않습니다.
    NFT_REGISTER_4003: 4003, // nft 등록에서 파라미터 타입이 올바르지 않습니다.
    NFT_REGISTER_4004: 4004, // nft 등록에서 파라미터 검증에 실패했습니다.
    NFT_REGISTER_4005: 4005, // nft 등록에서 지갑주소가 데이터베이스에 등록되지 않았습니다.

    // nft 등록해제
    NFT_UNREGISTER_4010: 4010, // nft 등록해제에서 유저 정보를 확인할 수 없습니다.
    NFT_UNREGISTER_4011: 4011, // nft 등록해제에서 유저 지갑 주소가 없습니다.
    NFT_UNREGISTER_4012: 4012, // nft 등록해제에서 파라미터 검증에 실패했습니다.
    NFT_UNREGISTER_4013: 4013, // nft 등록해제에서 파라미터 타입이 올바르지 않습니다.
    NFT_UNREGISTER_4014: 4014, // nft 등록해제에서 response가 올바르지 않습니다.
    NFT_UNREGISTER_4015: 4015, // nft 등록해제에서 지갑주소가 데이터베이스에 업데이트되지 않았습니다.


    //nft character mint(내보내기)
    NFT_CHARACTER_MINT_4020: 4020, // 캐릭터 민팅에서 유저 정보를 확인할 수 없습니다.
    NFT_CHARACTER_MINT_4021: 4021, // 캐릭터 민팅에서 파라미터 검증에 실패했습니다.
    NFT_CHARACTER_MINT_4022: 4022, // 캐릭터 민팅에서 파라미터 타입이 올바르지 않습니다.
    NFT_CHARACTER_MINT_4023: 4023, // 캐릭터 민팅에서 버전 정보가 등록되지 않았습니다.
    NFT_CHARACTER_MINT_4024: 4024, // 캐릭터 민팅에서 유저 객체를 가져올 수 없습니다.
    NFT_CHARACTER_MINT_4025: 4025, // 캐릭터 민팅에서 캐릭터 정보를 가져올 수 없습니다.
    NFT_CHARACTER_MINT_4026: 4026, // 캐릭터 민팅에서 캐릭터 스킬 정보를 가져 올 수 없습니다.
    NFT_CHARACTER_MINT_4027: 4027, // 캐릭터 민팅에서 캐릭터 텍스트 정보를 가져 올 수 없습니다.
    NFT_CHARACTER_MINT_4028: 4028, // 캐릭터 민팅에서 캐릭터 고유 정보를 가져올 수 없습니다.
    NFT_CHARACTER_MINT_4029: 4029, // 캐릭터 민팅에서 Response가 올바르지 않습니다.
    NFT_CHARACTER_MINT_4030: 4030, // 캐릭터 민팅에서 암호화에 실패했습니다.
    NFT_CHARACTER_MINT_4031: 4031, // 캐릭터 민팅에서 캐릭터 정보 업데이트에 실패했습니다.
    NFT_CHARACTER_MINT_4032: 4032, // 캐릭터 민팅에서 nft 데이터 저장에 실패했습니다.

    //nft partner mint(내보내기)
    NFT_FRIEND_MINT_4040:4040, // 파트너 민팅에서 유저 정보를 확인할 수 없습니다.
    NFT_FRIEND_MINT_4041:4041, // 파트너 민팅에서 파트너 파라미터 검증에 실패했습니다.
    NFT_FRIEND_MINT_4042:4042, // 파트너 민팅에서 파트너 파라미터 타입이 올바르지 않습니다.
    NFT_FRIEND_MINT_4043:4043, // 파트너 민팅에서 유저 객체를 가져올 수 없습니다.
    NFT_FRIEND_MINT_4044:4044, // 파트너 민팅에서 버전 정보를 가져올 수 없습니다.
    NFT_FRIEND_MINT_4045:4045, // 파트너 민팅에서 유저의 파트너 정보를 가져올 수 없습니다.
    NFT_FRIEND_MINT_4046:4046, // 파트너 민팅에서 파트너 고유 정보를 가져올 수 없습니다.
    NFT_FRIEND_MINT_4047:4047, // 파트너 민팅에서 파트너 기술 정보를 가져올 수 없습니다.
    NFT_FRIEND_MINT_4048:4048, // 파트너 민팅에서 Response가 올바르지 않습니다.
    NFT_FRIEND_MINT_4049:4049, // 파트너 민팅에서 암호화에 실패했습니다.
    NFT_FRIEND_MINT_4050:4050, // 파트너 민팅에서 nft 데이터 저장에 실패했습니다.
    NFT_FRIEND_MINT_4051:4051, // 파트너 민팅에서 파트너 정보 업데이트에 실패했습니다.

    //nft item mint(내보내기)
    NFT_ITEM_MINT_4060:4060, // 아이템 민팅에서 유저 정보를 확인할 수 없습니다.
    NFT_ITEM_MINT_4061:4061, // 아이템 민팅에서 파라미터 검증에 실패했습니다.
    NFT_ITEM_MINT_4062:4062, // 아이템 민팅에서 유저 객체를 가져올 수 없습니다.
    NFT_ITEM_MINT_4063:4063, // 아이템 민팅에서 버전 정보를 가져올 수 없습니다.
    NFT_ITEM_MINT_4064:4064, // 아이템 민팅에서 유저 아이템 정보를 가져올 수 없습니다.
    NFT_ITEM_MINT_4065:4065, // 아이템 민팅에서 유저 아이템이 부족합니다.
    NFT_ITEM_MINT_4066:4066, // 아이템 민팅에서 고유 아이템 정보를 가져올 수 없습니다.
    NFT_ITEM_MINT_4067:4067, // 아이템 민팅에서 Response가 올바르지 않습니다.
    NFT_ITEM_MINT_4068:4068, // 아이템 민팅에서 암호화에 실패했습니다.
    NFT_ITEM_MINT_4069:4069, // 아이템 민팅에서 nft 데이터 저장에 실패했습니다.
    NFT_ITEM_MINT_4070:4070, // 아이템 민팅에서 아이템 정보 업데이트에 실패했습니다.


    //nft depositList
    NFT_DEPOSIT_LIST_4080:4080, // nft 리스트 호출에서 유저 정보를 확인할 수 없습니다.
    NFT_DEPOSIT_LIST_4081:4081, // nft 리스트 호출에서 리스트 Response가 올바르지 않습니다.
    NFT_DEPOSIT_LIST_4082:4082, // NFT 리스트 호출에서 리스트 정보를 가져올 수 없습니다.
    NFT_DEPOSIT_LIST_4083:4083, // nft 리스트 호출에서 JSON 정보가 일치하지 않습니다.
    NFT_DEPOSIT_LIST_4084:4084, // nft 리스트 호출에서 deposit 함수 결과가 true가 아닙니다.
    NFT_DEPOSIT_LIST_4085:4085, // nft 리스트 호출에서 캐릭터 정보를 찾을 수 없습니다.
    NFT_DEPOSIT_LIST_4086:4086, // nft 리스트 호출에서 캐릭터 메일 아이템 생성에 실패했습니다.
    NFT_DEPOSIT_LIST_4087:4087, // nft 리스트 호출에서 파트너 정보를 찾을 수 없습니다.
    NFT_DEPOSIT_LIST_4088:4088, // nft 리스트 호출에서 파트너 메일 아이템 생성에 실패했습니다.
    NFT_DEPOSIT_LIST_4089:4089, // nft 리스트 호출에서 아이템 메일 아이템 생성에 실패했습니다.

    //nft deposit
    NFT_DEPOSIT_4090:4090, // nft 들여오기에서 id 타입이 맞지 않습니다.
    NFT_DEPOSIT_4091:4091, // nft 들여오기에서 deposit api response가 올바르지 않습니다.
    NFT_DEPOSIT_4092:4092, // nft 들여오기에서 nft 정보를 가져올 수 없습니다.
    NFT_DEPOSIT_4093:4093, // nft 들여오기에서 nft 데이터 업데이트에 실패했습니다.

    // 우편(5000)
    // 우편 정보
    MAIL_INFO_5000: 5000, // 유저 정보를 확인할 수 없습니다.
    MAIL_INFO_5001: 5001, // 메일 정보를 찾을 수 없습니다.
    MAIL_INFO_5002: 5002, // 메일 아이템 정보를 찾을 수 없습니다.
    // 우편 확인
    MAIL_CONFIRM_5010: 5010, // 유저 정보를 확인할 수 없습니다.
    // 우편 확인
    MAIL_REMOVE_5040: 5040, // 유저 정보를 확인할 수 없습니다.
    // 개별 우편 받기
    MAIL_OPEN_5020: 5020, // 유저 정보를 확인할 수 없습니다.
    MAIL_OPEN_5021: 5021, // 이미 메일을 받았습니다.
    MAIL_OPEN_5022: 5022, // 메일의 만료기간이 지났습니다.
    MAIL_OPEN_5023: 5023, // 메일 아이템 정보를 찾을 수 없습니다.
    MAIL_OPEN_5024: 5024, // 메일 아이템이 존재하지 않습니다.
    MAIL_OPEN_5025: 5025, // 잘못된 메일 정보입니다.
    MAIL_OPEN_5026: 5026, // 아이템 받기에 실패하였습니다.
    // 모든 우편받기
    MAIL_LIST_CONFIRM_5030: 5030, // 유저 정보를 확인할 수 없습니다.
    MAIL_LIST_CONFIRM_5031: 5031, // 메일 확인을 할 수 없습니다

    // 실시간 게임(6000)
    // 붉은 다이아 획득(6010)
    USER_GAME_RESULT_6010: 6010, // 유저 정보를 확인할 수 없습니다.
    USER_GAME_RESULT_6011: 6011, // 루아 캐릭터는 획득 불가합니다.
    USER_GAME_RESULT_6012: 6012, // 캐릭터의 하루 획득량을 초과 하였습니다.
    USER_GAME_RESULT_6013: 6013, // 캐릭터 정보를 찾을 수 없습니다.
    USER_GAME_RESULT_6014: 6014, // 유저의 다이아 정보를 찾을 수 없습니다.
    USER_GAME_RESULT_6015: 6015, // 재화 업데이트에 실패 하였습니다.

    // 공지
    NOTICE_REFRESH_7000: 7000, // 유저 정보를 확인할 수 없습니다.

    // 쿠폰
    COUPON_USE_8000: 8000, // 유저 정보를 확인할 수 없습니다.
    COUPON_USE_8001: 8001, // 잘못된 쿠폰 코드입니다.
    COUPON_USE_8002: 8002, // 이미 사용된 쿠폰 입니다.
    COUPON_USE_8003: 8003, // 사용할 수 없는 쿠폰입니다.
    COUPON_USE_8004: 8004, // 사용 가능한 쿠폰 제한 수량을 초과하였습니다.
    COUPON_USE_8005: 8005, // 쿠폰 시스템 내부 오류입니다.
    // 전역오류(9000)
    // 파라미터 검사

    // 서버오류
    SERVER_9100: 9100, // 정의되지 않은 서버 오류

    // ===========기존 Error Code===========
    // login
    ERROR_CODE_LOGIN_20005: 20005, // 로그인을 할 수 없습니다.
    ERROR_CODE_LOGIN_20006: 20006, // 사용하지 않음
    ERROR_CODE_LOGIN_20007: 20007, // 유저 정보를 확인할 수 없습니다.
    ERROR_CODE_LOGIN_20008: 20008, // 사용하지 않음
    ERROR_CODE_LOGIN_20009: 20009, // login에서 version 정보가 저장되지 않았습니다.
    ERROR_CODE_LOGIN_20010: 20010, // login에서 version 정보가 수정되지 않았습니다.

    // User
    ERROR_CODE_USER_10400: 10400, // 계정생성에 실패했습니다.
    ERROR_CODE_USER_10401: 10401, // 유저 정보를 찾을수 없습니다.
    ERROR_CODE_USER_10402: 10402, // 보상 데이터를 찾을수 없습니다.
    ERROR_CODE_USER_10403: 10403, // 스타가 부족합니다.
    ERROR_CODE_USER_10404: 10404, // 아이템 데이터를 찾을 수 없습니다.
    ERROR_CODE_USER_10405: 10405, // 계정 생성에 실패 했습니다.
    ERROR_CODE_USER_10406: 10406, // 캐릭터 정보를 찾을 수 없습니다
    ERROR_CODE_USER_10407: 10407, // 동료 정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10408: 10408, // 시즌정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10409: 10409, // 유저 정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10410: 10410, // 잘못된 요청입니다.
    ERROR_CODE_USER_10411: 10411, // 유저정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10412: 10412, // 유저 랭킹정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10413: 10413, // 변경할 닉네임을 기재해 주세요.
    ERROR_CODE_USER_10414: 10414, // 닉네임 변경 후 24시간 이후 변경이 가능합니다.
    ERROR_CODE_USER_10415: 10415, // 유저정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10416: 10416, // 입력한 문장에 금칙어가 있습니다.
    ERROR_CODE_USER_10417: 10417, // 유저 랭킹정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10418: 10418, // 유저 랭킹 정보를 찾을 수 없습니다.
    ERROR_CODE_USER_10419: 10419, // 한글6자 영문12자 이내로 닉네임을 설정해 주세요.
    ERROR_CODE_USER_10420: 10420, // 영문, 숫자만 입력 가능합니다.
    ERROR_CODE_USER_10720: 10720, // 유저 프리셋 정보를 찾을 수 없습니다.

    // Server
    ERROR_CODE_SERVER_50000: 50000, // 서버 오류

    // Client
    ERROR_CODE_CLIENT_30001: 30001, // TODO DB 등록 30001,	// 잘못된 파라미터 입니다.
    ERROR_CODE_CLIENT_30002: 30002, // TODO DB 등록 30002,	// 잘못된 타입의 Method 입니다.
    ERROR_CODE_CLIENT_30003: 30003, // TODO DB 등록 30003,	// 정의되지 않은 파라미터가 존재합니다.
    ERROR_CODE_CLIENT_30004: 30004, // TODO DB 등록 30004,	// 선언되지 않은 파라미터가 있습니다.
    ERROR_CODE_CLIENT_30005: 30005, // TODO DB 등록 30005,	// 필수 파라미터가 없습니다.
};
module.exports = ERR_CODE;
