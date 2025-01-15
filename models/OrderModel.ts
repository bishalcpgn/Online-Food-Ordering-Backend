
import mongoose, { Schema, Document } from "mongoose"

export interface OrderDoc extends Document {
    foodID: string
    quantity: number
    price: number
    totalPrice: number
    orderStatus: string
}

const OrderSchema = new Schema({
    foodID: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderStatus: { type: String, default: "Pending" },
    totalPrice: { type: Number, required: true }
},
    { timestamps: true }
)

const OrderModel = mongoose.model<OrderDoc>('Order', OrderSchema)

export { OrderModel }