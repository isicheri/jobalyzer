import express from "express";
import helmet from "helmet";
import path from "path";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";
import limiter from "./config/ratelimiter/ratelimiter";
import { errorMiddleware } from "./middleware/error/error.middleware";
const App = express();

App.use(helmet())
App.use(limiter)
App.use(express.urlencoded({ extended: true }));
App.set("view engine","ejs")
App.use(express.static(path.join(process.cwd(),"public")))
App.get("/",(req,res) => {
    res.sendFile("index.html")
})
App.use((req, res, next) => {
  console.warn(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).render('404');
});

App.use(errorMiddleware)
export default App;

