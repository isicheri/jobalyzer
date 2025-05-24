import { NextFunction, Request,Response } from "express";


export const checkIsAuthenticated = (req:Request,res:Response,next:NextFunction) => {
    if(req.isAuthenticated()) {
        if(!req.user) req.logout((err) => {
            if(err) next(err);
            res.redirect("/")
        });
        else return next();
    }
    res.render("error",{
         status: 403,
    message: "unauthorised",
    name: "UnauthorisedError",
    stack: process.env.NODE_ENV === "development" ? "no stack" : undefined,
    })
}
