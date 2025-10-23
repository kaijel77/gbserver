const path = require('path');
const config = module.exports = {};

// game
config.game_server = {
    serverid:1,
    url: 'http://192.168.0.122',
    port: '8880'
};

// game, socket
config.debug_mode = false;
config.live_mode = false;

// game
config.appName = 'Covenant Child Api Server';
config.jwtSecretKey = 'ajfQMu6VnwndhNgHW0w2MuhvMcdHwXPF8xhQcVKZeuqm2Wz8KlCSDERQDtC1HTro';
config.main_timezone = 'UTC'; // 서버 기준시간 (디폴트: 한국)
config.init_mode = false;

config.dir = {
    master_data: path.join(__dirname, '../master_data')
};

// gamebase
config.gameBase = {
    apiUrl: "https://api-gamebase.cloud.toast.com",
    appId: "B5xqKN53",
    appKey: "tyIBWL5UqX5JDSmw",
    secretKey: "moKn3aAj"
};

// NFP Market - 보안 괜찮은가?
config.nft = {
    api_url: 'http://1.234.112.72:6243/',
    cipherKey:'7e510acb6ee42e08ee5a13a3e5906c7b046c8ef4297a4b6ffcbb3d255ec9f150',
    cipherIv:'34b760ceb8f55f1e656c6f22e5f51c5f',

}

// game, socket
config.redis = {
    host: "192.168.0.63",
    port: 16379,
    password: "zbqlrdmlskf",
    db: 0
};



config.mongoDbConfig = {
    atlas:false,
    game: {
        host: "192.168.0.63",
        port: 27227,
        user: "day1",
        password: encodeURIComponent("gkfndpsxj!@#"),
        database: "covenantChild",
        collection: "account",
    },
    log: {
        host: "192.168.0.63",
        port: 27227,
        user: "day1",
        password: encodeURIComponent("gkfndpsxj!@#"),
        database: "log",
        collection: "log_account",
    },
    common: {
        host: "192.168.0.63",
        port: 27227,
        user: "day1",
        password: encodeURIComponent("gkfndpsxj!@#"),
        database: "master_data",
        collection: "table",
    }
}

// socket
config.server = {
    // ms
    pingTimeout: 60 * 1000, // Ping Timeout 1분.
    pingInterval: 5 * 60 * 1000, // 5분마다 Ping! Pong! 체크하여 유저 세션 유지.
};

// tool
config.admin = {
    tools: 'enable',
    socket_url: '192.168.0.63:5500'
}

config.socketIo = {
    serverid: 'socket1',
    host: '192.168.0.63',
    port: 5000,
    sport: 5000,
    ssl:false,
};

config.slack = {
    alert: false,
};

module.exports = config;