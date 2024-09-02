import { body, param, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express"
import { HttpException } from '../exceptions/exception';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants/constant';



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




export const validateAddProductRequest = [
  body("title")
    .trim()
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title must not be empty")
    .escape(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description must not be empty")
    .isString()
    .withMessage("Description must be a string")
    .escape(),

  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price must not be empty")
    .isNumeric()
    .withMessage("Price must be a number")
    .escape(),

  // body("productImages")
  //   .isArray({ min: 3 })
  //   .withMessage("Product Images must be an array with at least 3 items"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category must not be empty")
    .isString()
    .withMessage("Category must be a string")
    .escape(),

  body("deliveryCharges")
    .trim()
    .notEmpty()
    .withMessage("Delivery Charges must not be empty")
    .isNumeric()
    .withMessage("Delivery Charges must be a number")
    .escape(),

  body("in_Stock")
    .trim()
    .notEmpty()
    .withMessage("In Stock must not be empty")
    .isNumeric()
    .withMessage("In Stock must be a number")
    .escape(),



  handleValidationErrors,
];


export const validateProductById = [
  param("productId")
  .notEmpty()
  .withMessage("Product id is required")
  .isMongoId()
  .withMessage("Invalid productId, it must be a valid MongoDB ObjectId"),
  
  handleValidationErrors
]