const nodeEnv = process.env.NODE_ENV;
let server = 'LOCAL';
if(nodeEnv === 'production') server = 'PROD';
else if(nodeEnv === 'development') server = 'DEV';

let config = {
    debug_mode: true,
    db: {
        host: process.env[`${server}_HOST`],
        port: process.env[`${server}_DB_PORT`],
        username: process.env[`${server}_DB_USER`],
        password: process.env[`${server}_DB_PASS`],
        timezone: '+00:00', // 'UTC'//
        pool: {
            min: 0,
            max: 10,
        },
    },
    redis: {
        name: process.env[`${server}_REDIS_NAME`],
        host: process.env[`${server}_HOST`],
        port: process.env[`${server}_REDIS_PORT`],
        password: process.env[`${server}_REDIS_PASS`],
    },
    aws: {
        access_info: {
            s3_url: process.env[`${server}_AWS_S3_URL`],
            access_key_id: process.env[`${server}_AWS_KEY_ID`],
            secret_access_key: process.env[`${server}_AWS_ACCESS_KEY`],
        },
        bucket: 'notice',
        region: 'ap-southeast-1',
    },
    gameBase: {
        apiUrl: process.env[`${server}_GAMEBASE_API_URL`],
        appId: process.env[`${server}_GAMEBASE_APP_ID`], // 게임베이스 앱ID
        appKey: process.env[`${server}_GAMEBASE_APP_KEY`], // 게임베이스 앱키
        secretKey: process.env[`${server}_GAMEBASE_SECRET_KEY`], // 게임베이스 시크릿키
    },
    ranking_redis: {
        name: process.env[`${server}_RANKING_REDIS_NAME`],
        host: process.env[`${server}_RANKING_REDIS_HOST`],
        port: process.env[`${server}_RANKING_REDIS_PORT`],
        password: process.env[`${server}_RANKING_REDIS_PASS`],
        database: process.env[`${server}_RANKING_REDIS_DATABASE`],  
    },
    jwtSecretKey:'ajfQMu6VnwndhNgHW0w2MuhvMcdHwXPF8xhQcVKZeuqm2Wz8KlCSDERQDtC1HTro',
}

// 사용 Port
config.PORT = process.env.PORT;
config.BATCH_PORT = process.env.BATCH_PORT;

module.exports = config;
