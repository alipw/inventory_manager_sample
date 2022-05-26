import { handle } from "./getlistbarang.handle";
import { validate } from "./getlistbarang.validate";

async function getlistbarang(req, res, next) {
  const query = req.query;
  try {
    await validate(query);
    const handleResult = await handle(query);
    res.send(handleResult);
  } catch (error) {
    next(error);
  }
}

export { getlistbarang };
