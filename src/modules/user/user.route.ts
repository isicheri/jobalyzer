import { Router } from "express";
import { userHome } from "./user.controller";
import { checkIsAuthenticated, stopCache } from "../../middleware/auth/auth";

const userRouter = Router()
// userRouter.use(checkIsAuthenticated);
userRouter.use(stopCache)
userRouter.get("/home",userHome);


export default userRouter;