import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment-timezone";

const getData = async (req:Request, res:Response) => {
    try {
        const body = req.body.data;
        let filter:any={};
        body.course ? filter = {...filter, courseId: body.course?.value} : null;
        body.room ? filter = {...filter, roomId: body.room?.value} : null;
        body.scheduleType ? filter = {...filter, scheduleType: body.scheduleType?.value} : null;
        body.student ? filter = {...filter, studentId: body.student?.value} : null;
        const data = await Model.registers.findMany({
            where: {
                createdAt: {
                    gte: moment(body.startDate+' 00:00:00').format(),
                    lte: moment(body.endDate+' 23:59:00').format(),
                },
                ...filter
            },
            include: {
                students: true,
                classMaster: true,
                sessions: true,
                packages: true,
                schoolYears: true
            }
        });

        let newData:any=[]
        let number:number=1;
        for (const value of data) {
            newData=[
                ...newData,
                [
                    number,
                    value.students?.name,
                    value.classMaster?.name,
                    value.students?.university,
                    value.students?.studyProgram,
                    value.students?.school,
                    value.students?.placeBirth,
                    moment(value.students?.dateBirth).tz('Asia/Jakarta').format('DD/MM/YYYY'),
                    // value.amount
                    value.sessions?.name,
                    value.packages?.name,
                    value.location,
                    value.schoolYears?.name
                ]
            ];
            number++
        } 
        
        res.status(200).json({
            status: true,
            message: 'successfully in get student report data',
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