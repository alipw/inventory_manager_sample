import Joi from "joi";
import { payloadValidator } from "../../helpers/validator";

type queryGetDetailBarangType = {
  id: string;
};

const queryGetDetailBarangSchema = Joi.object({
  id: Joi.string().required(),
}).required();

async function validate(query: queryGetDetailBarangType) {
  await payloadValidator(queryGetDetailBarangSchema, query);
}

export { validate, queryGetDetailBarangType };
