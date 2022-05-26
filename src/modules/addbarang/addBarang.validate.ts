import Joi from "joi";
import {
  payloadValidator,
} from "../../helpers/validator";

type addBarangPayloadType = {
  nama: string;
  stok: number;
  kategori: string[];
  vendor: string;
};

const addBarangPayloadSchema = Joi.object({
  nama: Joi.string().required(),
  stok: Joi.number().required().min(0),
  kategori: Joi.array().min(1).required(),
  vendor: Joi.array().min(1).required(),
}).required();

async function validate(payload: addBarangPayloadType) {
  await payloadValidator(addBarangPayloadSchema, payload);
}

export { validate, addBarangPayloadType };
