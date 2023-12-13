import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { RegisterQueryInterface } from "#root/interfaces/registers/RegisterInterface";

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
            userCreate: res.locals.userId
        }
        const student = await Model.students.create({
            data: studentData
        });

        const registerData = {
            studentId: student.id,
            sessionId: data.sessionId.value,
            packageId: data.packageId.value,
            guidanceTypeId: data.guidanceType.value,
            userCreate: res.locals.userId
        }

        await Model.registers.create({
            data: registerData
        })

        // await Model.$transaction(async (model)=>{
        //     const student = await model.students.create({
        //         data: studentData
        //     });

        //     const registerData = {
        //         university: data.university,
        //         amount: 0
        //     }

        //     await Model.registers.create({
        //         data: {
        //             amount: 0,
        //             students: {
        //                 connect: {id: student.id}
        //             },
        //             sessions: {
        //                 connect: {id: data.sessionId.value}
        //             },
        //             packages: {
        //                 connect: {id: data.packageId.value}
        //             },
        //             guidanceTypes: {
        //                 connect: {id: data.guidanceType.value}
        //             },
        //             schoolYears: {
        //                 connect: {id: '4a95e7b8-494a-4799-9014-76f54aa1bf1c'}
        //             },
        //             users: {
        //                 connect: {id: res.locals.userId}
        //             }
        //         }
        //     });
        // })
        
        res.status(200).json({
            status: true,
            message: 'successfully in created class type data'
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
            }
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

export {
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect
}