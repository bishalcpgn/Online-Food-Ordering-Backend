

/*

logic for generating OTP


export const GenerateOTP = async () => {
    const OTP = Math.floor(100000 + Math.random() * 900000)

    const expiresIn = new Date()

    return { OTP, expiresIn }
}


export const isOTPValid =  (OTP: number):boolean => {
    // returns false if OPT is expired 
    return Date.now() <= OTP
}




*/

export const GenerateOTP = async () => {}

export const isOTPValid = async () => {}