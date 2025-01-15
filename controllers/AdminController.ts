import { Request, Response } from 'express'
import { VendorModel } from '../models'
import { EncryptPassword, GenerateSalt } from '../utility'
import { CreateVendorInput } from '../dto'


/*************************************** CREATE NEW VENDOR ****************************************************/

export const CreateVendor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name,  password, email, pincode } = req.body as CreateVendorInput

        // Perform validation on the extracted vendor details

        // Generate a salt and hash the password
        const salt = await GenerateSalt()
        const hashedPassword = await EncryptPassword(password, salt)

        const newVendor = new VendorModel({
            name,
            password: hashedPassword,
            email,
            pincode
            
        })
       
        await newVendor.save()

        res.status(201).json({ message: 'Vendor created successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating vendor' })
    }
}


/*************************************** GET ALL VENDORS ****************************************************/

export const GetVendor = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const allVendors = await VendorModel.find()

        if (!allVendors) {
            return res.status(400).json({
                success : false,
                message: "No vendors found in database !"
            })
        }
        return res.status(200).json({
            success: true,
            message : " Available vendors are",
            allVendors
        })

    } catch (error) {
        
    }
}


/*************************************** GET VENDOR BY ID ****************************************************/

export const GetVendorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const vendorID = req.params.id
        const vendor = await VendorModel.findById(vendorID)
        if (vendor) res.json({ vendor })
    } catch (error) {
        res.json({
            message: "Vendor not found by ID"
        })
    }
}
