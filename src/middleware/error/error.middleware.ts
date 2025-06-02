import { Request,Response,NextFunction } from "express"
import { HttpErrorMain } from "../../utils/error/httpError"

export const errorMiddleware = (err:HttpErrorMain,req:Request,res:Response,next:NextFunction):void => {
  const statusCode = err.statusCode || 500;
  const errorJson =  {status: statusCode,message: err.message || "Something went wrong",name: err.name || "InternalServerError",stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    }
if (req.accepts("html")) {
   return res.status(statusCode).render("error",errorJson);
  }
res.status(statusCode).json(errorJson)
}