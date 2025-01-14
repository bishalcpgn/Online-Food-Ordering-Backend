

import express, { NextFunction, Request, Response } from "express"
import { AddFood, GetFood, GetVenderProfile, updateProfileImage, UpdateVenderProfile, VendorLogIn } from "../controllers"
import { AuthMiddleware } from "../middlewares/AuthMiddleware"

import multer from "multer"

const Router = express.Router()

// https://expressjs.com/en/resources/middleware/multer.html

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const uploadedImage = multer({ storage }).single("image")

Router.post("/login", uploadedImage, VendorLogIn)

Router.use(AuthMiddleware)
Router.get("/profile", GetVenderProfile)
Router.put("/update", UpdateVenderProfile)

Router.put("/profileImage", uploadedImage, updateProfileImage)

Router.post("/AddFood", uploadedImage, AddFood)
Router.get("/GetFood", GetFood)






Router.get("/", (req: Request, res: Response, next: NextFunction) => {

    res.json({ "message": "hi" })

})



export { Router as VendorRoutes }

