import z from "zod";


export const FormValidation = z.object({
    desc: z.string().trim().toLowerCase().min(30,{message: "cannot be lesser than 30 characters"})
})