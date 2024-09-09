import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import {JWT_SECRET} from '../config/config'
import { NextFunction, Request, Response } from "express"
import { HttpException } from '../exceptions/exception';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, JWT_ERROR } from '../constants/constant';


declare global {
  namespace Express {
    interface Request {
      userId: JwtPayload | string | undefined ;
    }
  }
}



export const verify_Token = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token_amazon;

  if (!token) {
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        JWT_ERROR.notAuthenicated
      )
    );
  }

  jwt.verify(
    token,
    JWT_SECRET,
    (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err) {
        return next(
          new HttpException(
            HTTP_RESPONSE_CODE.UNAUTHORIZED,
            JWT_ERROR.notAuthorized
          )
        );
      }


      req.userId = (user as JwtPayload).id
    //   console.log('User: ', user)

      next();
    }
  );
};