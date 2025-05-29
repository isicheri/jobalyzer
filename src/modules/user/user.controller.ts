import { Request,Response } from "express"
import prismaClient from "../../utils/prismaClient/prisma.clent"
import { User } from "../../config/generated/prisma";
import { FormValidation } from "./validation/user.validation";
import { HttpErrorMain } from "../../utils/error/httpError";

export const userHome = async(req:Request,res:Response) => { 
   const userId = (req.user as User)?.id;
    const user = await  prismaClient.user.findFirst({where: {id: userId!}})
   return res.render("userHome.ejs",{
     username: user?.username,
     avatar: user?.avatarUrl
   });
}


export const userDescription = async(req:Request,res:Response) => {
const parsedData = await FormValidation.safeParseAsync(req.body);
if(!parsedData.success) {
  throw new HttpErrorMain(parsedData.error.message,400);
}


}

export const getAllUserDesc = (req:Request,res:Response) => {

}