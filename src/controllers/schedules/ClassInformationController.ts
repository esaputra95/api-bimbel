import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import moment from 'moment-timezone';

const getData = async (req:Request, res:Response) => {
    try {
        const body = req.body;
        let filter:any=[]
        body.tentorId ? filter=[...filter, {tentorId: body.tentorId}] : null;
        body.classType ? filter=[...filter, {method: body.classType}] : null;

        let room:any=[];
        let event:any=[];

        if(body.type === "offline"){
            const data = await Model.rooms.findMany({
                include: {
                    schedules: {
                        include: {
                            courses: true,
                            tentor: true,
                            studyGroups: {
                                include: {
                                    guidanceTypes: true
                                }
                            }
                        }
                    }
                },
                where: {
                    schedules: {
                        every: {
                            ...filter,
                            method: 'offline'
                        }
                    }
                }
            });
    
            for (let i = 0; i < data.length; i++) {
                room=[
                    ...room,
                    {
                        id: data[i].id,
                        title: data[i].name
                    }
                ]
                const schedule = data[i].schedules
                for (let k = 0; k < schedule.length; k++) {
                    event=[
                        ...event,
                        {
                            id: schedule[k].id,
                            title: schedule[k].tentor.name,
                            start: moment(schedule[k].date).tz("Asia/Jakarta").format(),
                            end: moment(schedule[k].date).tz("Asia/Jakarta").add(90,'minutes').format(),
                            resourceId: schedule[k].roomId
                        }
                    ]
                }
            }
        }else{
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
                    method: 'online'
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
                        title: data[i].tentor.name,
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
        console.log({error});
        res.status(500).json({
            status: false,
            message: "error",
            error: error
        })
    }
}

export { getData }