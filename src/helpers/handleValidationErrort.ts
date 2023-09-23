import { Prisma } from "@prisma/client";
import { Response } from "express";

export const handleValidationError = async (error: Prisma.PrismaClientKnownRequestError) => {
    let status=500;
    let message
    let path
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        status=400
        if (error.code === 'P2002') {
            message= `${error.meta?.target} has been used, please enter another ${error.meta?.target}`
            path = error.meta?.target ?? ''
        }else if(error.code === 'P2003'){
            message= `The data is already used in another table: Foreign key constraint "${error.meta?.field_name}"`
            path= error.meta?.field_name ?? ''
        }else if(error.code === 'P2025'){
            message= 'data not exist'
        }else{
            message= `${error}`
        }
    }else{
        message= `${error}`
    }
    return { 
        status, 
        message : {
            msg: message,
            path: path
        }
    }
}