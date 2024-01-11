import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const getRecordMateri = async ({}, res:Response) => {
    try {
        const date = moment().format()
        
        let filter:any={}
        if(res.locals.userType !== "admin"){
            filter={...filter, tentorId: res.locals.userId}
        }
        const data = await Model.schedules.findMany({
            where: {
                date: {
                    lte: date
                },
                ...filter
            },
            include: {
                scheduleDetails: {
                    include: {
                        recordMateri:  true,
                        students: {
                            select: {
                                id:true,
                                name: true,
                                phone: true
                            }
                        },
                    },
                },
                studyGroups: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        })

        let dataDetail:any = [];
        
        for (const value of data) {
            const scheduleDetail = value?.scheduleDetails ?? [];
            for (let index = 0; index < scheduleDetail.length; index++) {
                if(scheduleDetail[index].recordMateri.length===0){
                    dataDetail=[
                        ...dataDetail,
                        {
                            ...scheduleDetail[index],
                            date: value.date,
                            materiId: value?.courseId,
                            studyGroupName: value.studyGroups.name
                        }
                    ]
                }
                
            }
        }

        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
            data: {
                listStudent: dataDetail
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

const getStudyGroup = async (req:Request, res:Response) => {
    try {
        const data = await Model.students.findMany({
            include:{
                studyGroupDetails: true
            }
        })

        let newData:any = []
        for (const value of data) {
            if(value.studyGroupDetails.length===0){
                newData=[
                    ...newData,
                    value
                ]
            }
        }
        
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
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

export {
    getRecordMateri,
    getStudyGroup
}