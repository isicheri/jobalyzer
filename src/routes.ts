import { Router } from "express";
import authRouter from "./modules/auth/auth.routes";
const indexRouter = Router();
indexRouter.use("/auth",authRouter)
export default indexRouter;