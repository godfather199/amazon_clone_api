import User from '../models/user.model'
import { NextFunction } from "express";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { UserType } from '../types/user.type';



  export const loginUserService = async (
    email: string,
    password: string,
    next: NextFunction
  ) => {
    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await user.isPasswordMatch(password))) {
        return next(
          new HttpException(
            HTTP_RESPONSE_CODE.UNAUTHORIZED,
            APP_ERROR_MESSAGE.invalidCredentialsExtended
          )
        );
      }

      return user;
    } catch (error) {
      next(error);
    }
  };