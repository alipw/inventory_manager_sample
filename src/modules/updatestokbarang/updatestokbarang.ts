import { handle } from "./updatestokbarang.handle";
import { validate } from "./updatestokbarang.validate";

async function updateStokBarang(req, res, next) {
  try {
    const payload = req.body;
    await validate(payload);
    res.send(await handle(payload));
  } catch (error) {
    next(error);
  }
}

export { updateStokBarang };
