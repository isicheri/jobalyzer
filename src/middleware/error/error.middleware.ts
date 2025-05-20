import { Request,Response,NextFunction } from "express"
import { HttpErrorMain } from "../../utils/error/httpError"

export const errorMiddleware = (err:HttpErrorMain,req:Request,res:Response,next:NextFunction) => {
   res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    name: err.name
   }).render("error", {
    message: err.message || "Something went wrong",
    name: err.name || "InternalServerError",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
})
}