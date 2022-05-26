import { handle } from "./addBarang.handle";
import { validate } from "./addBarang.validate";

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
