import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { handleValidationError } from "#root/helpers/handleValidationError";
import { errorType } from "#root/helpers/errorType";
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

        if(res.locals.userType !== "admin"){
            filter={
                ...filter, 
                userId: res.locals.userId
            }
        }

        const data = await Model.payrolls.findMany({
            where: {
                ...filter
            },
            include: {
                userTentor: {
                    select: {
                        name:true,
                        id:true,
                        email: true,
                        username: true
                    }
                }
            },
            orderBy: {
                id: 'asc'
            },
            skip: skip,
            take: take
        })
        const total = await Model.payrolls.count({
            where: {
                ...filter
            }
        })
        
        res.status(200).json({
            status: true,
            message: "successfully in getting Payroll data",
            data: {
                payroll: data,
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
        const data = req.body;

        let dataPayroll = {
            userId: data.userId,
            userCreate: res.locals.userId,
            basicSalary: data.basicSalary.replace(/,/g, ""),
            sessionSalary: data.sessionSalary.replace(/,/g, ""),
            total: data.total.replace(/,/g,""),
            month: data.month
        }

        let dataPayrollDetails:any = [];
        const dataDetail = data.payrollDetails ?? [];
        for (let index = 0; index < dataDetail.length; index++) {
            dataPayrollDetails = [
                ...dataPayrollDetails,
                {
                    scheduleId: dataDetail[index].scheduleId,
                    price: dataDetail[index].price,
                    userCreate: res.locals.userId
                }
            ]
        }

        await Model.payrolls.create({
            data: {
                ...dataPayroll,
                payrollDetails: {
                    create: dataPayrollDetails
                }
            }
        })
        
        res.status(200).json({
            status: true,
            message: 'successfully in created Payroll data'
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
        const data = req.body;

        let dataPayroll = {
            userId: data.userId,
            userCreate: res.locals.userId,
            basicSalary: data.basicSalary.replace(/,/g, ""),
            sessionSalary: data.sessionSalary.replace(/,/g, ""),
            total: data.total.replace(/,/g,""),
            month: data.month
        }

        let dataPayrollDetails:any = [];
        const dataDetail = data.salaryDetails ?? [];
        for (let index = 0; index < dataDetail.length; index++) {
            dataPayrollDetails = [
                ...dataPayrollDetails,
                {
                    scheduleId: dataDetail[index].scheduleId,
                    price: dataDetail[index].price,
                    userCreate: res.locals.userId
                }
            ]
        }

        await Model.payrolls.update({
            data: {
                ...dataPayroll,
                payrollDetails: dataPayrollDetails
            },
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: true,
            message: 'successful in updated Payroll data'
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
        await Model.payrolls.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: false,
            message: 'successfully in deleted Payroll data'
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
        const model = await Model.payrolls.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                payrollDetails:{
                    include: {
                        schedules: true
                    }
                }
            }
        })
        if(!model) throw new Error('data not found')
        res.status(200).json({
            status: true,
            message: 'successfully in get Payroll data',
            data: {
                payroll: model
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

const getDataPayrollSession = async (req:Request, res:Response) => {
    try {
        const classType = await Model.classTypes.findMany();
        let payrollData:any = []
        let salary:number=0
        for (const value of classType) {
            const schedule = await Model.schedules.findMany({
                where: {
                    date: {
                        gte: moment(req.body.month).startOf('month').format(),
                        lte: moment(req.body.month).endOf('month').format()
                    },
                    scheduleType: value.id,
                    scheduleDetails:{
                        some: {
                            recordMateri: {
                                some: {
                                    id: {
                                        not: ''
                                    },
                                    tentorId: req.body.tentorId+''
                                }
                            }
                        }
                    }
                },
                include: {
                    scheduleDetails: {
                        include: {
                            recordMateri: true
                        }
                    }
                }
            });
            for (const valueSchedule of schedule) {
                salary+=parseFloat(value.price+'');
                payrollData=[
                    ...payrollData,
                    {
                        scheduleId: valueSchedule.id,
                        time: moment(valueSchedule.date).format('DD-MM-YYYY'),
                        type: value.name,
                        price: value.price
                    }
                ]
            }
        }
        
        res.status(200).json({
            status: true,
            message: 'successfully in get Payroll data sds',
            data: {
                salary,
                payrollData
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

const getPayrollDetail = async (req:Request, res:Response) => {
    try {
        const data = await Model.studyGroups.findMany({
            include: {
                schedules: {
                    include: {
                        scheduleDetails: {
                            include: {
                                recordMateri: true,
                            }
                        },
                        classTypes: true
                    }
                },
                guidanceTypes: true,
            },
            where: {
                schedules: {
                    some: {
                        payrollDetails: {
                            some: {
                                payrollId: req.params.id
                            }
                        }
                    }
                }
            }
        })
        
        let newData:any=[]
        let total:number=0;
        let number:number=1;
        for (const value of data) {
            let time:any=[];
            let detail={
                price:0,
                studentTotal:0
            };
            for (const val of value.schedules) {
                detail= {
                    ...detail,
                    price: parseFloat(val.classTypes?.price+'') ,
                    studentTotal: val.scheduleDetails.length
                }
                for (const v of val.scheduleDetails) {
                    if(v.recordMateri.length>0){
                        time =[
                            ...time,
                            moment(v.recordMateri[0].date).format('DD')
                        ];
                        break
                    }
                }
            }
            total+=detail.price*time.length;
            newData=[
                ...newData,
                [ 
                    number,
                    value.name,
                    value.guidanceTypes?.name,
                    time.join(','),
                    parseFloat(time.length).toLocaleString('id-id'),
                    parseFloat(detail.price+'').toLocaleString('id-id'),
                    detail.studentTotal,
                    parseFloat((detail.price*time.length)+'').toLocaleString('id-id'),
                    ''
                ]
            ]
            number++
        }

        const basic = await Model.payrolls.findFirst({
            where: {
                id: req.params.id
            },
            include: {
                userTentor: true
            }
        })
        total+=parseInt(basic?.basicSalary+'')
        newData=[
            ...newData,
            ['Gaji Pokok', '', '', '', '', '','', parseFloat(basic?.basicSalary+'').toLocaleString('id-id'), ''],
            ['Total', '', '', '', '', '', '', parseFloat((total)+'').toLocaleString('id-id'), ''],
        ]

        res.status(200).json({
            status: true,
            message: 'successfully in get Payroll data sds',
            data: newData,
            tentor: [
                [`Nama Tentor : ${basic?.userTentor?.name}`],
                [`Bulan : ${moment(basic?.month+'-01').format('MMMM YYYY')}`],
            ]
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
    getDataPayrollSession,
    getPayrollDetail
}