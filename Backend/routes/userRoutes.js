import {Router} from 'express'
import userController from '../controllers/userController.js'
import passport from '../config/passport.js'


const router = Router()

router.post('/createuser',userController.createUser)
router.post('/login',userController.userLogin)
router.put('/preference',passport.authenticate('jwt',{session:false}),userController.userPreference)
export default router