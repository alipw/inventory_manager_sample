import { RedisClient } from "../redis-connection";

async function clearCache(req, _res, next) {
  try {
    if (req.method == "GET") {
      next();
      return;
    }

    await RedisClient.FLUSHDB();
    next();
  } catch (error) {
    console.error(error);
    next();
  }
}

export { clearCache };
