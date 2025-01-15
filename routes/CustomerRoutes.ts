
import express from "express"
import { CreateOrder, GetAllOrders } from "../controllers/CustomerController"
import { GetVendorById } from "../controllers"

const Router = express.Router()

Router.post("/signup", )
Router.post("/login", )

// Verify Customer Account
Router.get("/verify/:token", )

// Profile 
Router.get("/profile", )

// Order related routes 
Router.post("/CreateOrder", CreateOrder)
Router.get("/GetAllOrder", GetAllOrders )
Router.get("/GetOrder/:id", GetVendorById )



export { Router as CustomerRoutes }