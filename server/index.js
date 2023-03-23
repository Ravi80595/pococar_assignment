import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRoutes from './Routes/users.js'
import otherRoutes from './Routes/others.js'
import { authMiddleware } from "./Middelwares/authMiddelware.js"


dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())


app.use('/auth',userRoutes)
app.use('/user',authMiddleware ,otherRoutes)

const PORT = process.env.PORT || 3001
mongoose.set("strictQuery", false);
let connections = mongoose.connect(process.env.MONGO_URL)


app.listen(PORT,()=>{
    try{
        connections
        console.log(`Server Connected With DataBase ${PORT}`)
    }
    catch(err){
    console.log("Somethning Wents Wrong",err)
    }
})