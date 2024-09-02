import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants/constant';
import { HttpException } from '../exceptions/exception'
import User from '../models/user.model'
import { UserType } from '../types/user.type';
import { create_User_Service } from '../services/user.service';
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'



export const register_User = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {username } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.invalidUsername
        )
      );
    }

    const new_User = await create_User_Service(req.body, next)


    res.status(HTTP_RESPONSE_CODE.CREATED).json({
      msg: "User registered successfully",
      new_User,
    });
  } catch (error) {
    next(error);
  }
};



// export const login_User = async (req: Request,
//   res: Response,
//   next: NextFunction) => {
//     try {
//       const {userInfo, password} = req.body
     

//       const token = jwt.sign(
//           {
//               id: user._id
//           },
//           process.env.JWT_SECRET,
//           {
//               "expiresIn": '2d' 
//           }
//       )

//       const {password: userPassword, ...info} = user._doc

//       res
//       .status(201)
//       .cookie('access_token_ab', token, {
//           httpOnly: true,
//           expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
//           secure: true,
//           sameSite: 'None'
//       })
//       .json({
//           msg: 'Login successful',
//           info
//       })
//   } catch (error) {
//       next(error)
//   }
//   }


