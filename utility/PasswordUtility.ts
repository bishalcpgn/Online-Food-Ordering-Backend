
import { Request } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../config' // better use env variable
import { JwtPayloadFormat } from '../dto'


export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const EncryptPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (password: string, actualPassword: string) => {
    return await bcrypt.compare(password, actualPassword)
}

// Generate JWT token 
export const GeneratejwtToken = (payload: JwtPayloadFormat): string => {
    return jwt.sign(payload, JWT_TOKEN, { expiresIn: '10d' })
}


// Validate jwt token from request 
export const ValidateToken = async (req: Request ) => {
    const authToken = req.headers.authorization
    if (!authToken) return "Authorization header missing"
    const token = authToken.split(" ")[1]
    if (!token) return "Token missing from authorization header"
    const decoded = jwt.verify(token, JWT_TOKEN) as JwtPayloadFormat
    if (!decoded) return "Error in token"
   return decoded  
}