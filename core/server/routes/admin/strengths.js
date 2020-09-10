import { Router } from 'express';
import {  
    StrengthsController,
 } from '../../controllers/admin';
import { isCanDoActionAdmin } from '../../middlewares/auth'

const router = new Router();

router.post('/createStrengths',isCanDoActionAdmin('strengths'), StrengthsController.createStrengths)

router.get('/getAllStrengths',isCanDoActionAdmin('strengths'), StrengthsController.getAllStrengths)

router.get('/getStrengthsById',isCanDoActionAdmin('strengths'), StrengthsController.getStrengthsById)

router.post('/updateStrengths',isCanDoActionAdmin('strengths'), StrengthsController.updateStrengths)

router.post('/deleteStrengths',isCanDoActionAdmin('strengths'), StrengthsController.deleteStrengths)

export default router;