import {Schema, model} from 'mongoose'
import { OrderType } from '../types/order.type'


const {ObjectId} = Schema.Types


const orderSchema = new Schema<OrderType>({
    customerId: {
        type: String,
        ref: 'user',
        required: true
    },
    sellerId: {
        type: String,
        ref: 'user',
        required: true
    },
    productId: {
        type: String,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true
    },
    orderStatus: {
        enum: [
            "Not delivered",
            "Out for delivery",
            "Received"
        ],
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    orderFulfilledDate: {
        type: Date,
        required: true
    },
},
{
    timestamps: true
})



export default model<OrderType>('order', orderSchema)
