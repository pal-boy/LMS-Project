import app from "./app.js";
import { config } from "dotenv";
import connectionToDB from "./db_config/db_connection.js";
import { v2 } from "cloudinary";
config();

const PORT = process.env.PORT || 5000;

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`App is running at http://localhost:${PORT}`);
})