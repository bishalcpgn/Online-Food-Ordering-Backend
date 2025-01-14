
import mongoose, { Schema, Document, model } from "mongoose"

interface VendorDoc extends Document {
    name: string
    OwnerName: string
    foodType: string
    pincode: string
    address: string
    phone: string
    email: string
    password: string
    salt: string
    serviceAvailable: Boolean
    profileImage: string
    ratings: number
    foods: any
}

// use string for ts 
// use String for mongodb 

const VendorSchema: Schema = new Schema({
    name: { type: String, required: true },
    OwnerName: { type: String, required: false },
    foodType: { type: String, required: false },
    pincode: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    salt: { type: String, required: false },
    serviceAvailable: { type: Boolean },
    profileImage: { type: String, required: false },
    ratings: { type: Number, required: false },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }]
},
    { timestamps: true }
    
)

const VendorModel = mongoose.model<VendorDoc>('Vendor', VendorSchema)

export { VendorModel }