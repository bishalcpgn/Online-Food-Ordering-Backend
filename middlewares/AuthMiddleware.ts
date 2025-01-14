import { Request, Response, NextFunction } from 'express'
import { ValidateToken } from '../utility'

// Extend the Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        // Validate the token and decode payload
        const user = await ValidateToken(req)

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' })
        }

        // Attach user to request
        req.user = user
        
        next()
    } catch (error) {
        console.error('Error in AuthMiddleware:', error)
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' })
    }
}
