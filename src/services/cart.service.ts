import { NextFunction } from 'express'
import Cart from '../models/cart.model'
import { ObjectId } from "mongodb";
import { CartType } from '../types/cart.type';



export const get_User_Cart_Service = async (
  userId: string,
  next: NextFunction
): Promise<CartType | null> => {
  try {
    const user_Cart: CartType | null = await Cart.findOne({ ownerId: userId });

    return user_Cart
  } catch (error) {
    next(error);
    return null
  }
};



export const create_New_Cart_Service = async (
  cart_Info: {},
  next: NextFunction
): Promise<CartType | null> => {
    try {
        const new_Cart: CartType = await Cart.create(cart_Info)

        // if(!new_Cart) {
        //   return null
        // }

        return new_Cart
    } catch (error) {
        next(error)
        return null
    }
};



export const update_Cart_Quantity_Service = async (
  updated_Cart: CartType | null,
  next: NextFunction
) => {
  try {
    const new_Updated_Cart = await Cart.findByIdAndUpdate(
      updated_Cart!._id,
      updated_Cart!,
      { new: true }
    );

    return new_Updated_Cart;
  } catch (error) {
    next(error);
  }
};



export const user_Cart_Service = async (userId: string) => {
  try {
    const cart = await Cart.findOne({ ownerId: userId })
      .populate({
        path: "cartItems.productId",
        model: "product",
      })
      .sort({ createdAt: -1 });

    return cart
  } catch (error) {
    throw error
  }
}

