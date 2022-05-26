import {
  passwordValidator,
  payloadValidator,
  usernameValidator,
} from "../../helpers/validator";
import Joi from "joi";
import { level_types } from "../../helpers/commons";

type loginPayloadType = {
  username: string;
  password: string;
  tipe: level_types;
};

const payloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  tipe: Joi.valid(level_types.LEVEL_MANAGER, level_types.LEVEL_VIEWONLY).required(),
}).required();

async function validate(payload: loginPayloadType) {
  await payloadValidator(payloadSchema, payload);
  const user = await usernameValidator(payload.username, payload.tipe);
  await passwordValidator(payload.password, user.password);
}

export { validate, loginPayloadType };
