'use strict';
import { Router } from 'express'
import {
    PartnerController
} from '../../controllers/admin/index'
const router = new Router()

router.get('/getListPartner', PartnerController.getListPartner)

router.get('/getPartnerById', PartnerController.getPartnerById)


export default router
