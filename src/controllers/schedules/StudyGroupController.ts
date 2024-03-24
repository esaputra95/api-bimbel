import Model from "#root/services/PrismaService";
import moment from "moment-timezone";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
import { 
    StudyGroupInterface,
    StudyGroupPostInterface, 
    StudyGroupQueryInterface
} from "#root/interfaces/schedules/StudyGroupInterface";

const getData = async (req:Request<{}, {}, {}, StudyGroupQueryInterface>, res:Response) => {
    try {
        const query = req.query;
        // PAGING
        const take:number = parseInt(query.limit ?? 2 )
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
        const data = await Model.studyGroups.findMany({
            include: {
                classMaster: true,
                guidanceTypes: true,
                schedules: {
                    select: {
                        _count: true
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
        const total = await Model.studyGroups.count({
            where: {
                ...filter
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting Study Group data",
            data: {
                studyGroup: data,
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

const postData = async (req:Request<{}, {}, StudyGroupPostInterface, {}>, res:Response) => {
    try {
        const data = req.body.studyGroup;
        const dataStudyGroup = req.body.studyGroupDetails
        await Model.studyGroups.create({
            data: {
                ...data,
                studyGroupDetails: {
                    create: [
                        ...dataStudyGroup
                    ]
                }
            },
        })
        res.status(200).json({
            status: true,
            message: 'successfully in created Study Group data'
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

const updateData = async (req:Request<{}, {}, StudyGroupPostInterface, {}>, res:Response) => {
    try {
        const dataStudyGroup = req.body.studyGroup
        const dataStudyGroupDetail = req.body.studyGroupDetails
        await Model.studyGroups.update({
            where: {
                id: dataStudyGroup.id
            },
            data: {
                id: dataStudyGroup.id,
                classId: dataStudyGroup.classId,
                guidanceTypeId: dataStudyGroup.guidanceTypeId,
                name: dataStudyGroup.name,
                total: dataStudyGroup.total
            },
        });
        for (const value of dataStudyGroupDetail) {
            await Model.studyGroupDetails.update({
                where:{
                    id: value.id
                },
                data: {
                    studentId: value.studentId,
                }
            })
        }
        res.status(200).json({
            status: true,
            message: 'successful in updated Study Group data'
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

const deleteData = async (req:Request, res:Response)=> {
    try {
        await Model.studyGroups.delete({
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
        const model = await Model.studyGroups.findUnique({
            include: {
                guidanceTypes: true,
                classMaster: true,
            },
            where: {
                id: req.params.id
            },
        });
        const detail = await Model.studyGroupDetails.findMany({
            where: {
                studyGroupId: model?.id
            }
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get Study Group data',
            data: {
                studyGroup: model,
                studyGroupDetails: detail
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

const getDataSelect = async (req:Request<{}, {}, {}, StudyGroupInterface>, res:Response) => {
    try {
        const query = req.query
        const model = await Model.studyGroups.findMany({
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
            message: 'successfully in get studyGroup data',
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


export {
    getData,
    postData,
    updateData,
    deleteData,
    getDataById,
    getDataSelect
}