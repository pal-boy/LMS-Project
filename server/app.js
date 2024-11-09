import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());

app.use("/ping",(req,res)=>{
    res.send('/pong');
});

// routes of 3 module

app.all("*",(req,res)=>{
    res.status(404).send("404\nPage not found");
});

export default app;