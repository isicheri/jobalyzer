import { Router } from "express";
import { userHome } from "./user.controller";
import { checkIsAuthenticated } from "../../middleware/auth/auth";

const userRouter = Router()
userRouter.use(checkIsAuthenticated);
userRouter.get("/home",userHome);


export default userRouter;