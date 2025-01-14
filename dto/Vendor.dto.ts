
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

export interface CreateVendorInput {
    name: string
    OwnerName: string
    foodType: string
    pincode: string
    address: string
    phone: string
    email: string
    password: string
    ownerName: string
}


export interface VendorLoginDetails {
    email: string
    password: string
}


// is it good to store email in jwt payload ?
export interface JwtPayloadFormat {
    email: string
    id: string
    
}


export interface UpdateVendorInputs {
        name?: any
        address?: any
        phone?: any
        pincode?: any
}


