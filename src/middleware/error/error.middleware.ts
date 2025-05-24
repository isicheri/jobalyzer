import { Request,Response,NextFunction } from "express"
import { HttpErrorMain } from "../../utils/error/httpError"

export const errorMiddleware = (err:HttpErrorMain,req:Request,res:Response,next:NextFunction) => {
  return res.render("error", {
    status: err.statusCode || 500,
    message: err.message || "Something went wrong",
    name: err.name || "InternalServerError",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
})
}