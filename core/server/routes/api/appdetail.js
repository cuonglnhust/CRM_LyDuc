import { Router } from 'express';
import {  
    AppDetailController,UserController
 } from '../../controllers/admin';

const router = new Router();


router.get('/getAllAppDetailEmp', AppDetailController.getAllAppDetailEmp)

router.get('/getAllAppDetailCus', AppDetailController.getAllAppDetailCus)

router.get('/getAppDetailById', AppDetailController.getAppDetailById)


export default router;