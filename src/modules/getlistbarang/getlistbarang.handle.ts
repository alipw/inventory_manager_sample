import { FindManyOptions, Like, NamingStrategyNotFoundError } from "typeorm";
import { Barang } from "../../entity/Barang";
import { successWrapper } from "../../helpers/wrapper";
import { getlistBarangQueryType } from "./getlistbarang.validate";

function filterKategoriBarang(
  query: getlistBarangQueryType,
  searchResult: Barang[]
): Barang[] {
  let filterResult = [];
  for (const barang of searchResult) {
    for (const kategori of barang.kategori) {
      if (kategori.nama.toUpperCase() === query.kategori.toUpperCase())
        filterResult.push(barang);
    }
  }
  return filterResult;
}

function filterVendorBarang(
  query: getlistBarangQueryType,
  searchResult: Barang[]
): Barang[] {
  let filterResult = [];
  for (const barang of searchResult) {
    if (barang.vendor.nama.toUpperCase() === query.vendor.toUpperCase())
      filterResult.push(barang);
  }
  return filterResult;
}

async function handle(query: getlistBarangQueryType) {
  if (!query.nama) query.nama = "%";

  const barangRepo = Barang.getRepository();
  let searchResult = await barangRepo.find({
    relations: ["kategori", "vendor"],
    where: {
      nama: Like(`%${query.nama}%`),
    },
  });

  if (query.kategori) searchResult = filterKategoriBarang(query, searchResult);
  if (query.vendor) searchResult = filterVendorBarang(query, searchResult);

  return successWrapper({ result: searchResult });
}

export { handle };
