import UserModel from "../model/user_model.js"
import bcrypt from 'bcryptjs'

class UserController{
    constructor(){}
    async createUser(req,res){
        try {
            const{firstName,lastName,email,dob,password,phone} = req.body
            if(!firstName || !email || !dob || !password || !phone){
                return res.status(400).json({userCreated:false,message:"Please fill the required fields"})
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password,salt)
            const userData = {
                firstName,lastName,email,dob,password:hash,phone
            }
            const user = new UserModel(userData)
            const userRegistered = await user.save()
            if(!userRegistered){
                return res.status(500).json({userCreated:false,message:'User registration failed'})
            }
            return res.status(200).json({userCreated:true,message:'Registration successful!'})
        } catch (error) {
            if(error.code === 11000 && error.keyPattern?.email){

                return res.status(400).json({
                    userCreated:false,
                    message:'Email is already registered!'
                })
            }
            return res.status(500).json({userCreated:false,message:'internal server error'})
        }
    }

    async userLogin(req,res){
        try {
            const{email,password} = req.body
            const exist = await UserModel.findOne({email})
            if(!exist){
                return res.status(401).json({valid:false,message:'User not registered!'})
            }
            const validPassword = await bcrypt.compare(password,exist.password)
            if(!validPassword){
                return res.status(401).json({valid:false,message:'Invalid password'})
            }
            return res.status(200).json({valid:true,message:'Login successful!'})
             
        } catch (error) {
            console.error('error in user login',error);
            return res.status(500).json({valid:false,message:'internal server error'})
        }
    }

}

export default new UserController()