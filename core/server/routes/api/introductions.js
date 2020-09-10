import { Router } from 'express';
import {  
    IntroductionsController,
 } from '../../controllers/admin';

const router = new Router();

router.get('/getIntroductionsByWorker', IntroductionsController.getIntroductionsByWorker)

router.get('/getIntroductionsByCo', IntroductionsController.getIntroductionsByCo)

export default router;