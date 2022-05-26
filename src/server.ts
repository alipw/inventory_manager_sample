import { config } from "dotenv";
config();

import restify from "restify";
import { InternalError, InternalServerError } from "restify-errors";
import { AppDataSource } from "./data-source";
import { level_types } from "./helpers/commons";
import { queryconverter } from "./helpers/queryconverter";
import { clearCache } from "./middlewares/clearCacheRedis";
import { createCache } from "./middlewares/createCacheRedis";
import { getCache } from "./middlewares/getCacheRedis";
import { addBarang } from "./modules/addbarang/addbarang";
import { addKategori } from "./modules/addkategori/addkategori";
import { addVendor } from "./modules/addvendor/addvendor";
import { authHandler } from "./modules/authentication/authentication";
import { getDetailbarang } from "./modules/getdetailbarang/getdetailbarang";
import { getlistbarang } from "./modules/getlistbarang/getlistbarang";
import { login } from "./modules/login/login";
import { register } from "./modules/register/register";
import { updateStokBarang } from "./modules/updatestokbarang/updatestokbarang";
import { initredis } from "./redis-connection";

async function main() {
  const server = restify.createServer({
    name: "inventory-management-system-api",
    formatters: {
      "application/json": function (req, res, body): string {
        createCache(req, res);
        if (
          body instanceof InternalError ||
          body instanceof InternalServerError
        ) {
          const response = {
            code: "Internal",
            message:
              "Sorry for the inconvenience, something bad happened. Try again later.",
          };
          console.error(body);
          return JSON.stringify(response);
        } else {
          return JSON.stringify(body);
        }
      },
    },
  });

  server.pre(clearCache);
  server.pre(getCache);

  // ------------------------------------------------------------------
  // PluginsAdd
  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());
  server.pre(restify.pre.sanitizePath());

  server.use(queryconverter);

  // ------------------------------------------------------------------
  // DB Initialization
  // ------------------------------------------------------------------
  await AppDataSource.initialize();
  // server is still going to work even without redis
  initredis();

  // ------------------------------------------------------------------
  // Auth Declaration
  // ------------------------------------------------------------------
  const only_manager = new authHandler([level_types.LEVEL_MANAGER]).handle;
  const all_registered_user = new authHandler([
    level_types.LEVEL_MANAGER,
    level_types.LEVEL_VIEWONLY,
  ]).handle;

  // ------------------------------------------------------------------
  // Routes
  // ------------------------------------------------------------------

  // Login - All Users
  server.post("/api/v1/login", login);

  // Register - Only inventory manager
  server.post("/api/v1/register", only_manager, register);

  // Barang
  server.get("/api/v1/barang", all_registered_user, getlistbarang);
  server.put("/api/v1/barang", only_manager, updateStokBarang);

  server.get("/api/v1/barang/detail", all_registered_user, getDetailbarang);

  // Kategori
  server.post("/api/v1/kategori", only_manager, addKategori);

  // Vendor
  server.post("/api/v1/vendor", only_manager, addVendor);

  // Barang
  server.post("/api/v1/barang", only_manager, addBarang);

  server.listen(process.env.HTTP_PORT, () => {
    console.log(
      `${server.name} is listening on port: ${process.env.HTTP_PORT}`
    );
  });
}

main();
