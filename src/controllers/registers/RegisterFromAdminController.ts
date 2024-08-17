import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { RegisterQueryInterface } from "#root/interfaces/registers/RegisterInterface";
import { v4 as uuidv4 } from 'uuid';

const getData = async (req:Request<{}, {}, {}, RegisterQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
        const page:number = parseInt(query.page ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        
        let filter:any= {}
        query.name ? filter = {...filter, students:{
            name: {
                contains: query.name
            }
        }} : null
        query.status ? filter = {...filter, 
            status: query.status === "active" ? 1 : 0
        } : null

        query.isModule ? filter = {...filter, 
            isModule: query.isModule === "send" ? 1 : 0
        } : null
        if(filter.length > 0){
            filter = {
                OR: [
                    ...filter
                ]
            }
        }
        const data = await Model.registers.findMany({
            where: {
                ...filter
            },
            include: {
                students: true,
                packages: true,
                sessions: true,
                guidanceTypes: true
            },
            orderBy: {
                createdAt: 'asc'
            },
            skip: skip,
            take: take
        });
        const total = await Model.registers.count({
            where: {
                ...filter
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting class type data",
            data: {
                register: data,
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
        const registerData = {
            id: uuidv4(),
            studentId: data.studentId,
            sessionId: data.sessionId,
            packageId: data.packageId,
            guidanceTypeId: data.guidanceTypeId,
            userCreate: res.locals.userId,
            location: data.location,
            schoolYearId: data.schoolYearId,
            status: 1
        }

        await Model.registers.create({
            data: registerData
        })
        
        res.status(200).json({
            status: true,
            message: 'successfully in created class type data'
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
        await Model.registers.update({
            where: {
                id: req.params.id
            },
            data: data
        });
        res.status(200).json({
            status: true,
            message: 'successful in updated class type data'
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
        await Model.registers.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted class type data'
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
        const model = await Model.registers.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                students: true,
                packages: true,
                sessions: true,
                guidanceTypes: true
            },
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get class type data',
            data: {
                register: model
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

const getDataSelect = async (req:Request<{}, {}, {}, RegisterQueryInterface>, res:Response) => {
    try {
        const query = req.query
        const model = await Model.registers.findMany({
        })
        let response:any=[]
        for (const value of model){
            response=[...response, {
                value: value.id,
            }]
        }
        res.status(200).json({
            status: true,
            message: 'successfully in get class type data',
            data: {
                register: response
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

const updateModule = async (req:Request, res:Response) => {
    try {
        await Model.registers.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body
            }
        });
        res.status(200).json({
            status: true,
            message: 'successfully in get update module register',
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
    updateModule
}