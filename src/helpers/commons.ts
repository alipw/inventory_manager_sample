enum level_types {
  LEVEL_MANAGER = "inventory_manager",
  LEVEL_VIEWONLY = "view_only",
}

const secret_keys = {
  inventory_manager: process.env.JWT_SECRET_MANAGER,
  view_only: process.env.JWT_SECRET_VIEWONLY
}

export { level_types, secret_keys };
