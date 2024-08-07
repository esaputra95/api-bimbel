import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { RoomQueryInterface } from "#root/interfaces/RoomInterface";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

const getData = async (req:Request<{}, {}, {}, RoomQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 20 )
        const page:number = parseInt(query.page ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        let filter:any= []
        query.name ? filter = [...filter, {name: { contains: query.name }}] : null
        if(filter.length > 0){
            filter = {
                OR: [
                    ...filter
                ]
            }
        }
        const data = await Model.rooms.findMany({
            where: {
                ...filter
            },
            skip: skip,
            take: take
        });
        const total = await Model.rooms.count({
            where: {
                ...filter
            }
        })
        res.status(200).json({
            status: true,
            message: "successfully in getting class data",
            data: {
                room: data,
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
        const id = uuidv4();
        const data = { ...req.body, id: id};
        await Model.rooms.create({data: data});
        res.status(200).json({
            status: true,
            message: 'successfully in created class data'
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
        await Model.rooms.update({
            where: {
                id: req.params.id
            },
            data: data
        });
        res.status(200).json({
            status: true,
            message: 'successful in updated class data'
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
        await Model.rooms.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted class data'
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
        const model = await Model.rooms.findUnique({
            where: {
                id: req.params.id
            },
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get class data',
            data: {
                room: model
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

const getDataSelect = async (req:Request<{}, {}, {}, RoomQueryInterface>, res:Response) => {
    try {
        const query = req.query
        const model = await Model.rooms.findMany({
            where: {
                name: {
                    contains: query.name
                }
            }
        })
        let response:any=[]
        for (const value of model){
            response=[...response, {
                value: value.id,
                label: value.name
            }]
        }
        res.status(200).json({
            status: true,
            message: 'successfully in get Room data',
            data: {
                room: response
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

const getDataSelectSchedule = async (req:Request<{}, {}, {}, RoomQueryInterface>, res:Response) => {
    try {
        const query = req.query
        const end = moment(query.date).add(89, 'minutes')
        const start = moment(query.date).subtract(89, 'minutes')
        const model = await Model.rooms.findMany({
            where: {
                name: {
                    contains: query.name
                },
                schedules: {
                    none: {
                        date: {
                            lte: moment(end).format(),
                            gte: moment(start).format()
                        }
                    }
                }
            },
            orderBy: {
                code: 'asc'
            }
        });
        
        let response:any=[]
        for (const value of model){
            response=[...response, {
                value: value.id,
                label: value.name
            }]
        }
        
        res.status(200).json({
            status: true,
            message: 'successfully in get Room data',
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

export {
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect,
    getDataSelectSchedule
}