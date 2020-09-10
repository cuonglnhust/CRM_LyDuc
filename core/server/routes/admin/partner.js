'use strict';
import { Router } from 'express'
import {
    PartnerController,
    UserController
} from '../../controllers/admin/index'
import { isCanDoActionAdmin, isCanAccessRouterAdmin } from '../../middlewares/auth'
const router = new Router()
router.get('/listPartner', isCanAccessRouterAdmin('listPartner', UserController.loadForm))

router.get('/getListPartner', isCanDoActionAdmin('listPartner'), PartnerController.getListPartner)

router.get('/updatePartner/:partner_id', isCanAccessRouterAdmin('updatePartner', UserController.loadForm))

router.get('/getPartnerById', isCanDoActionAdmin('updatePartner'), PartnerController.getPartnerById)

router.get('/createPartner', isCanAccessRouterAdmin('createPartner', UserController.loadForm))

router.post('/createPartner', isCanDoActionAdmin('createPartner'), PartnerController.createPartner)

router.post('/updatePartner', isCanDoActionAdmin('updatePartner'), PartnerController.updatePartner)

router.post('/deletePartner', isCanDoActionAdmin('deletePartner'), PartnerController.deletePartner)


export default router
