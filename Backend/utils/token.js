import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret = process.env.JWT_SECRET

export const generateToken = (user) => {
    return jwt.sign({id:user._id},jwtSecret,{
        expiresIn:'1d'
    })
}


export const setToken = (res,token) => {
    const isProduction = process.env.NODE_ENV === 'production'
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction?'none':'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
}