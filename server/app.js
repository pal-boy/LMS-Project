import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));

app.use("/ping",(req,res)=>{
    res.send('/pong');
});

// routes of 3 module
app.use('/api/v1/user' , userRouter);

app.all("*",(req,res)=>{
    res.status(404).send("404\nPage not found");
});

app.use(errorMiddleware);

export default app;