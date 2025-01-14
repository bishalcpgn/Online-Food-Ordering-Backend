
import express from "express"
import {  AllFoods, AvailableVendors, GetTopResturants, ResturantByID } from "../controllers"
import { AuthMiddleware } from "../middlewares/AuthMiddleware"

const Router = express.Router()

Router.use(AuthMiddleware)

//  Available Vendors
 Router.get("/AvailableVendors", AvailableVendors )

// Top Resturants 
Router.get("/Top-Resturants/:pincode", GetTopResturants )
 
// All Food  
Router.get("/AllFoods", AllFoods )

// Find Resturants 
Router.get("/Resturant/:id", ResturantByID )

export { Router as ShoppingRoutes } 

