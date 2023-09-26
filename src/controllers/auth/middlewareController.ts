import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const AccessToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization ?? '';
        if(!authHeader) res.send(403)
        const token = authHeader.split(" ")[1];
        if(token==null) return res.send(401);
        jwt.verify(token, '1234567890', (err)=>{
            if(err) return res.send(403);
            next()
        })
    } catch (error) {
        res.send(403)
    }
}

export {
    AccessToken
}