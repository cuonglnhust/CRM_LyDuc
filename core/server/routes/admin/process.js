import { Router } from 'express';
import {  
    ProcessController,UserController
 } from '../../controllers/admin';
import { isCanDoActionAdmin ,isCanAccessRouterAdmin} from '../../middlewares/auth'

const router = new Router();
router.get('/process/processWorker', isCanAccessRouterAdmin('processWorker'), UserController.loadForm)

router.post('/createProcessWorker',isCanDoActionAdmin('processWorker'), ProcessController.createProcessWorker)

router.get('/getAllProcessWorker',isCanDoActionAdmin('processWorker'), ProcessController.getAllProcessWorker)

router.get('/getProcessWorkerById',isCanDoActionAdmin('processWorker'), ProcessController.getProcessWorkerById)

router.post('/updateProcessWorker',isCanDoActionAdmin('processWorker'), ProcessController.updateProcessWorker)

router.post('/deleteProcessWorker',isCanDoActionAdmin('processWorker'), ProcessController.deleteProcessWorker)


// processService
router.get('/process/processService', isCanAccessRouterAdmin('processService'), UserController.loadForm)

router.post('/createProcessService',isCanDoActionAdmin('processService'), ProcessController.createProcessService)

router.get('/getAllProcessService',isCanDoActionAdmin('processService'), ProcessController.getAllProcessService)

router.get('/getProcessServiceById',isCanDoActionAdmin('processService'), ProcessController.getProcessServiceById)

router.post('/updateProcessService',isCanDoActionAdmin('processService'), ProcessController.updateProcessService)

router.post('/deleteProcessService',isCanDoActionAdmin('processService'), ProcessController.deleteProcessService)

export default router;