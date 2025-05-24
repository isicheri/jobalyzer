import { User as PrismaUser } from "../../config/generated/prisma";

declare global {
    namespace Express {
     interface User extends PrismaUser {}
    }
}