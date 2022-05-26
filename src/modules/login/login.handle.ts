import { sign } from "jsonwebtoken";
import { level_types, secret_keys } from "../../helpers/commons";
import { successWrapper } from "../../helpers/wrapper";
import { loginPayloadType } from "./login.validate";

async function handle(payload: loginPayloadType) {
  let secretKey = "";
  switch (payload.tipe) {
    case level_types.LEVEL_MANAGER:
      secretKey = secret_keys.inventory_manager;
      break;
    case level_types.LEVEL_VIEWONLY:
      secretKey = secret_keys.view_only;
      break;
  }
  const token = sign({ tipe: payload.tipe }, secretKey);
  return successWrapper({token});
}

export { handle };
