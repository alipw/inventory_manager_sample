import { handle } from "./addbarang.handle";
import { validate } from "./addbarang.validate";

async function addBarang(req, res, next) {
  const payload = req.body;
  
  try{
    await validate(payload);
    res.send(await handle(payload));
  }catch(error){
    next(error);
  }
}

export { addBarang };
