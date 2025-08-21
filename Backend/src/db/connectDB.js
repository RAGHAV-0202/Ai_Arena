import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

async function ConnectDB(){
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Connected to the DB")
    }catch(err){
        console.log(`Error while connecting to the Database , Error : ${err}`)
    }
}

export {ConnectDB}