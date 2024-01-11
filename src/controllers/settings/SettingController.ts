import { errorType } from "#root/helpers/errorType";
import Model from "#root/services/PrismaService";
import { Request, Response } from "express";

const getSetting = async (req:Request, res:Response) => {
    try {
        const query = req.query
        let filter:any={};
        if(query.name){
            filter={
                ...filter,
                name: query.name
                
            }
        }
        const data = await Model.setting.findMany({
            where: {
                ...filter
            }
        });
        let label:any=[]
        let newData:any=[]
        for (const value of data) {
            newData=[
                ...newData,
                {
                    name: value.id,
                    value: value.value,
                    label: value.name
                }
            ]
            label=[
                ...label,
                value.name
            ]
        }
        
        res.status(200).json({
            status: true,
            message: "successfully in getting Setting data",
            data: {
                setting: newData,
                label: label
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

const updateData = async (req:Request, res:Response) => {
    try {
        for (const value of req.body.form) {
            await Model.setting.update({
                where: {
                    id: value.name
                },
                data: {
                    value: value.value
                }
            })
        }
        res.status(200).json({
            status: true,
            message: "successfully update Setting data"
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


const uploadImage = async (req:Request, res:Response) => {
    res.status(200).json({
        code:1,
        status:200,
        message: "Successfully upload",
        data: req.file?.filename ?? ''
    })
}

const updateIcon = async (req:Request, res:Response) => {
    try {
        const data = await Model.setting.findFirst({
            where: {
                name: 'icon'
            }
        })

        await Model.setting.update({
            where: {
                id: data?.id
            },
            data : {
                value: req.body.image
            }
        });

        res.status(200).json({
            code:1,
            status:200,
            message: "Successfully upload file",
            data: req.file?.filename ?? ''
        })
    } catch (error) {
        
    }
}

export {
    getSetting,
    updateData,
    uploadImage,
    updateIcon
}