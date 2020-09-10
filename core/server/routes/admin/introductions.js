import { Router } from 'express';
import {  
    IntroductionsController,
 } from '../../controllers/admin';
import { isCanDoActionAdmin } from '../../middlewares/auth'

const router = new Router();

router.post('/createIntroductions',isCanDoActionAdmin('introductions'), IntroductionsController.createIntroductions)

router.get('/getAllIntroductions',isCanDoActionAdmin('introductions'), IntroductionsController.getAllIntroductions)

router.get('/getIntroductionsById',isCanDoActionAdmin('introductions'), IntroductionsController.getIntroductionsById)

router.post('/updateIntroductions',isCanDoActionAdmin('introductions'), IntroductionsController.updateIntroductions)

router.post('/deleteIntroductions',isCanDoActionAdmin('introductions'), IntroductionsController.deleteIntroductions)

export default router;