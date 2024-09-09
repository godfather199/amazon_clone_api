import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants/constant';
import {JWT_SECRET} from '../config/config'
import { create_User_Service } from '../services/user.service';
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { loginUserService } from '../services/auth.service';
import { UserType } from '../types/user.type';



export const register_User = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const new_User = await create_User_Service(req.body, next)

    if(!new_User) {
      return
    }

    const { password, ...userWithoutPassword } = new_User.toObject();

    res.status(HTTP_RESPONSE_CODE.CREATED).json({
      msg: "User registered successfully",
      userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};



export const login_User = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const logged_In_User = await loginUserService(email, password, next);

    if(!logged_In_User) {
      return
    }

    const token = jwt.sign(
      {
        id: logged_In_User?._id,
      },
      JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    const { password: userPassword, ...userWithoutPassword } =
      logged_In_User.toObject();

    res
      .status(HTTP_RESPONSE_CODE.SUCCESS)
      .cookie("access_token_amazon", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      })
      .json({
        msg: APP_ERROR_MESSAGE.loginSuccess,
        userInfo: userWithoutPassword
      });
  } catch (error) {
    next(error);
  }
};



export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res
  .cookie("access_token_amazon", "", {
    httpOnly: true,
  })
  .json({
    msg: "Logout successfull"
  });
};


