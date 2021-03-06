import { handle } from "../addkategori/addkategori.handle";
import { addKategoriPayloadType, validate } from "./addkategori.validate";

async function addKategori(req, res, next) {
  try {
    const payload: addKategoriPayloadType = req.body;
    await validate(payload);
    res.send(await handle(payload));
  } catch (error) {
    next(error);
  }
}

export { addKategori };
