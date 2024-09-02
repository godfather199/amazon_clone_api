import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express"
import { HttpException } from '../exceptions/exception';
import { HTTP_RESPONSE_CODE } from '../constants/constant';



const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        "Validation Error",
        errors.array()
      )
    );
  }

  next();
};




export const validateRegisterRequest = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username must not be empty")
    .isString()
    .withMessage("Username must be a string")
    .escape(),
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("FirstName must not be empty")
    .isString()
    .withMessage("FirstName must be a string")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("LastName must not be empty")
    .isString()
    .withMessage("LastName must be a string")
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty")
    .isString()
    .withMessage("Email must be a string")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password must not be empty")
    .isString()
    .withMessage("Password must be a string")
    .escape(),

  handleValidationErrors,
];