import { Request,response,Response } from "express"
import prismaClient from "../../utils/prismaClient/prisma.clent"
import { User } from "../../config/generated/prisma";
import { FormValidation } from "./validation/user.validation";
import { HttpErrorMain } from "../../utils/error/httpError";
import OpenAI from "openai";
import { promises } from "dns";

export const userHome = async(req:Request,res:Response):Promise<void> => { 
    const userId = (req.user as User)?.id;
    const user = await  prismaClient.user.findFirst({where: {id: userId!}})
    res.render("userHome.ejs",{
     username: user?.username,
     avatar: user?.avatarUrl
   });
}


export const userDescription = async(req:Request,res:Response):Promise<void | any> => {
try {
  const parsedData = await FormValidation.safeParseAsync(req.body);
if(!parsedData.success) {
  return res.status(400).json({
    message: parsedData.error.message,
    status: 400,
    name: parsedData.error.name
  })
}
// Prompt --> Extract the following from this job description: 0) The name of the company 1) Seniority Level, 2) Minimum Experience (in years), 3) Required Technical Skills (list), 4) Optional Skills
const AiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const aiResponse = await AiClient.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
  content: "You are a job description analyzer. Extract seniority level (eg.,senior,mid,junior), experience required (in years), and key technial skills(an array of strings) from the given job description. Respond in JSON format."
    },
    {
      role: "user",
      content: parsedData.data.desc
    }
  ]
})

 return res.status(200).json({
    message: "Description received successfully",
    data: parsedData.data,
    aiResponse: aiResponse.choices[0].message.content
  });
} catch (error) {
  console.log(error)
const status = error instanceof HttpErrorMain ? error.statusCode : 500;
return res.status(status).json({
  message: error instanceof HttpErrorMain ? error.message : "unknown message",
  err: error
})  
}
}

export const getAllUserDesc = (req:Request,res:Response) => {

}