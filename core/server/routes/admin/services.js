'use strict';
import { Router } from 'express'
import {
    ServicesController,
    UserController
} from '../../controllers/admin/index'
import { isCanDoActionAdmin, isCanAccessRouterAdmin } from '../../middlewares/auth'
const router = new Router()

router.get('/listServices', isCanAccessRouterAdmin('listServices'), UserController.loadForm)

router.get('/getListServices', isCanDoActionAdmin('listServices'), ServicesController.getListServices)

router.get('/updateServices/:services_id', isCanAccessRouterAdmin('updateServices'), UserController.loadForm)

router.get('/getServicesById', isCanDoActionAdmin('updateServices'), ServicesController.getServicesById)

router.post('/updateServices', isCanDoActionAdmin('updateServices'), ServicesController.updateServices)

router.get('/category', isCanAccessRouterAdmin('listServiceCategory'), UserController.loadForm)

router.get('/getServicesCategory', isCanAccessRouterAdmin('listServicesCategory'), ServicesController.getServicesCategory)

router.post('/createServicesCategory', isCanDoActionAdmin('createServicesCategory'), ServicesController.createServicesCategory)

router.post('/updateServicesCategory', isCanDoActionAdmin('updateServicesCategory') , ServicesController.updateServicesCategory)

router.get('/getServicesCategoryById', isCanDoActionAdmin('updateServicesCategory'), ServicesController.getServicesCategoryById)

router.post('/deleteServicesCategory', isCanDoActionAdmin('deleteServicesCategory') , ServicesController.deleteServicesCategory)

router.get('/getServiceContent', isCanDoActionAdmin('updateServicesCategory'), ServicesController.getServiceContent)

router.post('/updateServiceContent', isCanDoActionAdmin('updateServicesCategory'), ServicesController.updateServicesCategoryContent)

export default router
