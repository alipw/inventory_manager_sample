import { validate } from "./login.validate";
import { handle } from "./login.handle";

async function login(req: any, res: any, next: Function) {
  try {
    const payload = req.body;
    await validate(payload);
    const handleResult = await handle(payload);
    res.send(handleResult);
  } catch (error) {
    return next(error);
  }
}

export { login };
