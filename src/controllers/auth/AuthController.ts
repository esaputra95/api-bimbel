import { Request, Response } from "express";
import Model from "#services/PrismaService";
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { LoginInterface } from "#root/interfaces/AuthInterface";
import { sendEmail } from "../helper/SendEmailController";

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

export const Verification = async (req:Request, res:Response) => {
    try {
        const query = req.query;
        const user = await Model.users.findFirst({
            where: {
                token: query.code+''??''
            }
        });
        
        if(!user) throw new Error('invalid token') 
        await Model.users.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            }
        })

        res.redirect(`${process.env.FE_URL}/auth/login`)
        
    } catch (error) {
        console.log({error})
    }
}

export const ForgotPassword = async (req:Request, res:Response) => {
    try {
        console.log('data');
        
        const salt = await bcrypt.genSalt()
        const passwordText = Math.random().toString(36).substring(2,7);
        const passwordHash = await bcrypt.hash(passwordText, salt)
        const data = await Model.users.updateMany({
            where:{
                email: req.body.email
            },
            data: {
                password: passwordHash
            }
        });

        console.log({data});
        

        if(data){
            await sendEmail(req.body.email, passwordText)
        }

        res.status(200).json({
            status: true,
            message: 'successfully reset password'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `${error}`
        })
    }
}