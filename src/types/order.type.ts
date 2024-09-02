import {Schema, model} from 'mongoose'


const {ObjectId} = Schema.Types


export type OrderType = {
    _id: string;
    customerId: typeof ObjectId;
    sellerId: typeof ObjectId;
    productId: typeof ObjectId;
    quantity: number;
    productPrice: number;
    totalAmount: number;
    deliveryCharges: number;
    orderStatus: string;
    orderDate: Date;
    orderFulfilledDate: Date;
}