
import mongoose, { Schema, Document } from "mongoose"

interface CustomerDoc extends Document {
    CustomerID: string
    name: string
    pincode: string
    address: string
    phone: string
    email: string
    password: string
    salt: string
}

// use string for ts 
// use String for mongodb 

const CustomerSchema = new Schema({

    CustomerID: { type: String, required: true },
    name: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    orders: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    }

},
    { timestamps: true }

)

const CustomerModel = mongoose.model<CustomerDoc>('Customer', CustomerSchema)

export { CustomerModel }

