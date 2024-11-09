import mongoose from "mongoose";

mongoose.set('strictQuery' , false);

const connectionToDB = async()=>{
 try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    if(connection){
        console.log(`Database connected successfully : ${connection.host}`);
    }
 } catch (error) {
    console.log("MongoDB connection eroor : ",error);
    process.exit(1);
 }
};

export default connectionToDB;