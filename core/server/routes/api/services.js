'use strict';
import { Router } from 'express'
import {
    ServicesController
} from '../../controllers/admin/index'
const router = new Router()

router.get('/getListServicesCategory', ServicesController.getServicesCategory)

router.get('/getListServices', ServicesController.getListServicesByCategory)

router.get('/getListServicesHot', ServicesController.getServicesCategoryHot)

router.get('/getServicesContentAPI', ServicesController.getServiceContentAPI)

router.get('/getServicesCategoryById', ServicesController.getServicesCategoryById)

router.get('/getServicesCategoryBySlug', ServicesController.getServicesCategoryBySlug)

router.get('/getServicesCategoryBySlugSub', ServicesController.getServicesCategoryBySlugSub)


export default router
