import { Request, Response } from "express";
import Model from "#services/PrismaService";
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { LoginInterface } from "#root/interfaces/AuthInterface";

export const Login = async (req:Request, res:Response) => {
    try {
        const data:LoginInterface = req.body
        const user = await Model.users.findFirst({
            where: {
                username: data.username
            }
        });
        if(!user) throw new Error('Username or password incorrect')
        const match = bcrypt.compare('123456789', user.password ?? '')
        if(!match) throw new Error('Username or password incorrect')
        const accessToken = sign({
            id: user.id,
            username: user.username,
            name: user.name
        }, '1234567890');
        res.json({
            success: true,
            message: "OK",
            data: {
                token: accessToken,
                refreshToken: "refreshToken"
                }
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unauthorized",
            error: {
                displayMessage: "Your username or password is incorect"
            }
        })
    }
}