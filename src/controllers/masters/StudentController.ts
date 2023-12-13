import { handleValidationError } from "#root/helpers/handleValidationError"
import Model from "#root/services/PrismaService"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"

const getDataSelect = async (req:Request, res:Response) => {
    try {
        const query = req.query
        const model = await Model.students.findMany({
            where: {
                name: {
                    contains: query.name+''
                }
            }
        })
        let response:any=[]
        for (const value of model){
            response=[...response, {
                value: value.id,
                label: value.name
            }]
        }
        res.status(200).json({
            status: true,
            message: 'successfully in get class type data',
            data: {
                student: response
            }
        })
    } catch (error) {
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

export { getDataSelect }