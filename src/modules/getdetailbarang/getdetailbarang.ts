import { Barang } from "../../entity/Barang";
import { successWrapper } from "../../helpers/wrapper";
import { queryGetDetailBarangType } from "./getdetailbarang.validate";

async function handle(query: queryGetDetailBarangType) {
  const barangRepo = Barang.getRepository();
  const searchResult = await barangRepo.findOne({
    where: {
      id: query.id,
    },
  });

  return successWrapper({ result: searchResult });
}

export { handle };
