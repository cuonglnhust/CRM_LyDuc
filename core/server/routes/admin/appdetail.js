import { Router } from 'express';
import {  
    AppDetailController,UserController
 } from '../../controllers/admin';
import { isCanDoActionAdmin,isCanAccessRouterAdmin } from '../../middlewares/auth'

const router = new Router();

router.get('/setting/appdetail', isCanAccessRouterAdmin('settingAppDetail'), UserController.loadForm)

router.post('/createAppDetail',isCanDoActionAdmin('settingAppDetail'), AppDetailController.createAppDetail)

router.get('/getAllAppDetail',isCanDoActionAdmin('settingAppDetail'), AppDetailController.getAllAppDetail)

router.get('/getAppDetailById',isCanDoActionAdmin('settingAppDetail'), AppDetailController.getAppDetailById)

router.post('/updateAppDetail',isCanDoActionAdmin('settingAppDetail'), AppDetailController.updateAppDetail)

router.post('/deleteAppDetail',isCanDoActionAdmin('settingAppDetail'), AppDetailController.deleteAppDetail)

export default router;