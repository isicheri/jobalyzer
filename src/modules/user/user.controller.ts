import { Request,Response } from "express"
import prismaClient from "../../utils/prismaClient/prisma.clent"
import { User } from "../../config/generated/prisma";

export const userHome = async(req:Request,res:Response) => { 
   
   const userId = (req.user as User)?.id;

    const user = await  prismaClient.user.findFirst({where: {id: userId!}})

   return res.render("userHome.ejs",{
     username: user?.username,
     avatar: user?.avatarUrl
   });
}