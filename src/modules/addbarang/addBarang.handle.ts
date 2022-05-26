import { v4 } from "uuid";
import { Barang } from "../../entity/Barang";
import { Kategori } from "../../entity/Kategori";
import { Vendor } from "../../entity/Vendor";
import { kategoriValidator, vendorValidator } from "../../helpers/validator";
import { successWrapper } from "../../helpers/wrapper";
import { addBarangPayloadType } from "./addBarang.validate";

type processedPayloadType = {
  nama: string;
  stok: number;
  kategori: Kategori[];
  vendor: Vendor;
};

async function handle(payload: addBarangPayloadType) {
  const vendor = await vendorValidator(payload.vendor);

  let kategori: Kategori[] = new Array(payload.kategori.length);
  for (let i = 0; i < payload.kategori.length; i++) {
    kategori[i] = await kategoriValidator(payload.kategori[i]);
  }

  const processedPayload: processedPayloadType = {
    nama: payload.nama,
    stok: payload.stok,
    vendor: vendor,
    kategori: kategori,
  };

  const barang = new Barang();
  barang.id = v4();
  barang.nama = processedPayload.nama;
  barang.stok = processedPayload.stok;
  barang.vendor = processedPayload.vendor;
  barang.kategori = processedPayload.kategori;

  const result = await barang.save();
  return successWrapper({result})
}

export { handle };
