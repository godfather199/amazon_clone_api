import {Schema, model} from 'mongoose'
import { ProductType } from '../types/product.type'


export const {ObjectId} = Schema.Types


const productSchema = new Schema<ProductType>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImages: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
    },
  ],
  seller: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  category: {
    type: 'String',
    enum: [
      "Mobile",
      "Men's Fashion",
      "Women's Fashion",
      "Books",
      "Electronics",
    ],
    required: true,
  },
  deliveryCharges: {
    type: Number,
    required: true,
  },
  in_Stock: {
    type: Number,
    required: true,
  },
  feedback: [
    {
      customerId: {
        type: ObjectId,
        ref: "user",
        required: true,
      },
      rating: {
        type: Number,
      },
      review: {
        type: String,
      },
    },
  ],
  activeOrders: [
    {
      orderId: {
        type: ObjectId,
        ref: 'order',
        required: true,
      }
    }
      ],
      fulfilledOrders: [
        {
          orderId: {
            type: ObjectId,
            ref: 'order',
            required: true,
        }
    }
  ],
},
{
    timestamps: true
});



export default model<ProductType>('product', productSchema)