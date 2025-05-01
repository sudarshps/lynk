import {Router} from 'express'
import userController from '../controllers/userController.js'
import passport from '../config/passport.js'


const router = Router()

router.post('/createuser',userController.createUser)
router.post('/login',userController.userLogin)
router.put('/update',passport.authenticate('jwt',{session:false}),userController.updateUser)
router.get('/profile',passport.authenticate('jwt',{session:false}),userController.getUser)
router.get('/checkauth',userController.checkAuth)
router.post('/logout',userController.logout)
export default router