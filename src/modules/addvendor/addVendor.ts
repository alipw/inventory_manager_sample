import { handle } from "./addVendor.handle";
import { addVendorPayloadType, validate } from "./addVendor.validate";

async function addVendor(req, res, next) {
  const payload: addVendorPayloadType = req.body;

  try {
    await validate(payload);
    res.send(await handle(payload));
  } catch (error) {
    next(error);
  }
}

export { addVendor };
