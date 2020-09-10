import { Router } from 'express';
import about from './about';
import news from './news';
import partner from './partner';
import services from './services';
import permission from './permission';
import role from './role';
import user from './user';
import banner from './banner';
import strengths from './strengths';
import introductions from './introductions';
import seo from './seo';
import process from './process';
import appdetail from './appdetail';
import {
    authLogin,
    isAuth
} from '../../middlewares/auth'
import { UserController, LoginController } from '../../controllers/admin';
import { isCanAccessRouterAdmin } from '../../middlewares/auth'

const router = new Router();

router.get('/', LoginController.checkLogin);

router.get('/login', authLogin, LoginController.loadForm)

router.post('/login', LoginController.login)

router.post('/register', LoginController.register)

router.get('/logout', UserController.userLogout)

router.get('/getUserProfile', UserController.getUserProfile)

router.post('/updateUserProfile', UserController.updateUserProfile)

router.use('/about', about)

router.use('/permission', permission)

router.use('/news', news)

router.use('/partner', partner)

router.use('/services', services)

router.use('/role', role)

router.use('/user', user)

router.use('/banner', banner)

router.use('/strengths', strengths)

router.use('/introductions', introductions)

router.use('/seo', seo)

router.use('/process', process)

router.use('/appdetail', appdetail)

router.get('/setting/seo', isCanAccessRouterAdmin('settingSeo'), UserController.loadForm)

router.get('/introduction/introductions', isCanAccessRouterAdmin('introductions'), UserController.loadForm)

router.get('/introduction/strengths', isCanAccessRouterAdmin('strengths'), UserController.loadForm)

router.get('/setting/banner', isCanAccessRouterAdmin('settingBanner'), UserController.loadForm)

router.get('/setting/about', isCanAccessRouterAdmin('settingContact'), UserController.loadForm)

router.get('/*', isAuth, UserController.loadForm)

export default router;
