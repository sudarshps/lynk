import { Router } from "express";
import passport from '../config/passport.js'
import articleController from "../controllers/articleController.js";

const router = Router()

router.post('/create',passport.authenticate('jwt',{session:false}),articleController.create)
router.get('/fetcharticles',passport.authenticate('jwt',{session:false}),articleController.fetchArticles)
router.get('/userarticles',passport.authenticate('jwt',{session:false}),articleController.fetchUserArticles)
router.get('/getarticle/:id',passport.authenticate('jwt',{session:false}),articleController.getEditUserArticle)
router.put('/updatearticle/:id',passport.authenticate('jwt',{session:false}),articleController.editUserArticle)
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),articleController.deleteArticle)

export default router