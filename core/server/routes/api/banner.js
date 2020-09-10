import { Router } from 'express';
import {  
    BannerController,
 } from '../../controllers/admin';

const router = new Router();

router.get('/getListBannerDes', BannerController.getListBannerDes)

router.get('/getListBannerMob', BannerController.getListBannerMob)

router.get('/getBannerById', BannerController.getBannerById)

export default router;