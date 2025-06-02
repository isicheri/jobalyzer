import { Request,Response,NextFunction } from "express";

type fntype = (req:Request,res:Response) => Promise<void>;
export const asyncCatcher = (method:fntype) => async (req:Request,res:Response,next:NextFunction) => {
    try {
        await method(req,res)
    } catch (error) {
        next(error)
    }
}