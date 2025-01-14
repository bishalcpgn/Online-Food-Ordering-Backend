
import mongoose from "mongoose"
import { DATABASE_URL } from "../config"

export const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL)
        console.log(`Connected with DB ${mongoose.connection.host}`)

    } catch (error) {
        console.log("Error while connecting the database", error)
    }

}
