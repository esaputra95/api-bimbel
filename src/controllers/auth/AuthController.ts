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
        const match = await bcrypt.compare(data.password, user.password ?? '')
        if(!match) throw new Error('Username or password incorrect')
        const accessToken = sign({
            id: user.id,
            username: user.username,
            name: user.name,
            userType: user.userType
        }, '1234567890');
        res.json({
            status: true,
            message: "OK",
            data: {
                token: accessToken,
                refreshToken: "refreshToken"
                }
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Unauthorized",
            error: {
                displayMessage: "Your username or password is incorect"
            }
        })
    }
}