import { Router } from 'express';
import {  
    StrengthsController,
 } from '../../controllers/admin';

const router = new Router();

router.get('/getStrengthsByWorker', StrengthsController.getStrengthsByWorker)

router.get('/getStrengthsByCo', StrengthsController.getStrengthsByCo)

export default router;