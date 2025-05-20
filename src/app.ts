import express from "express";
import helmet from "helmet";
import path from "path";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";
import limiter from "./config/ratelimiter/ratelimiter";
const App = express();

App.use(helmet())
App.use(limiter)
App.use(express.urlencoded({ extended: true }));
App.set("view engine","ejs")
App.use(express.static(path.join(process.cwd(),"public")))
App.get("/",(req,res) => {
    res.sendFile("index.html")
})

export default App;