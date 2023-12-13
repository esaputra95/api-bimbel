import TimeList from "#root/helpers/timeList";
import { ClassInformationQuery } from "#root/interfaces/schedules/ClassInformationInterface";
import Model from "#root/services/PrismaService";
import { Request, Response } from "express";
import moment from "moment";


const getData = async (req:Request<{}, {}, {}, ClassInformationQuery>, res:Response) => {
    try {
        const query = req.query;
        let filter:any=[]
        query.tentorId ? filter=[...filter, {tentorId: query.tentorId}] : null;
        query.classType ? filter=[...filter, {method: query.classType}] : null;

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
                        ...filter
                    }
                }
            }
        })
        let dataSchedule:any = []
        for (let i = 0; i < data.length; i++) {
            let jadwal:any  =[]
            let loop = 0
            for (let j = 0; j < TimeList.length; j++) {
                const schedule = data[i].schedules
                for (let k = 0; k < schedule.length; k++) {
                    const date1 = moment(schedule[k].date).format('HH:mm:ss')
                    const date2 = moment(schedule[k].date).add(89, 'minutes').format('HH:mm:ss')
                    const date = moment('2023-12-11 '+TimeList[j]).format('HH:mm:ss');
                    if(loop>0){
                        loop--
                        continue 
                    }
                    if((schedule.length-1)===k && !loop){
                        jadwal=[...jadwal,
                            {
                                status: false,
                                time: TimeList[j],
                            }
                        ];
                    }
                    // console.log({date});
                    // console.log({date1});
                    // console.log({date2});
                    
                    if(date>=date1 && date<date2){
                    
                        jadwal=[...jadwal,
                            {
                                status: true,
                                start: date1,
                                finish: moment(schedule[k].date).add(90, 'minutes').format('HH:mm:ss'),
                                tentor: schedule[k].tentor.name,
                                type: schedule[k].studyGroups.guidanceTypes?.name ?? 'Regular',
                                name: schedule[k].studyGroups.name,
                                time: TimeList[j],
                                cols: 4
                            }
                        ];
                        loop=4
                        break;
                    }
                }
                // break
            }
            dataSchedule=[
                ...dataSchedule, 
                {room: data[i].name, data: jadwal}
            ]
        }
        

        let dataFinal:any = [];
        for (let index = 0; index < TimeList.length; index++) {
            let dataRow:any=[{
                status:false,
                time: TimeList[index]
            }]
            let d=0
            for (let indexSchedule = 0; indexSchedule < dataSchedule.length; indexSchedule++) {
                dataRow=[...dataRow,
                    {
                        ...dataSchedule[indexSchedule].data[index],
                        name: dataSchedule[indexSchedule].room
                    }
                ]
                
            }
            dataFinal=[...dataFinal, dataRow]
            
        }
        
        res.status(200).json({
            status: true,
            message: 'Success get data schedule (session)',
            data: dataFinal
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