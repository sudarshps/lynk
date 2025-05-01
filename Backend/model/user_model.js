import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String},
    email:{type:String,require:true,unique:true},
    dob:{type:String,require:true},
    phone:{type:Number,require:true},
    password:{type:String,require:true},
    preference:{type:[String],default:[],require:true}
})

const UserModel = mongoose.model('UserModel',userSchema)

export default UserModel