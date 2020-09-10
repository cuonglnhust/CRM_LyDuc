'use strict';
import { Router } from 'express'
import {
    NewsController
} from '../../controllers/admin/index'
const router = new Router()
//News
router.get('/getListNews', NewsController.getListNews)

router.get('/getListNewsContent', NewsController.getListNewsContent)

router.get('/getNewsById', NewsController.getNewsById)

router.get('/getCategory', NewsController.getCategory)

router.get('/getCategoryApi', NewsController.getCategoryApi)

router.get('/getAllNewsByAllCategory', NewsController.getAllNewsByAllCategory)

router.get('/getNewsBySlug', NewsController.getNewsBySlug)

router.get('/getNewsHot', NewsController.getNewsHot)

router.get('/getNewsRecruitment', NewsController.getNewsRecruitment)

router.get('/getNewsByNewsSlug', NewsController.getNewsByNewsSlug)

router.get('/getListNewsHotByCategory', NewsController.getListNewsHotByCategory)


export default router
