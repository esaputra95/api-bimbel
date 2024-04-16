import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const getData = async (req:Request, res:Response) => {
    try {
        const data = await Model.payrolls.findMany({
            where: {
                month: {
                    gte: moment(req.body.data.startDate+' 00:00:00').format(),
                    lte: moment(req.body.data.endDate+' 23:59:00').format(),
                },
                userId: req.body.data?.tentor?.value
            },
            include: {
                userTentor: true,
                payrollDetails: true
            }
        });

        let newData:any=[]
        let newTotal:number=0
        let number:number=1
        for (const value of data) {
            let totalStudent:number=0;
            for (const valueDetail of value.payrollDetails) {
                totalStudent+=parseInt(valueDetail.totalStudent+'')
            };
            newData=[
                ...newData,
                [
                    number,
                    value.userTentor?.name,
                    moment(value.month).format('DD-MM-YYYY'),
                    totalStudent,
                    parseFloat(value.basicSalary+'').toLocaleString('id-id'),
                    parseFloat(value.sessionSalary+'').toLocaleString('id-id'),
                    parseFloat(value.total+'').toLocaleString('id-id')
                ]
            ]
            number++
            newTotal+=parseInt(value.total+'')
        } 

        newData=[
            ...newData,
            [
                '','Total','','','','',parseFloat(newTotal+'').toLocaleString('id-id')
            ]
        ]
        res.status(200).json({
            status: true,
            message: 'successfully in get payroll report data',
            data: newData
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

export { getData }