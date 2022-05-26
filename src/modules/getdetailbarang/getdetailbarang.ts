import { handle } from "./getdetailbarang.handle";
import { validate } from "./getdetailbarang.validate";

async function getDetailbarang(req, res, next) {
  try {
    const query = req.query;
    await validate(query);
    res.send(await handle(query));
  } catch (error) {
    next(error);
  }
}

export { getDetailbarang };
