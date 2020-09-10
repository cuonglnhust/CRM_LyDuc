import { Router } from 'express';
import services from './services';
import partner from './partner'
import about from './about'
import news from './news'
import user from './user'
import banner from './banner'
import strengths from './strengths'
import introductions from './introductions'
import process from './process'
import seo from './seo'
import appdetail from './appdetail';
import { UserController } from '../../controllers/admin';
const router = new Router();

router.get('/getUserNews', UserController.getUserNews)

router.use('/services',services)

router.use('/partner',partner);

router.use('/about',about)

router.use('/news',news)

router.use('/user',user)

router.use('/banner',banner)

router.use('/strengths',strengths)

router.use('/introductions',introductions)

router.use('/process',process)

router.use('/seo',seo)

router.use('/appdetail',appdetail)

export default router;