import { UserType } from "../types/user.type";
import User from '../models/user.model'
import { NextFunction } from "express";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";



/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const create_User_Service = async (userBody: UserType, next: NextFunction) => {
  if (await User.isEmailTaken(userBody.email)) {
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_ERROR_MESSAGE.invalidUsername
      )
    );
  }
  return User.create(userBody);
};





  
  