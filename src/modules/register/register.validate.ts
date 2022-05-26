import Joi from "joi";
import { ConflictError } from "restify-errors";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { level_types } from "../../helpers/commons";
import { payloadValidator, usernameValidator } from "../../helpers/validator";

type registerPayloadType = {
  username: string;
  password: string;
  password_confirmation: string;
  tipe: level_types;
};

const registerPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
  password_confirmation: Joi.string().equal(Joi.ref("password")).required(),
  tipe: Joi.valid(
    level_types.LEVEL_MANAGER,
    level_types.LEVEL_VIEWONLY
  ).required(),
});

async function checkDuplicateUsername(username: string) {
  const userRepository = AppDataSource.getRepository(User);
  const searchResult = await userRepository.find({
    where: {
      username: username,
    },
  });

  if (searchResult.length > 0) {
    throw new ConflictError(
      `username ${username} already exists, please choose another username.`
    );
  }
}

async function validate(payload: registerPayloadType) {
  await payloadValidator(registerPayloadSchema, payload);
  await checkDuplicateUsername(payload.username);
}

export { validate, registerPayloadType };
