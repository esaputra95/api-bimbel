import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const getData = async (req:Request, res:Response) => {
    try {
        const status = req.body.data?.status ? parseInt(req.body.data?.status) : undefined
        const data = await Model.students.findMany({
            where: {
                createdAt: {
                    gte: moment(req.body.data.startDate+' 00:00:00').format(),
                    lte: moment(req.body.data.endDate+' 23:59:00').format(),
                },
                registers: {
                    some: {
                        status: status
                    }
                }
            }
        });

        let newData:any=[]
        for (const value of data) {
            newData=[
                ...newData,
                [
                    value.name,
                    value.gender,
                    value.phone,
                    value.address,
                    value.city,
                    value.country
                ]
            ]
        } 
        res.status(200).json({
            status: true,
            message: 'successfully in get student report data',
            data: newData
        })
    } catch (error) {
        console.log({error});
        
        let message = {
            status:500,
            message: { msg: `${error}` }
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            message =  await handleValidationError(error)
        }
        res.status(message.status).json({
            status: false,
            errors: [
                message.message
            ]
        })
    }
}

export { getData }