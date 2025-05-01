import mongoose from 'mongoose'

const connectDb = async() => {
    try {        
        const mongoUri = process.env.MONGO_URI
        if(!mongoUri){
            throw new Error('MONGO URI is not defined')
        }
        await mongoose.connect(mongoUri)
    } catch (error) {
        console.error('error connecting to mongodb',error);
        
    }
}

export default connectDb