import { Router } from 'express';
import {  
    ProcessController
 } from '../../controllers/admin';

const router = new Router();

router.get('/getAllProcessWorker', ProcessController.getAllProcessWorker)


// processService

router.get('/getAllProcessService', ProcessController.getAllProcessService)

export default router;