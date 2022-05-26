import { validate } from "./login.validate";
import { handle } from "./login.handle";

async function login(req: any, res: any, next: Function) {
  const payload = req.body;

  try {
    await validate(payload);
    const handleResult = await handle(payload);
    res.send(handleResult);
  } catch (error) {
    return next(error);
  }
}

export { login };
