import { Request,Response } from "express"
import prismaClient from "../../utils/prismaClient/prisma.clent"

export const userHome = async(req:Request,res:Response) => {    
//     const userId = req.user?.id;

//     const user = await  prismaClient.user.findFirst({where: {id: userId!}})

   return res.render("userHome.ejs",{
    id: req.user?.id
   });
}