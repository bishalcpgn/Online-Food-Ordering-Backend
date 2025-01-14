

import express, {Request, Response, NextFunction } from "express"
import { CreateVendor, GetVendorById, GetVendor } from "../controllers"


const Router = express.Router()

Router.post("/CreateVendor", CreateVendor )
Router.get("/vendors", GetVendor )

Router.get("/vendor/:id", GetVendorById )



Router.get("/", (req: Request, res: Response, next: NextFunction) => {

res.json({"message": "hi"})

})





export { Router as AdminRoutes }

