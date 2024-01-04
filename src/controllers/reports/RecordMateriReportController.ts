import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const getData = async (req:Request, res:Response) => {
    try {
        const data = await Model.recordMateri.findMany({
            where: {
                createdAt: {
                    gte: moment(req.body.data.startDate+' 00:00:00').format(),
                    lte: moment(req.body.data.endDate+' 23:59:00').format(),
                },
                tentorId: req.body.data?.tentor?.value,
                materiId: req.body.data?.material?.value,
                studentId: req.body.data?.student?.value
            },
            include: {
                userTentor: true,
                students: true,
                materials: true
            }
        });

        let newData:any=[]
        for (const value of data) {
            newData=[
                ...newData,
                [
                    value.userTentor?.name,
                    value.students?.name,
                    value.materials?.name,
                    value.advice,
                    value.description
                ]
            ]
        } 
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data',
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