import {Router} from 'express'
import userController from '../controllers/userController.js'


const router = Router()

router.post('/createuser',userController.createUser)
router.post('/login',userController.userLogin)
export default router