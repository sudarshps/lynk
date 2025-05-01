import express from 'express'
import 'dotenv/config'
import userRoute from './routes/userRoutes.js'
import cors from 'cors'
import connectDb from './config/db.js'

connectDb()

const app = express()
app.use(express.json()) 

const corsOptions = {
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','PATCH'],
    allowHeaders:['Content-Type','Authorization'],
    credentials:true
}

app.use(cors(corsOptions))

app.use('/api/users',userRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT,(error) => {
    if(!error){   
        console.log(`Server is running on port : ${PORT}`);
    }else{
        console.log(`Error while starting server!`);
    }
})