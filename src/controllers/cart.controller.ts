import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb";
import { create_New_Cart_Service, get_User_Cart_Service, update_Cart_Quantity_Service, user_Cart_Service } from "../services/cart.service";
import { CartType } from "../types/cart.type";
import { HTTP_RESPONSE_CODE, HttpStatusCode } from "../constants/constant";
import { parse } from "path";
import { CART_RESPONSE_MESSAGE } from "../constants/cart.constants";
import { update_Cart_Info_User_Service } from "../services/user.service";
import mongoose from "mongoose";



export const check_Cart_Status = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const userId = new ObjectId("659a51451b67c886efd46d98");
  // const userId = new ObjectId("66d75100a2763d367ccab696");
  const user_Id = req.userId


  try {
    const user_Cart: any = await get_User_Cart_Service(user_Id as string, next);

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
  // const userId = new ObjectId("66d75100a2763d367ccab696");
  const userId = new mongoose.Types.ObjectId("66d75100a2763d367ccab696");
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
    const new_Cart: CartType | null = await create_New_Cart_Service(cart_Object, next);

    // if(!new_Cart) {
    //   return null
    // }

    await update_Cart_Info_User_Service(userId, new_Cart!._id)

    res.status(HTTP_RESPONSE_CODE.SUCCESS).json({
      msg: CART_RESPONSE_MESSAGE.cartCreated,
      new_Cart,
    });
  } catch (error) {
    next(error);
  }
};



export const add_New_Product_To_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    // const userId = new ObjectId("66d75100a2763d367ccab696")
    const user_Id = req.userId;
    const { productId, quantity } = req.query;

    try {
      const user_Cart: any = await get_User_Cart_Service(user_Id as string, next);

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
    } catch (error) {
        next(error)
    }
};



export const update_Product_Quantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_Id = req.userId
  const {productId, quantity} = req.query

  const user_Cart: any = await get_User_Cart_Service(user_Id as string, next);
  
  try {
    user_Cart.cartItems = user_Cart.cartItems.map((item: any) => {
      if (item.productId.toString() === productId?.toString()) {
        return {
          ...item,
          quantity,
        };
      }

      return item;
    });

    const updated_Cart = await update_Cart_Quantity_Service(user_Cart, next);

    return res.status(HttpStatusCode.SUCCESS).json({
      msg: CART_RESPONSE_MESSAGE.quantityUpdated,
      updated_Cart,
    });
  } catch (error) {
    next(error);
  }
};



export const user_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_Id = req.userId

    const cart = await user_Cart_Service(user_Id as string)

    res.status(201).json({
      msg: CART_RESPONSE_MESSAGE.userCart,
      cart
    })
  } catch (error) {
    
  }
};



export const remove_Product_From_Cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const userId = new ObjectId("659a51451b67c886efd46d88");
    const user_Id = req.userId

    const { productId } = req.body;

    const user_Cart: CartType | null = await get_User_Cart_Service(user_Id as string, next)

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







 










