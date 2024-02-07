import { errorType } from "#root/helpers/errorType";
import Model from "#root/services/PrismaService";
import { Response } from "express";

const getData = async ({}, res:Response) => {
    try {
        const data = await Model.users.findFirst({
            where: {
                id: res.locals.userId
            },
            include: {
                tentorSkills: {
                    include: {
                        courses: true
                    }
                }
            }
        })
        res.status(200).json({
            status: true,
            message: "successfully in getting Profile data",
            data: {
                profile: data,
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

export { getData }