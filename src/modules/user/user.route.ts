import { Router } from "express";
import { userDescription, userHome } from "./user.controller";
import { checkIsAuthenticated, stopCache } from "../../middleware/auth/auth";
import { asyncCatcher } from "../../utils/asyncCatcher/asyncCatcher";

const userRouter = Router()
userRouter.use(checkIsAuthenticated);
userRouter.use(stopCache)
userRouter.get("/home",asyncCatcher(userHome));
userRouter.post("/upload-description",asyncCatcher(userDescription))


export default userRouter;