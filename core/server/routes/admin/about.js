'use strict';
import { Router } from 'express'
import {
    AboutController,
    UserController
} from '../../controllers/admin'
import { isCanDoActionAdmin } from '../../middlewares/auth'
const router = new Router()


router.get('/getAbout', isCanDoActionAdmin('settingContact'), AboutController.getAbout)

router.post('/updateAbout', isCanDoActionAdmin('settingContact'), AboutController.updateAbout)



export default router
