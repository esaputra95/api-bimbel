import Model from "#root/services/PrismaService";
import moment from "moment-timezone";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { 
    ScheduleInterface,
    SchedulePostInterface, 
    ScheduleQueryInterface,
    Type
} from "#root/interfaces/schedules/ScheduleInterface";

const getData = async (req:Request<{}, {}, {}, ScheduleQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
        const page:number = parseInt(query.page ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        let filter:any= []
        query.studyGroupId ? filter = [...filter, {studyGroupId: { contains: query.studyGroupId }}] : null
        if(filter.length > 0){
            filter = {
                OR: [
                    ...filter
                ]
            }
        }
        const data = await Model.schedules.findMany({
            include: {
                courses:true,
                rooms: true,
                tentor: true,
                scheduleDetails: {
                    include: {
                        students: true
                    }
                }
            },
            where: {
                ...filter
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: skip,
            take: take
        });
        const total = await Model.schedules.count({
            where: {
                ...filter
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting Schedule data",
            data: {
                schedule: data,
                info:{
                    page: page,
                    limit: take,
                    total: total
                }
            }
        })
    } catch (error) {
        let message = errorType
        message.message.msg = `${error}`
        res.status(message.status).json({
            status: false,
            errors: [
                message.message
            ]
        })
    }
}

const postData = async (req:Request<{}, {}, SchedulePostInterface, {}>, res:Response) => {
    try {
        const time = req.body.time
        const schedule = req.body.schedule;
        const scheduleDetail = req.body.scheduleDetails;

        for (let index = 0; index < time.length; index++) {
            let dataSchedule:ScheduleInterface = {
                studyGroupId: schedule.studyGroupId,
                date: new Date(moment(time[index].date).format()),
                tentorId: time[index].tentorId,
                roomId: time[index].roomId,
                type: time[index].type as Type,
                courseId: time[index].courseId,
                method: schedule.method,
                userCreate: res.locals.user,
                scheduleType: schedule.scheduleType,
            }
            await Model.schedules.create({
                data: {
                    ...dataSchedule,
                    scheduleDetails:{
                        create: [
                            ...scheduleDetail
                        ]
                    }
                },
            })

        }
        
        res.status(200).json({
            status: true,
            message: 'successfully in created Schedule data'
        })
    } catch (error) {
        let message = errorType
        message.message.msg = `${error}`
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

const updateData = async (req:Request<{}, {}, SchedulePostInterface, {}>, res:Response) => {
    try {
        const time = req.body.time
        const schedule = req.body.schedule;
        const scheduleDetail = req.body.scheduleDetails;
        const idDelete = req.body.idDeleteScheduleDetails

        let scheduleDetailUpdate:any=[]
        let scheduleDetailCreate:any=[]
        for (let index = 0; index < scheduleDetail.length; index++) {
            if(scheduleDetail[index].id){
                scheduleDetailUpdate=[...scheduleDetailUpdate,
                    {
                        where: {
                            id: scheduleDetail[index].id
                        },
                        data: {
                            id: scheduleDetail[index].id,
                            studentId: scheduleDetail[index].studentId
                        }
                    }
                ];
            }else {
                scheduleDetailCreate=[...scheduleDetailCreate,
                    {
                        studentId: scheduleDetail[index].studentId,
                        scheduleId: schedule.id
                    }
                ]
            }
        }
        
        for (let index = 0; index < time.length; index++) {
            let dataSchedule:ScheduleInterface = {
                studyGroupId: schedule.studyGroupId,
                date: new Date(moment(time[index].date).format()),
                tentorId: time[index].tentorId,
                roomId: time[index].roomId,
                type: time[index].type as Type,
                courseId: time[index].courseId,
                method: schedule.method,
                userCreate: res.locals.user,
                scheduleType: schedule.scheduleType,
            }
            await Model.schedules.update({
                data: {
                    ...dataSchedule,
                    scheduleDetails:{
                        update: scheduleDetailUpdate
                    }
                },
                where: {
                    id: schedule.id
                }
            })
        }

        // Add new record id exist
        await Model.scheduleDetails.createMany({
            data: scheduleDetailCreate
        })

        const dataDelete: any[] = idDelete.map(value => value.id);
        await Model.scheduleDetails.deleteMany({
            where: {
                id: {
                    in: dataDelete
                }
            }
        })
        
        res.status(200).json({
            status: true,
            message: 'successfully in created Schedule data'
        })
    } catch (error) {
        let message = errorType
        message.message.msg = `${error}`
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

const deleteData = async (req:Request, res:Response)=> {
    try {
        await Model.schedules.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted Study Group data'
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
            status: message.status,
            errors: [
                message.message
            ]
        })
    }
}

const getDataById = async (req:Request, res:Response) => {
    try {
        const model = await Model.schedules.findUnique({
            where: {
                id: req.params.id
            }
        });
        const detail = await Model.scheduleDetails.findMany({
            where: {
                scheduleId: model?.id
            }
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get Schedule data',
            data: {
                schedule: model,
                scheduleDetails: detail
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

const getDataSelect = async (req:Request<{}, {}, {}, ScheduleInterface>, res:Response) => {
    try {
        const query = req.query
        const model = await Model.schedules.findMany({
            where: {
                id: query.id
            }
        })
        let response:any=[]
        for (const value of model){
            response=[...response, {
                value: value.id,
                label: value.date
            }]
        }
        res.status(200).json({
            status: true,
            message: 'successfully in get Schedule data',
            data: {
                Schedule: response
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

const checkSchedule = async (req:Request, res:Response) => {
    try {
        let status=false;
        const param = req.body
        const end = moment(param.date).add(60, 'minutes')
        const start = moment(param.date).subtract(60, 'minutes')

        const schedule = await Model.schedules.findMany({
            where: {
                date:{
                    lte: new Date(moment(end).format()),
                    gte: new Date(moment(start).format())
                },
                tentorId: param.tentorId,
                roomId: param.roomId
            }
        })
        
        if(param.tentorId){
            const tentorNotAvailable = await Model.tentorNotAvailable.findMany({
                where: {
                    startDate: {
                        lte: new Date(moment(param.date).format())
                    },
                    untilDate: {
                        gte: new Date(moment(param.date).format())
                    },
                    tentorId: param.tentorId
                }
            });
            if(tentorNotAvailable.length>0) status
        }
        
        
        if(schedule.length>0) status = true
        res.status(200).json({
            status: status,
            message: 'successfully in get Schedule data',
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

const cancelSchedule = async (req:Request, res:Response) => {
    try {
        await Model.schedules.update({
            data: {
                status: 'cancel'
            },
            where: {
                id: req.query.id+''
            }
        })
        res.status(200).json({
            status: true,
            message: 'successfully in get Schedule data',
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
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect,
    checkSchedule,
    cancelSchedule
}