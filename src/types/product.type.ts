import {Schema, model} from 'mongoose'



const {ObjectId} = Schema.Types


export type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImages: {
    public_id: string;
    url: string;
  }[];
  seller: typeof ObjectId;
  category: string;
  deliveryCharges: number;
  in_Stock: number;
  feedback?: {
    customerId: typeof ObjectId;
    rating: number;
    review: string;
  }[];
  activeOrders?: {
    orderId: typeof ObjectId;
  }[];
  fulfilledOrders?: {
    orderId: typeof ObjectId;
  }[];
};

