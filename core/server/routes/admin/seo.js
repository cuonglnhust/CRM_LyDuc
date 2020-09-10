import { Router } from 'express';
import {  
    SeoController,
 } from '../../controllers/admin';
import { isCanDoActionAdmin } from '../../middlewares/auth'

const router = new Router();


router.post('/createSeo',isCanDoActionAdmin('settingSeo'), SeoController.createSeo)

router.get('/getAllSeo',isCanDoActionAdmin('settingSeo'), SeoController.getAllSeo)

router.get('/getSeoById',isCanDoActionAdmin('settingSeo'), SeoController.getSeoById)

router.post('/updateSeo',isCanDoActionAdmin('settingSeo'), SeoController.updateSeo)

router.post('/deleteSeo',isCanDoActionAdmin('settingSeo'), SeoController.deleteSeo)

export default router;