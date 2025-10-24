process.env.DOTENV_DISABLE_LOG = 'true';
require('dotenv').config({
    path: ['.env.local', '.env'],
    debug: false,
});
let app = require('../app');
let debug = require('debug')('temp:server');
let http = require('http');
const CONSTANT = require('../config/constant');
const mysqlHandler = require('../Handler/mysqlHandler');
const logHandler = require('../Handler/logHandler');

let port = normalizePort(process.env.PORT || 7700);
app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {

    let log = new logHandler(null);
    log.createLogTable();
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

/*

// ========================
// 🧠 Graceful Shutdown
// ========================
const gracefulShutdown = async (signal) => {
    console.log(`\n🛑 [${process.pid}] Received ${signal}. Saving data...`);

    try {
        await saveCacheToDB(mysqlHandler);

//OHTG_ING        await pool.end();
        console.log(`✅ [${process.pid}] DB connection closed.`);

        server.close(() => {
            console.log(`💤 [${process.pid}] HTTP server closed.`);
            process.exit(0);
        });
    } catch (err) {
        console.error(`❌ [${process.pid}] Error during shutdown:`, err);
        process.exit(1);
    }
};

async function saveCacheToDB(mysqlHandler) {
    console.log(`💾 [${process.pid}] Saving temporary data...`);

    // 예시: 서버 메모리 데이터 저장
    let pool = mysqlHandler.getPool(CONSTANT.DB.LOG);
    const connection = await pool.getConnection();
    try {
        //OHTG_ING
        await connection.query(
            "INSERT INTO server_logs (worker_id, message, created_at) VALUES (?, ?, NOW())",
            [process.pid, "Graceful shutdown data saved"]
        );
        //
        console.log(`✅ [${process.pid}] Data saved successfully.`);
    } finally {
        connection.release();
    }
}

// 종료 신호 감지
['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => gracefulShutdown(signal));
});
process.on('uncaughtException', (err) => {
    console.error(`💥 [${process.pid}] Uncaught Exception:`, err);
    gracefulShutdown('uncaughtException');
});
*/
process.on('uncaughtException', (err) => {
    console.error(`💥 [${process.pid}] Uncaught Exception:`, err);
    console.error(err.stack);
  // 서버 종료하지 않고 계속 실행
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection:', reason);
});

console.log(`Worker ${process.pid} started`);
