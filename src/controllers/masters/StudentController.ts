import { errorType } from "#root/helpers/errorType"
import { handleValidationError } from "#root/helpers/handleValidationError"
import { StudentInterface } from "#root/interfaces/masters/StudentInterface"
import Model from "#root/services/PrismaService"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';

const getData = async (req:Request, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit+'' ?? 2 )
        const page:number = parseInt(query.page+'' ?? 1 );
        const skip:number = (page-1)*take
        // FILTER
        let filter:any= []
        query.name ? filter = [...filter, {name: { contains: query.name }}] : null
        query.code ? filter = [...filter, {code: { contains: query.code }}] : null
        if(filter.length > 0){
            filter = {
                OR: [
                    ...filter
                ]
            }
        }
        const data = await Model.students.findMany({
            where: {
                ...filter
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: skip,
            take: take
        });
        const total = await Model.students.count({
            where: {
                ...filter
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting students data",
            data: {
                student: data,
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
        const id = uuidv4()
        const data = { ...req.body, id: id};
        await Model.students.create({data: {...data, userCreate: res?.locals?.userId ?? ''}});
        res.status(200).json({
            status: true,
            message: 'successfully in created student data'
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

const updateData = async (req:Request<StudentInterface, {}, StudentInterface , {}>, res:Response) => {
    try {
        const data = { ...req.body};
        await Model.students.update({
            where: {
                id: req.params.id
            },
            data: {
                name: data.name,
                studyProgram: data.studyProgram,
                phone: data.phone,
                school: data.school,
                placeBirth: data.placeBirth,
                dateBirth: data.dateBirth,
                address: data.address,
                gender: data.gender,
                email: data.email,
                classGrade: data.classGrade,
                university: data.university,
                country: data.country,
                province: data.province,
                city: data.city,
                parentName: data.parentName,
                parentPhone: data.parentPhone
            }
        });
        res.status(200).json({
            status: true,
            message: 'successful in updated student data'
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
        await Model.students.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted students data'
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
        const model = await Model.students.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                studyGroupDetails: {
                    include: {
                        studyGroups: true
                    }
                },
                registers: {
                    include: {
                        guidanceTypes: true,
                        packages: true,
                        classMaster: true,
                        schoolYears: true,
                        sessions: true
                    }
                }
            }
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get student data',
            data: {
                student: model
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

const getDataSelect = async (req:Request, res:Response) => {
    try {
        const query = req.query
        const model = await Model.students.findMany({
            where: {
                name: {
                    contains: query.name+''
                },
                registers: {
                    some: {
                        status: 1
                    }
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
            message: 'successfully in get student data',
            data: {
                student: response
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

const getDataSelectAll = async (req:Request, res:Response) => {
    try {
        const query = req.query
        const model = await Model.students.findMany({
            where: {
                name: {
                    contains: query.name+''
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
            message: 'successfully in get student data',
            data: {
                student: response
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
    getDataById,
    postData,
    deleteData,
    updateData,
    getDataSelect,
    getDataSelectAll
}