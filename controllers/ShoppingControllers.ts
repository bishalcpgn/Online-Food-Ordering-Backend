
/* 

TODO :

here customer pincode is required to automatically find resturants in customers area

is it better to store email, pincode in jwt payload ? check in /dto/Vendor.dto.ts 

solution: query for pincode in customer model too 


*/

import express, { Request, response, Response } from "express"
import { VendorModel } from "../models"


// search for all available vendors 
export const AvailableVendors = async (req: Request, res: Response): Promise<any> => {
    const pincode = '1' // customer pincode
    try {
        const result = await VendorModel.find({ pincode: pincode }) // // add serviceAvailable filter
        .sort({ ratings: -1 })
        if (result.length > 0) return res.json({ "message": "Vendors available in your area ", result })
        return res.json({ "message": "Vendors not available" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ "message": "Error occurred while fetching vendors" })
    }
}


// search for top 5 resturants
export const GetTopResturants = async (req: Request, res: Response): Promise<any> => {

    const pincode = '1'
    try {
        const result = await VendorModel.find({ pincode: pincode })  
            .sort({ ratings: -1 })
            .limit(5)
        return res.json({ "message": "Top resturants fetched successfully", result })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ "message": "Error occurred while getting top resturants" })
    }

}



// search for all available foods in customer area 
export const AllFoods = async (req: Request, res: Response): Promise<any> => {

    const pincode = '1' // customer pincode
    try {
        const result = await VendorModel.find({ pincode: pincode }) 
            .populate('foods')
            .select('-_id foods') // removes parent document _id field in response 

        return res.json({ "message": "Available foods in your area", result })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ "message": "Error occurred while fetching foods" })
    }
}

// Get resturant by id 
// this method exists in AdminController too 
export const ResturantByID = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id 
    console.log(id)
    try {
        const resturant = await VendorModel.findById(id)
        if (resturant) {
            return res.json({ "vendor": resturant })
        } else {
            return res.status(404).json({ "message": "Restaurant not found" })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ "message": "An error occurred while fetching the restaurant" })
    }
}
