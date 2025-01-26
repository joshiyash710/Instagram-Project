import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
dotenv.config()
const app = express()
app.get('/',(req,res)=>{
    return res.status(200).json({
        message : 'I am coming from backend !!!',
        success : true
    })
})
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended : true}))
const corsOption = {
    origin : 'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOption))
// APIs

app.use("/api/v1/user",userRoute)
const port = process.env.PORT || 3000
app.listen(port,()=>{
    connectDB()
    console.log(`Server is listening at port ${port}`);
    
})
