import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import messageRouter from './routes/message.route.js'
const app = express()
dotenv.config({})
app.get('/',(_,res)=>{
    return res.status(200).json({
        message : "I am coming from backend !!!",
        success : true
    })
})
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions))
app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/message',messageRouter)
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${process.env.PORT}`);
})