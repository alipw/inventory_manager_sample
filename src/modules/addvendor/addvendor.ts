import { handle } from "./addvendor.handle";
import { addVendorPayloadType, validate } from "./addvendor.validate";

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
