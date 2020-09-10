import { Router } from 'express';
import {  
    BannerController,
 } from '../../controllers/admin';
import { isCanDoActionAdmin } from '../../middlewares/auth'

const router = new Router();

router.post('/createBanner',isCanDoActionAdmin('settingBanner'), BannerController.createBanner)

router.get('/getAllBanner',isCanDoActionAdmin('settingBanner'), BannerController.getAllBanner)

router.get('/getBannerById',isCanDoActionAdmin('settingBanner'), BannerController.getBannerById)

router.post('/updateBanner',isCanDoActionAdmin('settingBanner'), BannerController.updateBanner)

router.post('/deleteBanner',isCanDoActionAdmin('settingBanner'), BannerController.deleteBanner)

export default router;