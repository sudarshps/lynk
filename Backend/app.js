import express from 'express'
import 'dotenv/config'
import userRoute from './routes/userRoutes.js'
import articleRoute from './routes/articleRoutes.js'
import cors from 'cors'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'

connectDb()

const app = express()
app.use(express.json()) 
app.use(cookieParser())

const corsOptions = {
    origin:process.env.FRONTEND_URL,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}

app.use(cors(corsOptions))

app.use('/api/users',userRoute)
app.use('/api/article',articleRoute)

const PORT = process.env.PORT

app.listen(PORT,(error) => {
    if(!error){   
        console.log(`Server is running on port : ${PORT}`);
    }else{
        console.log(`Error while starting server!`);
    }
})