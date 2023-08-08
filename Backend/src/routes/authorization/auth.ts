import { Response, Request, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import UserType from '../../models/Users/UserType';

function authUser(request: Request, resposne: Response, next: NextFunction) {
    const authHeader: string[] | string | undefined = request.headers && request.headers['authorization']
    if (!authHeader) {
        return resposne.sendStatus(401)
    }
    else {
        var token = authHeader.slice(7)
    }

    const secret: string | undefined = process.env.ACCESS_TOKEN_SECERT;

    if (secret === undefined) {
        // Handle the error, throw an exception, or provide a default value if needed.
        throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined.');
    }
    jwt.verify(token, secret, (err, payload) => {
        if (err) return resposne.sendStatus(403)
        next()
    })

}
function authRole(role: UserType) {
    return (request: Request, response: Response, next: NextFunction) => {

        if (!request.headers['authorization']) {
            response.sendStatus(401)
            return response.send('Not allowed')
        }

        const secret: string | undefined = process.env.ACCESS_TOKEN_SECERT;
        if (secret === undefined) {
            // Handle the error, throw an exception, or provide a default value if needed.
            throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined.');
        }
        jwt.verify(request.headers['authorization'].slice(7), secret, (err, payload) => {
            if (err) return response.sendStatus(403)
            if (JSON.parse(JSON.stringify(payload)).role !== role) return response.sendStatus(401)
            next()
        })
    }
}

 function  getTokenPayload(token : string) : any{
        const secret: string | undefined = process.env.ACCESS_TOKEN_SECERT;
        if (secret === undefined) {
            // Handle the error, throw an exception, or provide a default value if needed.
            throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined.');
        }

        return jwt.verify(token.slice(7), secret)
    }
export {
    authUser,
    authRole,
    getTokenPayload
}