let redisClient;

if(process.env.USE_IOREDIS ===  'true') {
   const IORedis = require('ioredis');
   redisClient = new IORedis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
   });
   redisClient.hGetAll = (...args) => redisClient.hgetall(...args);
   console.log('🧩 Using ioredis client');
}
else {
   const { createClient } = require('redis');
   redisClient = createClient({
      socket: {
         host: process.env.REDIS_HOST,
         port: process.env.REDIS_PORT,
      },
      password: process.env.REDIS_PASSWORD,
   });

   redisClient.on('error', (err) => console.error('Redis Error:', err));
   redisClient.connect();
   console.log('🧩 Using redis client');
}

module.exports = redisClient;