import { Router } from "express";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.route";
const indexRouter = Router();
indexRouter.use("/auth",authRouter)
indexRouter.use("/user",userRouter);
export default indexRouter;