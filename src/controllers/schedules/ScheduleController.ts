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
        console.log({error});
        
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
            let dataSchedule:any = {
                studyGroupId: schedule?.studyGroupId ?? null,
                date: new Date(moment(time[index].date).format()),
                tentorId: time[index].tentorId,
                roomId: time[index].roomId,
                type: time[index].type as Type,
                courseId: time[index].courseId,
                method: schedule.method,
                userCreate: res.locals.user,
                scheduleType: schedule.scheduleType.value,
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
        console.log({error});
        
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

const updateData = async (req:Request<{id:string}, {}, SchedulePostInterface, {}>, res:Response) => {
    try {
        const time = req.body.time
        const schedule = req.body.schedule;
        const scheduleDetail = req.body.scheduleDetails;
        const idDelete = req.body.idDeleteSessionDetails
        
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
                scheduleType: schedule.scheduleType.value,
            }
            await Model.schedules.update({
                data: {
                    ...dataSchedule,
                },
                where: {
                    id: schedule.id
                }
            })
        }

        for (let index = 0; index < scheduleDetail.length; index++) {
            if(scheduleDetail[index].id){
                await Model.scheduleDetails.update({
                    data: {
                        studentId: scheduleDetail[index].studentId
                    }, where: {
                        id: scheduleDetail[index].id
                    }
                })
            }else {
                await Model.scheduleDetails.create({
                    data:{
                        scheduleId: req.params.id,
                        studentId: scheduleDetail[index].studentId
                    }
                })
            }
        }
        

        const dataDelete: any[] = idDelete?.map(value => value.id);
        if(dataDelete?.length>0){
            await Model.scheduleDetails.deleteMany({
                where: {
                    id: {
                        in: dataDelete
                    }
                }
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
            },
            include: {
                studyGroups: {
                    include: {
                        classMaster: true
                    }
                },
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
        const end = moment(param.date).add(90, 'minutes')
        const start = moment(param.date).subtract(90, 'minutes')

        const schedule = await Model.schedules.findMany({
            where: {
                date:{
                    lte: moment(end).format(),
                    gte: moment(start).format()
                },
                tentorId: param.tentorId,
                roomId: param.roomId,
                courseId: param.courseId
            }
        });
        
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
            if(tentorNotAvailable.length>0) status=true
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