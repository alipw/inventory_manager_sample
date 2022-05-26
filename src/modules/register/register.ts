import { usernameValidator } from "../../helpers/validator";
import { handle } from "./register.handle";
import { validate, registerPayloadType } from "./register.validate";

async function register(req: any, res: any, next: Function) {
  const payload = req.body;

  try {
    await validate(payload);
    res.send(await handle(payload));
  } catch (error) {
    next(error);
  }
}

export { register };
