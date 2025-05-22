import { PrismaClient } from "../../config/generated/prisma";
const prismaClient = new PrismaClient({
    log: ["query","error","info","warn"]
})
export default prismaClient;