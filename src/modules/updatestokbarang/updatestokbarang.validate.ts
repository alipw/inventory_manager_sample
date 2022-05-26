import Joi from "joi";
import { idBarangValidator, payloadValidator } from "../../helpers/validator";

type updateStokBarangPayloadType = {
  id: string;
  stok: number;
};

const updateStokBarangPayloadSchema = Joi.object({
  id: Joi.string().required(),
  stok: Joi.number().required(),
}).required();

async function validate(payload: updateStokBarangPayloadType) {
  await payloadValidator(updateStokBarangPayloadSchema, payload);
  await idBarangValidator(payload.id);
}

export { validate };
