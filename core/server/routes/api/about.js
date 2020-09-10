'use strict';
import { Router } from 'express'
import {
    AboutController
} from '../../controllers/admin/index'
const router = new Router()


router.get('/getAbout', AboutController.getAbout)




export default router
