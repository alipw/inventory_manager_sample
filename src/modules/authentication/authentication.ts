import { level_types } from "../../helpers/commons";
import { validate } from "./authentication.validate";

class authHandler {
  allowed_levels: level_types[]

  constructor(allowed_levels: level_types[]) {
    this.allowed_levels = allowed_levels;
  }

  handle = async(req: any, _res: any, next: Function) => {
    try {
      await validate(req, this.allowed_levels);
    } catch (error) {
      next(error);
    }

    next();
  };
}

export { authHandler };
