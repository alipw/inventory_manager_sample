import * as redis from "redis";
import { InternalError } from "restify-errors";

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
