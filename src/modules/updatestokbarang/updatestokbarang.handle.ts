import { ObjectID } from "typeorm";
import { Barang } from "../../entity/Barang";
import { successWrapper } from "../../helpers/wrapper";
import { updateStokBarangPayloadType } from "./updatestokbarang.validate";

async function handle(payload: updateStokBarangPayloadType) {
  const barangRepo = Barang.getRepository();
  const updateResult = await barangRepo.update(payload.id, {
    stok: payload.stok,
  });

  return successWrapper({ result: updateResult });
}

export { handle };
