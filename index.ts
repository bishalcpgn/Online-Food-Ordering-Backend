
import express from "express"

import { connectDB, App } from "./services"


const StartServer = async (): Promise<any> => {

    try {
        const app = express()
        await connectDB()
        await App(app)
        app.listen(3000, () => console.log("listening on port 3000"))
    } catch (error) {
        return error
    }
}


StartServer() 