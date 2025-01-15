
import { CreateCustomerInput,  CreateOrderInput, CustomerLoginDetails } from "../dto"
import { Request, Response } from "express"
import { CustomerModel } from "../models"
import { EncryptPassword, GeneratejwtToken, GenerateSalt, ValidatePassword } from "../utility"
import { OrderModel } from "../models/OrderModel"


/*************************************** CUSTOMER SIGNUP ****************************************************/

export const CustomerSignup = async (req: Request, res: Response): Promise<any> => {
    
    try {
        const { name, password, email, pincode } = req.body as CreateCustomerInput
        
        // Perform validation on the extracted vendor details
        
        // Generate a salt and hash the password
        const salt = await GenerateSalt()
        const hashedPassword = await EncryptPassword(password, salt)
        
        const newCustomer = new CustomerModel({
            name,
            password: hashedPassword,
            email,
            pincode
        })
        
        await newCustomer.save()
        
        res.status(201).json({ message: 'Customer created successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error creating Customer' })
    }
    
}



/*************************************** CUSTOMER LOGIN ****************************************************/

export const CustomerLogin = async (req: Request, res: Response): Promise<any> => {

    try {
        const { email: enteredEmail, password: enteredPassword } = req.body as CustomerLoginDetails

        const user = await CustomerModel.findOne({ email: enteredEmail })

        if (!user)  return res.status(400).json({ message: "Email not registered!" }) 

        const isMatch = await ValidatePassword(enteredPassword, user.password)

        if (!isMatch)  return res.status(400).json({ message: "Password does not match!" }) 
        
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


/*************************************** GET CUSTOMER PROFILE ****************************************************/

export const CustomerProfile = async (req: Request, res: Response): Promise<any> => {
    

    try {
        const user = req.user // check in AuthMiddleware
        const customer = await CustomerModel.findById(user.id)
        return res.json({ customer })
        
    } catch (error) {
        return res.status(500).json({ "message": "Failed to fetch profile" })
    }
    
    
}


/*************************************** VERIFY CUSTOMER ACCOUNT  ****************************************************/

// OTP generation and validation logic 



/*************************************** CREATE ORDER  ****************************************************/

export const CreateOrder = async (req: Request, res: Response): Promise<any> => {
    
    const customer = req.user.id 
    const { foodID, quantity, price } = req.body as CreateOrderInput

    let totalPrice = quantity * price

    const newOrder = await OrderModel.create({
        customerID: customer,
        foodID,
        quantity,
        price,
        totalPrice
    })
    if (newOrder) return res.json({ "message": "Order created successfully" })
    return res.status(500).json({ "message": "Failed to create order" })
}



/*************************************** GET ALL ORDER  ****************************************************/

export const GetAllOrders = async (req: Request, res: Response): Promise<any> => {
    
    const customer = req.user.id 

    try {
        const orders = await CustomerModel.find({ customerID: customer })
        .populate("Orders")

        if (orders) return res.json({ "message": "Orders fetched successfully", "orders": orders })
        return res.json({ "message": "No orders found" })
        
    } catch (error) {
        return res.status(500).json({ "message": "Failed to fetch orders" })
    }
}



/*************************************** GET ORDER BY ID ****************************************************/

export const GetOrderByID = async (req: Request, res: Response): Promise<any> => {
    
    const orderID = req.params.id 
    
    try {
        const order = await OrderModel.findById(orderID)

        if (order) return res.json({ "message": "Order fetched successfully", "order": order })
        return res.status(404).json({ "message": "Order not found" })
        
    } catch (error) {
        return res.status(500).json({ "message": "Failed to fetch order" })
    }
}
