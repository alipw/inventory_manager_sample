import Joi from "joi";
import { payloadValidator } from "../../helpers/validator";

type addKategoriPayloadType = {
  nama: string;
};

const addKategoriPayloadSchema = Joi.object({
  nama: Joi.string().required(),
}).required();

async function validate(payload: addKategoriPayloadType) {
  await payloadValidator(addKategoriPayloadSchema, payload);
}

export { validate, addKategoriPayloadType };
