import Joi from "joi";
import { payloadValidator } from "../../helpers/validator";

type addVendorPayloadType = {
  nama: string;
};

const addVendorPayloadSchema = Joi.object({
  nama: Joi.string().required(),
}).required();

async function validate(payload: addVendorPayloadType) {
  await payloadValidator(addVendorPayloadSchema, payload);
}

export { validate, addVendorPayloadType };
