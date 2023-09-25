import { Request, Response } from "express";
import Model from "#services/PrismaService";
import { compare } from 'bcrypt'
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
        const match = await compare(data.password, user.password);
        if(!match) res.status(401).json({message: "Wrong username or password"});
        const accessToken = sign({
            id: user.id,
            username: user.username,
            name: user.name
        }, '1234567890');
        res.json({
            token: accessToken
        })
    } catch (error) {
        res.status(404).json({
            message: `${error}`
        })
    }
}