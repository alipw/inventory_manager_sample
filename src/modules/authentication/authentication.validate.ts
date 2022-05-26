import Joi from "joi";
import { verify } from "jsonwebtoken";
import { BadRequestError, ForbiddenError } from "restify-errors";
import { level_types, secret_keys } from "../../helpers/commons";

const authHeaderSchema = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).required(),
}).options({
  allowUnknown: true,
});

async function validate(req: any, allowed_levels: level_types[]) {
  try {
    await authHeaderSchema.validateAsync(req);
  } catch (error) {
    throw new BadRequestError(error.message);
  }

  const authHeader = req.headers.authorization.split(" ");
  if (!authHeader[0] || authHeader[0] != "Bearer" || !authHeader[1])
    throw new BadRequestError("Bearer token not found");

  let authorized = false;
  const token = authHeader[1];

  for (const level of allowed_levels) {
    try {
      // will throw an error if token is not valid
      // and thus will not set authorized to 'true'
      verify(token, secret_keys[level])
      authorized = true;
    } catch (err) {}
  }

  if (!authorized) throw new ForbiddenError("requires elevated privileges");
}

export { validate };
