import Model from "#root/services/PrismaService";
import moment from "moment-timezone";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { TentorNotAvailableQueryInterface} from "#root/interfaces/schedules/TentorNotAvailableInterface";

const getData = async (req:Request<{}, {}, {}, TentorNotAvailableQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
        const page:number = parseInt(query.page ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        let filterUser:any= []
        query.name ? filterUser = [...filterUser, {name: { contains: query.name }}] : null
        let filter:any={}
        if(res.locals.userType==="tentor"){
            filter = {...filter, tentorId: { contains: res.locals.userId}};
        }
        if(filterUser.length > 0){
            filterUser = {
                OR: [
                    ...filterUser
                ]
            }
        }
        const data = await Model.tentorNotAvailable.findMany({
            include: {
                userTentor: true
            },
            where: {
                ...filter,
                userTentor: {
                    ...filterUser
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: skip,
            take: take
        });
        const total = await Model.tentorNotAvailable.count({
            where: {
                userTentor: {
                    ...filterUser
                }
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting Tentor Not Available data",
            data: {
                TentorNotAvailable: data,
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
        const data = { 
            ...req.body,
            startDate: moment(req.body.startDate).format(),
            untilDate: moment(req.body.untilDate).format(),
        };
        delete data.tentor
        await Model.tentorNotAvailable.create({data: {...data, userCreate: res?.locals?.userId ?? ''}});
        res.status(200).json({
            status: true,
            message: 'successfully in created Tentor Not Available data'
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
        const data = { 
            ...req.body,
            startDate: moment(req.body.startDate).format(),
            untilDate: moment(req.body.untilDate).format(),
        };
        delete data.tentor
        delete data.userTentor
        await Model.tentorNotAvailable.update({
            where: {
                id: req.params.id
            },
            data: data
        });
        res.status(200).json({
            status: true,
            message: 'successful in updated Tentor Not Available data'
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
        await Model.tentorNotAvailable.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted Tentor Not Available data'
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
        const model = await Model.tentorNotAvailable.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                userTentor: true
            }
        })
        const data = {
            ...model,
            tentor: {
                label: model?.userTentor?.name,
                value: model?.userTentor?.id
            }
        }
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get Tentor Not Available data',
            data: {
                TentorNotAvailable: data
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
    getDataById
}