import { body, query, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/exception";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";



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
        APP_ERROR_MESSAGE.productError,
        errors.array()
      )
    );
  }

  next();
};



export const validateUpdateCart = [
  query("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid productId, it must be a valid MongoDB ObjectId"),

    query("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity must not be empty")
    .isNumeric()
    .withMessage("Quantity must be a number")
    .escape(),
    
  handleValidationErrors,
];