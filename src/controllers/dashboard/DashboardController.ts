import { handleValidationError } from "#root/helpers/handleValidationError";
import Model from "#root/services/PrismaService";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";

const getRecordMateri = async (req:Request, res:Response) => {
    try {
        const query = req.body;
        const date = moment().format()
        const data = await Model.schedules.findFirst({
            where: {
                date: {
                    lte: date
                },
                tentorId: res.locals.userId
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
                        }
                    },
                }
            },
            orderBy: {
                date: 'asc'
            }
        })
        
        const scheduleDetail = data?.scheduleDetails ?? [];
        let dataDetail:any = [];
        for (let index = 0; index < scheduleDetail.length; index++) {
            if(scheduleDetail[index].recordMateri.length===0){
                dataDetail=[
                    ...dataDetail,
                    {
                        ...scheduleDetail[index],
                        materiId: data?.courseId
                    }
                ]
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
        console.log({error});
        
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
    getRecordMateri
}