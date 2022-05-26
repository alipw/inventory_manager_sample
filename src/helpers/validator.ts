import bcrypt from "bcrypt";
import Joi from "joi";
import { BadRequestError, UnauthorizedError } from "restify-errors";
import { Kategori } from "../entity/Kategori";
import { User } from "../entity/User";
import { Vendor } from "../entity/Vendor";
import { level_types } from "./commons";

/**
 * @returns - Will do nothing if fine, will throw an BadRequestError if payload is not valid
 */
async function payloadValidator(schema: Joi.ObjectSchema, payload: any) {
  try {
    await schema.validateAsync(payload);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}

/**
 * @returns - Will do nothing if fine, will throw an UnauthorizedError if password is not valid
 */
async function passwordValidator(password: string, hash: string) {
  const correct = await bcrypt.compare(password, hash);
  if (!correct) {
    throw new UnauthorizedError("wrong password or username");
  }
}

/**
 * @returns - Will do nothing if fine, will throw an UnauthorizedError if username is not found
 */
async function usernameValidator(username: string, tipe: level_types) {
  const userRepository = User.getRepository();

  const searchResult = await userRepository.findOne({
    where: { username: username, tipe: tipe },
  });
  if (searchResult === null) {
    throw new UnauthorizedError("wrong password or username");
  }
  return searchResult;
}

async function vendorValidator(nama: string) {
  const vendor = Vendor.getRepository();

  const searchResult = await vendor.findOne({ where: { nama: nama } });
  if(searchResult === null){
    throw new BadRequestError(`vendor ${nama} not found`);
  }
  return searchResult;
}

async function kategoriValidator(nama: string) {
  const kategori = Kategori.getRepository();

  const searchResult = await kategori.findOne({ where: { nama: nama } });
  if(searchResult === null){
    throw new BadRequestError(`kategori ${nama} not found`);
  }
  return searchResult;
}

export { payloadValidator, passwordValidator, usernameValidator, vendorValidator, kategoriValidator };
