import User from '../models/user.model'
import { NextFunction } from "express";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";



type LoginServiceType = {
    userInfo: string;
    password: string;
    next: NextFunction
  }
  
  /**
   * Login with username/email and password
   * @param {string} userInfo
   * @param {string} password
   * @returns {Promise<User>}
   */

  const loginUserService= async ({userInfo, password, next}: LoginServiceType) => {
    const user = await User.findOne({
      $or: [{username: userInfo}, {email: userInfo}]
    }).select('+password')
  

    if (!user || !(await user.isPasswordMatch(password))) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.UNAUTHORIZED,
          APP_ERROR_MESSAGE.invalidCredentialsExtended
        )
      );
    }

    return user;
  };