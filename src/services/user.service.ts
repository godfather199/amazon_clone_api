import { UserType } from "../types/user.type";
import User from '../models/user.model'
import { NextFunction } from "express";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";


type NewUserPayload = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};


export const create_User_Service = async (
  userBody: NewUserPayload,
  next: NextFunction
) => {
  try {
    const check_Username  = await User.isUsernameTaken(userBody.username)
    if (check_Username ) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.invalidUsername
        )
      );
    }

    const check_Email = await User.isEmailTaken(userBody.email)
    if (check_Email) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.emailUnavailable
        )
      );
    }

    return await User.create(userBody);
  } catch (error) {
    next(error);
  }
};





  
  