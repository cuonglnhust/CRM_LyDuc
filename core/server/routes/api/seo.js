'use strict';
import { Router } from 'express'
import {
    SeoController
} from '../../controllers/admin/index'
const router = new Router()

router.get('/getAllSeo', SeoController.getAllSeo)

router.get('/getSeoById', SeoController.getSeoById)

export default router
