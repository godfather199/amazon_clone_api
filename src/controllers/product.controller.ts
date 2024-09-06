import { NextFunction, Request, Response } from "express"
import { category_Filter_Service, create_Product_Service, featured_Products_Service, product_By_Id_Service, products_By_SellerId, upload_Image_Service } from "../services/product.service";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";
import { ObjectId } from "mongodb";
import { PRODUCT_RESPONSE_MESSAGE } from "../constants/product.constant";



export const add_New_Product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
      // console.log("Images: ", req.files)
      // console.log('Data: ', req.body)
      // return 
      
      req.body.category = req.body.category.replace(/&#x27;/g, "'");

      const imageUrl = await upload_Image_Service(
        req.files as Express.Multer.File[]
      );

  // 1- 'seller' property should be extracted from req.user

      const new_Product = await create_Product_Service({
        ...req.body,
        seller: new ObjectId("659a51451b67c886efd46d98"),
        productImages: imageUrl
      });

      // 2- Add 'new_Product' to the 'seller' document

      res.status(HTTP_RESPONSE_CODE.CREATED).json({
        msg: APP_ERROR_MESSAGE.newProduct,
        new_Product,
      });
    } catch (error) {
      next(error);
    }
};



export const seller_Products = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 3- Extract sellerId from req.user and then fetch products
  try {
    const products = await products_By_SellerId(next)

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: 'Fetched seller products',
      products
    })
    
  } catch (error) {
    
  }
};



export const featured_Products = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const random_Products = await featured_Products_Service(next);

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: PRODUCT_RESPONSE_MESSAGE.featuredProducts,
      random_Products
    });
  } catch (error) {
    next(error);
  }
};



export const product_By_Id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;

  try {
    const product = await product_By_Id_Service(productId, next);

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: PRODUCT_RESPONSE_MESSAGE.getProduct,
      product,
    });
  } catch (error) {
    next(error);
  }
};



export const category_Filter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {category} = req.query

  try {
    const products = await category_Filter_Service(category as string)

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: PRODUCT_RESPONSE_MESSAGE.categoryProduct,
      products
    })
  } catch (error) {
    next(error)
  }
};



// export const seller_Products = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};




