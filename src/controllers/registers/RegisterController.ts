import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { RegisterQueryInterface } from "#root/interfaces/registers/RegisterInterface";
import moment from "moment";

const getData = async (req:Request<{}, {}, {}, RegisterQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
        const page:number = parseInt(query.page ?? 1 );
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
                createdAt: 'desc'
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
        const studentData = {
            name: data.name,
            email: data.email,
            studyProgram: data.studyProgram,
            phone: data.phone,
            school: data.school,
            placeBirth: data.placeBirth,
            dateBirth: data.dateBirth,
            country: data.country,
            province: data.province,
            city: data.city,
            address: data.address,
            gender: data.gender,
            classGrade: data.classGrade,
            university: data.university,
            statusStudy: data.statusStudy,
            parentName: data.parentName,
            parentPhone: data.parentPhone,
            image: data.image,
        }
        const student = await Model.students.create({
            data: {
                ...studentData
            }
        });
        const schoolYear = await Model.schoolYears.findFirst({
            where: {
                startYear: {
                    lte: moment().format()
                },
                endYear: {
                    gte: moment().format()
                }
            }
        })

        const registerData = {
            studentId: student.id,
            sessionId: data.sessionId.value,
            packageId: data.packageId.value,
            guidanceTypeId: data.guidanceType.value,
            schoolYearId: schoolYear?.id ?? '',
            location: data.location
        }

        await Model.registers.create({
            data: {
                ...registerData
            }
        })
        
        res.status(200).json({
            status: true,
            message: 'successfully in created register data'
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


const uploadImage = async (req:Request, res:Response) => {
    res.status(200).json({
        code:1,
        status:200,
        message: "Successfully get data file",
        data: req.file?.filename ?? ''
    })
}

export {
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect,
    uploadImage
}