import { handle } from "./addvendor.handle";
import { addVendorPayloadType, validate } from "./addvendor.validate";

async function addVendor(req, res, next) {
  try {
    const payload: addVendorPayloadType = req.body;
    await validate(payload);
    res.send(await handle(payload));
  } catch (error) {
    next(error);
  }
}

export { addVendor };
