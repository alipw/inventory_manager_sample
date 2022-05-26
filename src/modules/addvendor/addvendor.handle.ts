import { v4 } from "uuid";
import { Vendor } from "../../entity/Vendor";
import { successWrapper } from "../../helpers/wrapper";
import { addVendorPayloadType } from "./addvendor.validate";

async function handle(payload: addVendorPayloadType) {
  const vendor = new Vendor();

  vendor.id = v4();
  vendor.nama = payload.nama;

  const result = await vendor.save();
  return successWrapper({result});
}

export { handle };
