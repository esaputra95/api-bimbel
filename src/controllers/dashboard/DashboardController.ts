import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Response } from "express";
import moment from "moment";

const getRecordMateri = async ({}, res:Response) => {
    try {
        const date = moment().format()
        
        let filter:any={}
        if(res.locals.userType !== "admin"){
            filter={...filter, tentorId: res.locals.userId}
        }
        const data = await Model.schedules.findMany({
            where: {
                date: {
                    lte: date
                },
                ...filter
            },
            include: {
                scheduleDetails: {
                    include: {
                        recordMateri:  true,
                        students: {
                            select: {
                                id:true,
                                name: true,
                                phone: true
                            }
                        },
                    },
                },
                studyGroups: {
                    select: {
                        name: true
                    }
                },
                tentor: true,
            },
            orderBy: {
                date: 'asc'
            }
        })

        let dataDetail:any = [];
        
        for (const value of data) {
            const scheduleDetail = value?.scheduleDetails ?? [];
            for (let index = 0; index < scheduleDetail.length; index++) {
                if(scheduleDetail[index].recordMateri.length===0){
                    dataDetail=[
                        ...dataDetail,
                        {
                            ...scheduleDetail[index],
                            date: value.date,
                            materiId: value?.courseId,
                            tutor: {
                                name: value.tentor?.name
                            },
                            studyGroupName: value.studyGroups?.name ?? ''
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

const getTotalRecordMateri = async (res:Response) => {
    try {
        const date = moment().format()
        
        let filter:any={}
        if(res.locals.userType !== "admin"){
            filter={...filter, tentorId: res.locals.userId}
        }
        const data = await Model.schedules.findMany({
            where: {
                date: {
                    lte: date
                },
                ...filter
            },
            include: {
                scheduleDetails: {
                    include: {
                        recordMateri:  true,
                        students: {
                            select: {
                                id:true,
                                name: true,
                                phone: true
                            }
                        },
                    },
                },
                studyGroups: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        })

        let dataDetail:any = [];
        let total:number=0
        for (const value of data) {
            const scheduleDetail = value?.scheduleDetails ?? [];
            for (let index = 0; index < scheduleDetail.length; index++) {
                if(scheduleDetail[index].recordMateri.length===0){
                    total+=1
                    dataDetail=[
                        ...dataDetail,
                        {
                            ...scheduleDetail[index],
                            date: value.date,
                            materiId: value?.courseId,
                            studyGroupName: value.studyGroups?.name ?? ''
                        }
                    ]
                }
                
            }
        }
        return total
    } catch (error) {
        return 0
    }
}

const getStudyGroup = async ({}, res:Response) => {
    try {
        const data = await Model.students.findMany({
            include:{
                studyGroupDetails: true
            }
        })

        let newData:any = []
        for (const value of data) {
            if(value.studyGroupDetails.length===0){
                newData=[
                    ...newData,
                    value
                ]
            }
        }
        
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
            data: newData
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

const getTotalStudyGroup = async () => {
    try {
        const data = await Model.students.findMany({
            include:{
                studyGroupDetails: true
            }
        })

        let newData:any = []
        let total:number=0;
        for (const value of data) {
            if(value.studyGroupDetails.length===0){
                total+=1
                newData=[
                    ...newData,
                    value
                ]
            }
        }
        return total
    } catch (error) {
        return 0
    }
}

const getStudyModule = async ({}, res:Response) =>{
    try {
        const data = await Model.registers.findMany({
            where: {
                isModule: 0
            },
            include: {
                students: true,
                packages: true
            }
        })
        
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
            data: data
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

const getTotalStudyModule = async () =>{
    try {
        const total = await Model.registers.count({
            where: {
                isModule: 0
            }
        })
        return total
    } catch (error) {
        return 0
    }
}

const getTotalStudentWillFinish = async ({}, res:Response) => {
    try {
        let filter:any={}
        if(res.locals.userType!=="admin"){
            filter={
                tentorId: res.locals.userId
            }
        }
        const data = await Model.scheduleDetails.count({
            where: {
                schedules : {
                    date: {
                        gte: moment().subtract(5, 'day').format(),
                        lte: moment().format()
                    },
                    ...filter
                }
            }
        });
        return data
    } catch (error) {
        return 0
    }
}

const getTotal = async ({}, res:Response)=> {
    try {
        const studyGroup = await getTotalStudyGroup();
        const recordMateri = await getTotalRecordMateri(res);
        const studyModule = await getTotalStudyModule();
        const studySchedule = await getTotalStudySchedule()
        const studentWillFinish = await getTotalStudentWillFinish({}, res)

        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
            data: {
                studyGroup, recordMateri, studyModule, studySchedule, studentWillFinish
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

const getStudentWillFinish = async ({}, res:Response) => {
    try {
        const data = await Model.scheduleDetails.findMany({
            where: {
                schedules : {
                    date: {
                        gte: moment().subtract(5, 'day').format(),
                        lte: moment().format()
                    }
                }
            },
            include:{
                students: {
                    include: {
                        registers: {
                            include: {
                                sessions: true,
                                packages: true
                            }
                        }
                    }
                }
            }
        });
        
        res.status(200).json({
            status: true,
            message: 'successfully in get study finish',
            data: data
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

const getTotalStudySchedule = async () => {
    try {
        const data = await Model.students.count({
            where:{
                scheduleDetails: {
                    none: {}
                }
            },
        });
        return data
    } catch (error) {
        return 0
    }
}

const getStudySchedule = async ({}, res:Response) => {
    try {
        const data = await Model.students.findMany({
            where:{
                scheduleDetails: {
                    none: {}
                }
            },
        });
        res.status(200).json({
            status: true,
            message: 'successfully in get record material data sds',
            data: data
        })
    } catch (error) {
        
    }
}

export {
    getRecordMateri,
    getStudyGroup,
    getStudyModule,
    getTotal,
    getStudySchedule,
    getStudentWillFinish
}