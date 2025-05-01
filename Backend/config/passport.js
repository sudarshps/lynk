import passport from 'passport'
import { Strategy as JwtStrategy,ExtractJwt } from 'passport-jwt'
import userModel from '../model/user_model.js'
import dotenv from 'dotenv'
dotenv.config()

const jwtSecret = process.env.JWT_SECRET

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        function(req){            
            let token = null
            if(req && req.cookies){
                token = req.cookies.token
            }            
            return token
        }
    ]),
    secretOrKey:jwtSecret 
}

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await userModel.findOne({ _id: jwtPayload.id }); 
            if (user) {
                return done(null, user); 
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport