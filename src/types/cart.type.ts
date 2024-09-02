import { Schema } from "mongoose";


const {ObjectId} = Schema.Types


export type CartType = {
  _id: string;
  ownerId: typeof ObjectId;
  cartItems: {
    productId: typeof ObjectId;
    quantity: number;
  }[];
};