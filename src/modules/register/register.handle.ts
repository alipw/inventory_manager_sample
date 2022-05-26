import { User } from "../../entity/User";
import { hash } from "bcrypt";
import { registerPayloadType } from "./register.validate";
import { v4 } from "uuid";
import { successWrapper } from "../../helpers/wrapper";

async function handle(payload: registerPayloadType) {
  const user = new User();
  user.username = payload.username;
  user.password = await hash(payload.password, 12);
  user.id = v4();
  user.tipe = payload.tipe;

  const saveResult = await user.save();
  return successWrapper(saveResult);
}

export { handle };
