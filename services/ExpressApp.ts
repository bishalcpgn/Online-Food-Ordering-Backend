
import express, { Application } from 'express'
import { AdminRoutes, VendorRoutes, ShoppingRoutes } from '../routes'
import morgan from 'morgan'
import path from 'path'

export const App = async (app: Application) => {

    // middlewares 
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/images', express.static(path.join(__dirname, 'images')))

    // routes 
    app.use("/admin", AdminRoutes)
    app.use("/vendor", VendorRoutes)

    app.use("/shopping", ShoppingRoutes)

    return app 
    
}



