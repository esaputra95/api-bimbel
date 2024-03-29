import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { ClassTypeQueryInterface } from "#root/interfaces/masters/ClassTypeInterface";
import { UserQueryInterface } from "#root/interfaces/UserInterface";
import moment from "moment";

const getData = async (req:Request<{}, {}, {}, UserQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
        const page:number = parseInt(query.page ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        let filter:any= {}
        query.studentId ? filter = {...filter, studentId:  query.studentId } : null

        if(res.locals.userType !== "admin"){
            filter = {
                ...filter,
                tentorId: res.locals.userId
            }
        }

        const data = await Model.recordMateri.findMany({
            where: {
                ...filter
            },
            include: {
                materials: true,
                students: true,
                userTentor: true
            },
            orderBy: {
                id: 'asc'
            },
            skip: skip,
            take: take
        })
        const total = await Model.recordMateri.count({
            where: {
                ...filter
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting record material data",
            data: {
                recordMateri: data,
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

const postData = async (req:Request, res:Response) => {
    try {
        let data = { ...req.body};
        if(res.locals.userType!=="admin"){
            data.tentorId = res.locals.userId
        }else{
            data.tentorId = data.tentor.value
        }
        const detail = data.detail ?? []
        for (let index = 0; index < detail.length; index++) {
            const dataPost = {
                date: moment(data.date).format(),
                studentId: detail[index].studentId,
                materiId: detail[index].materiId,
                description: detail[index].description,
                advice: detail[index].advice,
                scheduleDetailId: detail[index].scheduleDetailId,
                tentorId: data.tentorId,
                userCreate: res.locals.userId
            };
            await Model.recordMateri.create({
                data: dataPost
            });

            const study = await Model.studyGroups.findFirst({
                where: {
                    studyGroupDetails: {
                        some: {
                            studentId: detail[index].studentId,
                        }
                    },
                }
            });

            const record = await Model.recordMateri.count({
                where: {
                    studentId: detail[index].studentId
                }
            });

            if(study?.total === record){
                const register = await Model.registers.findFirst({
                    where: {
                        studentId: detail[index].studentId
                    }
                })
                await Model.registers.update({
                    where:{
                        id: register?.id
                    },
                    data: {
                        status: 0
                    }
                })
            }
        }

        
        res.status(200).json({
            status: true,
            message: 'successfully in created record material data'
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

const updateData = async (req:Request, res:Response) => {
    try {
        const data = { ...req.body};
        const detail = data.detail ?? []
        for (let index = 0; index < detail.length; index++) {
            const dataPost = {
                date: moment(data.date).format(),
                studentId: detail[index].studentId,
                materiId: detail[index].materiId,
                description: detail[index].description,
                advice: detail[index].advice,
                scheduleDetailId: detail[index].scheduleDetailId,
                tentorId: data.tentorId
            }
            
            await Model.recordMateri.update({
                data: dataPost, where: {
                    id: req.params.id
                }
            })
        }
        res.status(200).json({
            status: true,
            message: 'successful in updated record material data'
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
        await Model.recordMateri.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted record material data'
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
        const model = await Model.recordMateri.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                scheduleDetails:{
                    include: {
                        schedules: true
                    }
                }
            }
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data',
            data: {
                recordMateri: model
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

const getDataSelect = async (req:Request<{}, {}, {}, ClassTypeQueryInterface>, res:Response) => {
    try {
        const query = req.query
        const model = await Model.recordMateri.findMany({
            where: {
                id: {
                    contains: query.name
                },
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
            message: 'successfully in get record material data',
            data: {
                tutor: response
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
        const query = req.query;
        let filterSchedule:any = {}
        let filterStudyGroup:any = {}
        if(res.locals.userType==="tentor"){
            filterSchedule = { ...filterSchedule, tentorId: res.locals.userId }
        }
        
        query.name ? filterStudyGroup = { ...filterStudyGroup, name: query.name } : null

        const data = await Model.studyGroups.findMany({
            where: {
                name: {
                    contains:query.name+''
                },
                schedules: {
                    some: {
                        ...filterSchedule
                    }
                }
            },
        });

        let response:any=[]
        for (const value of data){
            response=[...response, {
                value: value.id,
                label: value.name
            }]
        }

        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
            data: {
                studyGroup: response
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

const getListStudent = async (req:Request, res:Response) => {
    try {
        const query = req.body;
        const date = moment(`${query.date} 00:00:00`).format()
        const date2 = moment(`${query.date2} 23:59:00`).format()
        const tentorId = res.locals.userType === "admin" ? query.tentorId : res.locals.userId
        const data = await Model.schedules.findMany({
            where: {
                date: {
                    lte: date2,
                    gte: date
                },
                tentorId: tentorId
            },
            include: {
                scheduleDetails: {
                    include: {
                        recordMateri:  true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        })

        let dataDetail:any = [];
        for (let index = 0; index < data.length; index++) {
            let scheduleDetail= data[index].scheduleDetails
            for (let indexDetail = 0; indexDetail < data[index].scheduleDetails.length; indexDetail++) {
                if(scheduleDetail[indexDetail].recordMateri.length===0){
                    dataDetail=[
                        ...dataDetail,
                        {
                            ...scheduleDetail[indexDetail],
                            materiId: data[index]?.courseId,
                            studyGroupId: data[index].studyGroupId
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

export {
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect,
    getStudyGroup,
    getListStudent
}