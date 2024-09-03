import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import moment from 'moment-timezone';

const getData = async (req:Request, res:Response) => {
    try {
        const body = req.body;
        let filter:any={}
        
        if(res.locals.userType === "admin"){
            body.tentor ? filter={...filter, tentorId: body.tentor} : null;
        }else{
            filter={
                ...filter,
                tentorId: res.locals.userId
            }   
        }

        let room:any=[];
        let event:any=[];
        if(body.type === "offline"){
            const data = await Model.rooms.findMany()
            for (const value of data) {
                room=[
                    ...room,
                    {
                        id: value.name,
                        title: value.name
                    }
                ]

                const schedule = await Model.schedules.findMany({
                    where: {
                        roomId: value.id,
                        date: {
                            gte: moment(body.startDate+' 00:00:00').format(),
                            lte: moment(body.endDate+' 23:59:00').format(),
                        },
                        method: 'offline',
                        ...filter
                    },
                    include: {
                        courses: true,
                        tentor: true,
                        rooms: true,
                        studyGroups: {
                            include: {
                                guidanceTypes: true
                            }
                        }
                    }
                });

                for (const valueSchedule of schedule) {
                    event=[
                        ...event,
                        {
                            id: valueSchedule.id,
                            title: `${valueSchedule.tentor?.name} | ${valueSchedule?.studyGroups?.name ?? '' } | ${valueSchedule.courses?.name}`,
                            start: moment(valueSchedule.date).tz("Asia/Jakarta").format(),
                            end: moment(valueSchedule.date).tz("Asia/Jakarta").add(90,'minutes').format(),
                            resourceId: valueSchedule.rooms?.name
                        }
                    ]
                }
            }
        }else if(body.type === "online"){
            const data = await Model.schedules.findMany({
                include: {
                    courses: true,
                    tentor: true,
                    studyGroups: {
                        include: {
                            guidanceTypes: true
                        }
                    }
                },
                where: {
                    ...filter,
                    method: 'online',
                    date: {
                        gte: moment(body.startDate+' 00:00:00').format(),
                        lte: moment(body.endDate+' 23:59:00').format(),
                    }
                }
            });
            room=[
                ...room,
                {
                    id: '123',
                    title: 'online'
                }
            ]
            for (let i = 0; i < data.length; i++) {
                event=[
                    ...event,
                    {
                        id: data[i].id,
                        title: `${data[i].tentor?.name} | ${data[i]?.studyGroups?.name ?? '' } | ${data[i].courses?.name}`,
                        start: moment(data[i].date).tz('Asia/Jakarta').format(),
                        end: moment(data[i].date).tz('Asia/Jakarta').add(90, 'minutes').format(),
                        resourceId: '123'
                    }
                ];
            }
        }
        
        res.status(200).json({
            status: true,
            message: 'Success get data schedule (session)',
            data: {room, event}
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "error",
            error: error
        })
    }
}

export { getData }