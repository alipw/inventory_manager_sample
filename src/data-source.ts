import { DataSource } from "typeorm";
import { Barang } from "./entity/Barang";
import { Kategori } from "./entity/Kategori";
import { User } from "./entity/User";
import { Vendor } from "./entity/Vendor";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT as unknown as number,
  username: process.env.TYPEORM_USERNAME, 
  password: process.env.TYPEORM_PASSWORD,
  logging: process.env.TYPEORM_LOGGING as unknown as boolean,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE as unknown as boolean,
  entities: [Barang, Kategori, User, Vendor],
  migrations: [],
  subscribers: [],
});

export { AppDataSource };
