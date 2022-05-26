import { RedisClient } from "../redis-connection";

async function getCache(req, res, next) {
  try {
    if (req.method != "GET") {
      next();
      return;
    }

    const key = req.url;
    const responseHasBeenCached = await RedisClient.json.get(key);
    if (!responseHasBeenCached) {
      next();
      return;
    }

    res.send(responseHasBeenCached);
    next(false);
  } catch (error) {
    console.error(error);
    next();
  }
}

export { getCache };
