import z from "zod";


export const FormValidation = z.object({
    desc: z.string().trim().toLowerCase()
})