import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

// get config variables
dotenv.config();

const SECRET_TOKEN = process.env.TOKEN_SECRET;

/**
 * Middleware method that will decide whether a user may continue to the specific
 * route meant to be used in a route declaration
 * @param req Request Object that is sent to route
 * @param res Response Object that is sent with route
 * @param next next will 'complete' the middleware function and allow
 * the user to continue to the requested route
 */
export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        /** If there is no auth header then we are sending a 403 with
         * the message Forbidden. We could also redirect the user to the register
         * or login page, but this is fine for now
         */
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
        })
    }
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, SECRET_TOKEN, (err, decoded)=> {
        if (err) return res.status(403);
        next();
    })
}

/**
 * jwt's are encrypted tokens that consist of some hasehed data, in this 
 * case a username, a secret token which was randomly generated and a time value
 * which declares when this token expires.
 * @param username for now we pass the username, this could be
 * anything, but for now we're just passing a string for testing purposes
 * @returns jwt token used to authenticate client requests
 */
export const generateAccessToken = (username: string) => {
    return jwt.sign(username, SECRET_TOKEN, { expiresIn: '1800s' });
}
