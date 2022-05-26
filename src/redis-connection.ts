import * as redis from "redis";

const RedisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});

async function initredis() {
  RedisClient.on("error", function (error) {
    console.log(error);
  });
  return await RedisClient.connect();
}

export { initredis, RedisClient };
