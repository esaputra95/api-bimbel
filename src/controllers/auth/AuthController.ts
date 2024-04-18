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
        console.log({user});
        
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
        console.log({error});
        
        res.status(404).json({
            status: false,
            message: "Unauthorized",
            error: {
                displayMessage: "Your username or password is incorect"
            }
        })
    }
}

export const forgotPassword = async (req:Request, res:Response) => {
    try {
        const data = await Model.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if(!data) throw new Error('Email not found')
        res.status(200).json({
            status: true
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "email",
            error: {
                displayMessage: "email not found"
            }
        })
        
    }
}