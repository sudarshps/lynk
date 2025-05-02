import UserModel from "../model/user_model.js"
import bcrypt from 'bcryptjs'
import {generateToken,setToken} from '../utils/token.js'
import passport from '../config/passport.js'

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
            const token = generateToken(userRegistered)
            setToken(res,token)

            return res.status(200).json({userCreated:true,userRegistered,message:'Registration successful!'})
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
            const token = generateToken(exist)
            setToken(res,token)
            return res.status(200).json({valid:true,message:'Login successful!'})
             
        } catch (error) {
            console.error('error in user login',error);
            return res.status(500).json({valid:false,message:'internal server error'})
        }
    }

    async updateUser(req,res){
        try {
            const{firstName,selectedCategories,current,newPass} = req.body            
            let userDetails = {}
            if(selectedCategories){
                userDetails.preference = selectedCategories
            }
            if(firstName){
                userDetails.firstName = firstName
            }
            
            const userId = req.user._id
            const user = await UserModel.findById(userId)
            if(current){
                const validPassword = await bcrypt.compare(current,user.password) 
                if(!validPassword){
                    return res.status(401).json({updatedPass:false,message:'Current password is invalid'})
                }  
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(newPass,salt)
                const setPassword = await UserModel.findByIdAndUpdate(userId,{password:hash})
                if(!setPassword){
                    return res.status(401).json({updatedPass:false,message:'error while updating pass on db'})
                }
                return res.status(200).json({updatePass:true,message:'password updated successfully!'})
            }
            const update = await UserModel.findByIdAndUpdate(userId,userDetails,{new:true})
            if(!update){
                return res.status(401).json({isUpdated:false,message:'Preference updation failed'})
            }
            return res.status(200).json({isUpdated:true,message:'Preference updated successfully!'})
        } catch (error) {
            console.error('error while updating user preference',error);
            
        }
    }

    async getUser(req,res){
        try {
            const userId = req.user._id
            const user = await UserModel.findById(userId)
            if(!user){
                return res.status(401).json({message:'error while fetching user details'})
            }
            return res.status(200).json({user,message:'user data fetched successfully'})
        } catch (error) {
            console.error('error while fetching user details',error);
        }
    }

    async checkAuth(req,res){
        try {
            passport.authenticate('jwt', { session: false }, (err, user) => {
                if (err) {
                    return res.status(500).json({ message: 'Server error during authentication' });
                }

                if (!user) {                    
                    return res.status(401).json({ message: 'Not authorized' });
                }

                req.user = user;
                return res.json({ user: req.user });
            })(req, res)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' })
        }
    }

    async logout(req,res){
        res.clearCookie('token');
        res.status(200).json({ isLoggedOut:true,message: 'Logged out successfully' });
    }

}

export default new UserController()