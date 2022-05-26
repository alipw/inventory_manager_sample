import { RedisClient } from "../redis-connection";

async function createCache(req, res) {
  try {
    const response = res._body;
    // do not cache if it's not a GET request or
    // it's anything other than successful request
    if (req.method != "GET" || response.code != "ok") return;

    // do not set cache if it already exists
    if (await RedisClient.json.get(req.url)) return;

    await RedisClient.json.set(req.url, ".", response);
  } catch (error) {
    console.error(error);
  }
}

export { createCache };
