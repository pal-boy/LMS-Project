import app from "./app.js";
import { config } from "dotenv";
import connectionToDB from "./db_config/db_connection.js";
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`App is running at http:localhost:${PORT}`);
})