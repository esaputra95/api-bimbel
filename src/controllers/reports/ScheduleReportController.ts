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
        body.tentor ? filter = {...filter, tentorId: body.tentor?.value} : null;
        body.studyGroup ? filter = {...filter, studyGroupId: body.studyGroup?.value} : null;
        body.student ? filter = {...filter, scheduleDetails: {
            every: {
                studentId: body.student?.value
            }
        }} : null
        body.scheduleType ? filter = {...filter, scheduleType: body.scheduleType?.value} : null;
        const data = await Model.schedules.findMany({
            where: {
                date: {
                    gte: moment(body.startDate+' 00:00:00').format(),
                    lte: moment(body.endDate+' 23:59:00').format(),
                },
                ...filter
            },
            include: {
                tentor: true,
                rooms: true,
                courses: true,
                studyGroups: true,
                classTypes: true,
            },
            orderBy: {
                date: 'asc'
            }
        });

        let newData:any=[]
        let number:number=1;
        for (const value of data) {
            newData=[
                ...newData,
                [
                    number,
                    value.tentor?.name,
                    value.studyGroups?.name ?? '',
                    moment(value.date).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss'),
                    value.courses?.name,
                    value.rooms?.name,
                    value.type==="study" ? "Belajar" : "Try Out",
                    value.method,
                    value.classTypes?.name
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