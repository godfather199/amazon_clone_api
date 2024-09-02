// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants/constant';
import { HttpException } from '../exceptions/exception';


export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || HTTP_RESPONSE_CODE.SERVER_ERROR;
  err.status = err.status || 'error';
  err.message = err.message || APP_ERROR_MESSAGE.serverError


  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    validationError: err.validationError,
    stack: err.stack
  });
};
