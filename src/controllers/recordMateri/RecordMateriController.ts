import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { ClassTypeQueryInterface } from "#root/interfaces/masters/ClassTypeInterface";
import { UserQueryInterface } from "#root/interfaces/UserInterface";

const getData = async (req:Request<{}, {}, {}, UserQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
        const page:number = parseInt(query.page ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        let filter:any= []
        query.id ? filter = [...filter, {id: { contains: query.name }}] : null
        if(filter.length > 0){
            filter = {
                OR: [
                    ...filter
                ]
            }
        }

        const data = await Model.recordMateri.findMany({
            where: {
                ...filter
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
                tutor: data,
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
        const data = { ...req.body};
        await Model.recordMateri.create({data: {...data, userCreate: res?.locals?.userId ?? ''}});
        res.status(200).json({
            status: true,
            message: 'successfully in created record material data'
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

const updateData = async (req:Request, res:Response) => {
    try {
        const data = { ...req.body};
        await Model.recordMateri.update({
            where: {
                id: req.params.id
            },
            data: data
        });
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
            }
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data',
            data: {
                tutor: model
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
        query.tentorId ? filterSchedule = [ ...filterSchedule, { tentorId: query.tentorId }] : null
        query.name ? filterStudyGroup = [ ...filterStudyGroup, { name: query.name }] : null
        const data = await Model.schedules.findMany({
            where: {
                 ...filterSchedule,
                 studyGroups: {
                    ...filterStudyGroup
                 }
            }
        })
    } catch (error) {
        
    }
}

export {
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect,
    getStudyGroup
}