import { NextFunction } from 'express'
import Cart from '../models/cart.model'
import { ObjectId } from "mongodb";
import { CartType } from '../types/cart.type';



export const get_User_Cart_Service = async (
  userId: ObjectId,
  next: NextFunction
) => {
  try {
    const user_Cart = await Cart.findOne({ ownerId: userId });

    return user_Cart;
  } catch (error) {
    next(error);
  }
};



export const create_New_Cart_Service = async (
  cart_Info: {},
  next: NextFunction
): Promise<CartType | undefined> => {
    try {
        const new_Cart: CartType = await Cart.create(cart_Info)

        return new_Cart
    } catch (error) {
        next(error)
    }
};



export const update_Cart_Quantity_Service = async (
  updated_Cart: CartType,
  next: NextFunction
) => {
  try {
    const new_Updated_Cart = await Cart.findByIdAndUpdate(
      updated_Cart._id,
      updated_Cart,
      { new: true }
    );

    return new_Updated_Cart;
  } catch (error) {
    next(error);
  }
};

