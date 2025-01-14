import mongoose, { Schema, Document } from "mongoose"

interface FoodDoc extends Document {
    vendorID: string
    name: string
    description: string
    foodType: string
    price: number
    category: string
    images: [string]
    rating: number
}

// use string for ts 
// use String for mongodb 

const FoodSchema = new Schema({
    vendorID: { type: String, required: true},
    name: { type: String, required: true },
    discription: { type: String, required: false },
    foodType: { type: String, required: false },
    price: { type: Number, required: false },
    rating: { type: Number, required: false },
    images: { type: [String] },
},
    { timestamps: true }
    
)

const FoodModel = mongoose.model<FoodDoc>('Food', FoodSchema)

export { FoodModel }