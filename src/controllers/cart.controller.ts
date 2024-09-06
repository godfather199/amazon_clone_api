import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb";
import { create_New_Cart_Service, get_User_Cart_Service, update_Cart_Quantity_Service } from "../services/cart.service";
import { CartType } from "../types/cart.type";
import { HTTP_RESPONSE_CODE, HttpStatusCode } from "../constants/constant";
import { parse } from "path";
import { CART_RESPONSE_MESSAGE } from "../constants/cart.constants";



export const check_Cart_Status = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const userId = new ObjectId("659a51451b67c886efd46d98");
  const userId = new ObjectId("659a51451b67c886efd46d88");

  try {
    const user_Cart: any = await get_User_Cart_Service(userId, next);

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: "Logged in user's cart status",
      cartStatus: user_Cart ? "Found" : "Not Found"
    })
  } catch (error) {
    next(error);
  }
};



export const create_New_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new ObjectId("659a51451b67c886efd46d88");
  const { productId, quantity } = req.query;

  const cart_Object = {
    ownerId: userId,
    cartItems: [
      {
        productId,
        quantity,
      },
    ],
  };

  try {
    const new_Cart = await create_New_Cart_Service(cart_Object, next);

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: CART_RESPONSE_MESSAGE.cartCreated,
      new_Cart,
    });
  } catch (error) {
    next(error);
  }
};



export const update_User_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const userId = new ObjectId("659a51451b67c886efd46d98")
    const {productId, quantity} = req.query

    try {
      const user_Cart: any = await get_User_Cart_Service(userId, next);

      const is_Product_Present = user_Cart.cartItems.find(
        (item: any) => item.productId.toString() === productId?.toString()
      );

      
      // If product exists in the cart increment/decrement its quantity
      if(is_Product_Present) {
        const updated_Cart = await update_Product_Quantity(
          user_Cart,
          productId,
          quantity,
          next
        );

        return res.status(HttpStatusCode.SUCCESS).json({
          msg: CART_RESPONSE_MESSAGE.updatedProductQuantity,
          updated_Cart
        })
      }
      else {
        // Add new product to the cart
        user_Cart.cartItems.push({
          productId,
          quantity,
        });

        const updated_Cart = await update_Cart_Quantity_Service(
          user_Cart,
          next
        );

        return res.status(HttpStatusCode.SUCCESS).json({
          msg: CART_RESPONSE_MESSAGE.productAdded,
          updated_Cart
        })
      }
    } catch (error) {
        next(error)
    }
};



export const remove_Product_From_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = new ObjectId("659a51451b67c886efd46d88");
    const { productId } = req.body;

    const user_Cart: CartType | null = await get_User_Cart_Service(userId, next)

    user_Cart!.cartItems = user_Cart!.cartItems.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    const response_Cart = await update_Cart_Quantity_Service(user_Cart, next);

    return response_Cart;
  } catch (error) {
    next(error);
  }
};



export const delete_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
  } catch (error) {
    
  }
};



 const update_Product_Quantity = async (
   user_Cart: CartType,
   productId: any,
   quantity: any,
   next: NextFunction
 ) => {
   user_Cart.cartItems = user_Cart.cartItems.map((item: any) => {
     if (item.productId.toString() === productId?.toString()) {
       return {
         ...item,
         quantity,
       };
     }

     return item;
   });

   try {
     const response_Cart = await update_Cart_Quantity_Service(user_Cart, next);
  
     return response_Cart;
   } catch (error) {
    next(error)
   }
 };



 










