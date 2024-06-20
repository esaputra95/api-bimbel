import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const getData = async (req:Request, res:Response) => {
    try {
        const data = await Model.recordMateri.findMany({
            where: {
                date: {
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
                materials: true,
                scheduleDetails: {
                    include: {
                        schedules: true
                    }
                }
            }
        });

        let newData:any=[]
        let number:number=1;
        for (const value of data) {
            if(req.body.data?.student?.value){
                newData=[
                    ...newData,
                    [
                        number,
                        value.userTentor?.name,
                        value.materials?.name,
                        moment(value.scheduleDetails?.schedules?.date).format('YYYY-MM-DD HH:mm'),
                        value.description
                    ]
                ];
            }else{
                newData=[
                    ...newData,
                    [
                        number,
                        value.userTentor?.name,
                        value.students?.name,
                        value.materials?.name,
                        moment(value.scheduleDetails?.schedules?.date).format('YYYY-MM-DD HH:mm'),
                        value.description
                    ]
                ];
            }
            number++
        };
        // SORT DATA 
        newData.sort((a:any, b:any) => {
            let date1:any
            let date2:any
            if(req.body.data?.student?.value || req.body.data?.tentor?.value){
                date1 = new Date(a[3]);
                date2 = new Date(b[3]);
            }else{
                date1 = new Date(a[4]);
                date2 = new Date(b[4]);
            }
            return date1 - date2;
        });

        // FORMAT DATE
        let finalData:any=[]
        for (let index = 0; index < newData.length; index++) {
            if(req.body.data?.student?.value || req.body.data?.tentor?.value){
                finalData=[
                    ...finalData,
                    [
                        newData[index][0],
                        newData[index][1],
                        newData[index][2],
                        moment(newData[index][3]).format('DD/MM/YYYY HH:mm'),
                        newData[index][4],
                    ]
                ]
            }else{
                finalData=[
                    ...finalData,
                    [
                        newData[index][0],
                        newData[index][1],
                        newData[index][2],
                        newData[index][3],
                        moment(newData[index][4]).format('DD/MM/YYYY HH:mm'),
                        newData[index][5],
                    ]
                ]
            }
        }
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data',
            data: finalData
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