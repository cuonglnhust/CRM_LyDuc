'use strict';
import { Router } from 'express'
import {
    NewsController,
    UserController
} from '../../controllers/admin/index'
import { isCanDoActionAdmin, isCanAccessRouterAdmin } from '../../middlewares/auth'
const router = new Router()
//News
router.get('/listNews', isCanAccessRouterAdmin('listNews'), UserController.loadForm)

router.get('/getListNews', isCanDoActionAdmin('listNews'), NewsController.getListNews)

router.get('/getNewsById', isCanDoActionAdmin('updateNews'), NewsController.getNewsById)

router.get('/createNews', isCanAccessRouterAdmin('createNews', UserController.loadForm))

router.post('/createNews', isCanDoActionAdmin('createNews'), NewsController.createNews)

router.get('/updateNews/:news_id', isCanAccessRouterAdmin('updateNews'), UserController.loadForm)

router.post('/updateNews', isCanDoActionAdmin('updateNews'), NewsController.updateNews)

router.post('/deleteNews', isCanDoActionAdmin('deleteNews'), NewsController.deleteNews)

router.get('/category', isCanAccessRouterAdmin('listCategory'), UserController.loadForm)

router.get('/getCategory', isCanDoActionAdmin('listCategory'), NewsController.getCategory)

router.post('/createCategory', isCanDoActionAdmin('createCategory'), NewsController.createCategory)

router.post('/updateCategory', isCanDoActionAdmin('updateCategory'), NewsController.updateCategory)

router.post('/deleteCategory', isCanDoActionAdmin('deleteCategory'), NewsController.deleteCategory)



export default router
