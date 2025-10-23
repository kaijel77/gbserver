// cluster-example.js
const cluster = require('cluster');
const os = require('os');

// 둘 중 존재하는 걸 사용
const isMaster = cluster.isPrimary ?? cluster.isMaster;

const numCPUs = os.cpus().length;

if (isMaster) {

   console.log(`🚀 Master ${process.pid} is running`);
   console.log(`🧠 Spawning ${numCPUs} workers...\n`);

   // CPU 개수만큼 워커 생성
   for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
   }

   // 워커 종료 감지 및 재시작
   cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
   });
   
} else {
   // 각 워커가 서버 구동
   require('./worker');
}