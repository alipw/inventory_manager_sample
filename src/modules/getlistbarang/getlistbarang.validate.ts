import Joi from "joi";
import { payloadValidator } from "../../helpers/validator";

type getlistBarangQueryType = {
  kategori?: string;
  vendor?: string;
  nama?: string;
};

const getlistBarangQuerySchema = Joi.object({
  kategori: Joi.string().optional().allow(""),
  vendor: Joi.string().optional().allow(""),
  nama: Joi.string().optional().allow(""),
})
  .optional()
  .options({ allowUnknown: true });

async function validate(query: getlistBarangQueryType) {
  await payloadValidator(getlistBarangQuerySchema, query);
}

export { validate, getlistBarangQueryType };
