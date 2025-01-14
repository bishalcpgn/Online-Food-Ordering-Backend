import {  UpdateVendorInputs } from './../dto'
import { Request, Response } from 'express'
import { VendorModel } from '../models'
import { VendorLoginDetails } from '../dto'
import { GeneratejwtToken, ValidatePassword } from '../utility'
import { CreateFoodInputs } from '../dto'
import { FoodModel } from '../models/FoodModel'

// Login || POST
export const VendorLogIn = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email: enteredEmail, password: enteredPassword } = req.body as VendorLoginDetails
        const user = await VendorModel.findOne({ email: enteredEmail })
        if (!user) { return res.status(400).json({ message: "Email not registered!" }) }
        const isMatch = await ValidatePassword(enteredPassword, user.password)
        if (!isMatch) { return res.status(400).json({ message: "Password does not match!" }) }

        // Generate jwt token
        const token = GeneratejwtToken({
            id: user.id,
            email: user.email
        })

        return res.status(200).json({ message: "Welcome, login success!", token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred during login." })
    }
}



// Profile || GET 
export const GetVenderProfile = async (req: Request, res: Response): Promise<any> => {
    const user = req.user // check in AuthMiddleware
    const vendor = await VendorModel.findById(user.id)
    return res.json({ vendor })
}


// UPDATE || PUT
export const UpdateVenderProfile = async (req: Request, res: Response): Promise<any> => {
    const { name, address, phone, pincode } = req.body as UpdateVendorInputs
    const userID = req.user.id
      

    try {
        const updateResult = await VendorModel.findByIdAndUpdate(
            userID,
            { name, address, phone, pincode },
            { new: true }
        )

        if (updateResult) {
            return res.json({ "message": "Updated Successfully" })
        }

        return res.status(404).json({ "message": "Vendor not found" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ "message": "Failed to update profile" })
    }
}



// FOOD || POST

export const AddFood = async (req: Request, res: Response): Promise<any> => {
    const { name, description, foodType, price, category } = req.body as CreateFoodInputs

    const user = req.user.id // check in AuthMiddleware
    const vendor = await VendorModel.findById(user)
    if (!vendor) { return res.json({ "message": "Vendor not found" }) }

    const file = req.file as Express.Multer.File  

    if (!file) { return res.json({ "message": "No image uploaded" })  }
    const image = file.filename

    const newFood = await FoodModel.create({
        vendorId: vendor.id,
        name,
        description,
        foodType,
        price,
        category,
        images:image,
        rating: 0
    })
    vendor.foods.push(newFood)
    vendor.save()
    return res.json({ "message": "Food added successfully" })
}


//  UPDATE coverImage || POST

export const updateProfileImage = async (req: Request, res: Response): Promise<any> => {
    const user = req.user.id
    const vendor = await VendorModel.findById(user)

    if (!vendor) {
        return res.status(404).json({ "message": "Vendor not found" })
    }

    const file = req.file as Express.Multer.File
    if (!file) {
        return res.json({ "message": "No image uploaded" })
    }

    try {
        vendor.profileImage = file.filename
        await vendor.save()  
        
        return res.json({ "message": "Profile image updated successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ "message": "Failed to update profile image" })
    }
}




// FOOD || GET 
export const GetFood = async (req: Request, res: Response): Promise<any> => {
    const vendor = req.user.id // check in AuthMiddleware
    if (!vendor) { return res.json({ "message": "Vendor not found" }) }
    const foods = await FoodModel.find({ vendorId: vendor })
    return res.json({ "message": "Foods fetched successfully", "foods": foods })
}















