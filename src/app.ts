import express from "express";
import helmet from "helmet";
import path from "path";
const App = express();

App.use(helmet())
App.set("view engine","ejs")
App.use(express.static(path.join(process.cwd(),"public")))
App.get("/",(req,res) => {
    res.sendFile("index.html")
})


export default App;