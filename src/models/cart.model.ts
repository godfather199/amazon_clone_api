import { Schema, model } from "mongoose";
import { CartType } from "../types/cart.type";

const { ObjectId } = Schema.Types;


export const cartSchema = new Schema<CartType>(
  {
    ownerId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<CartType>("cart", cartSchema);
