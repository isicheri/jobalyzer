import express from "express";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import pgSimple from "connect-pg-simple";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import { Pool } from "pg";
import limiter from "./config/ratelimiter/ratelimiter";
import { errorMiddleware } from "./middleware/error/error.middleware";
import indexRouter from "./routes";
import passport from "passport";
const App = express();
const PgSession = pgSimple(session);
dotenv.config({path: ".env"});

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
})

App.use(helmet());
App.use(limiter);
App.use(cookieParser());
App.use(express.json())
App.use(express.urlencoded({ extended: true }));
App.set("views",path.join(process.cwd(),"views"));
App.set("view engine","ejs");
App.use(express.static(path.join(process.cwd(),"public")));

App.use(session({
  store: new PgSession({
    pool: pgPool,
    tableName: 'session',          
    createTableIfMissing: true     
  }),
  secret: process.env.SESSION_SECRET as string, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    secure: process.env.NODE_ENV === 'production',
  }
}));
App.use(csurf())
App.use(passport.initialize())
App.use(passport.authenticate("session"))
App.use((req,res,next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
})

App.use("/",indexRouter);
App.get("/",(req,res) => {
    res.sendFile("index.html")
});
App.use((req, res, next) => {
  console.warn(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).render('404');
});

App.use(errorMiddleware);
export default App;

