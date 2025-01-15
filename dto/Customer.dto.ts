import { CreateOrder } from './../controllers/CustomerController';

export interface CreateCustomerInput {
    name: string
    pincode: string
    address?: string
    phone?: string
    email: string
    password: string
}


export interface CustomerLoginDetails {
    email: string
    password: string
}


export interface CreateOrderInput {
    quantity: number
    price: number
    foodID: string
}