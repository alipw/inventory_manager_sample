import { handle } from "./getdetailbarang";
import { validate } from "./getdetailbarang.validate";

async function getDetailbarang(req, res, next) {
  const query = req.query;

  try {
    await validate(query);
    res.send(await handle(query));
  } catch (error) {
    next(error);
  }
}

export { getDetailbarang };
