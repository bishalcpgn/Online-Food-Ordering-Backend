
import mongoose from "mongoose"

// mongodb database connection 
export const connectDB = async () => {
    try {
        await mongoose.connect("")
        console.log(`Connected with DB ${mongoose.connection.host}`)

    } catch (error) {
        console.log("Error while connecting the database", error) 
    }

}

export const JWT_TOKEN = ""


