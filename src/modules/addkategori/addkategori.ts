import { handle } from "../addkategori/addkategori.handle";
import { addKategoriPayloadType, validate } from "./addkategori.validate";

async function addKategori(req, res, next) {
  const payload: addKategoriPayloadType = req.body;

  try {
    await validate(payload);
    res.send(await handle(payload));
  } catch (error) {
    next(error);
  }
}

export { addKategori };
