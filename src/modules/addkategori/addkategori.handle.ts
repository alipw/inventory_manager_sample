import { v4 } from "uuid";
import { Kategori } from "../../entity/Kategori";
import { successWrapper } from "../../helpers/wrapper";
import { addKategoriPayloadType } from "./addkategori.validate";

async function handle(payload: addKategoriPayloadType) {
  const kategori = new Kategori();

  kategori.id = v4();
  kategori.nama = payload.nama;

  const result = await kategori.save();
  return successWrapper({result});
}

export { handle };
