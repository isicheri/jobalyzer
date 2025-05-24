import { Router } from "express";
import { userHome } from "./user.controller";

const userRouter = Router()

userRouter.get("/home",userHome);


export default userRouter;