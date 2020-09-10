'use strict';
import {Router} from 'express';
import {initStaticTheme, initStaticGetUpload} from '../../middlewares/static-theme';
import {
    UserController
} from '../../controllers/admin';

const router = new Router();

router.use('/public',initStaticTheme());

router.get('/*', UserController.initViewSite)


export default router;