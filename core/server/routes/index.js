import { Router } from 'express';
import { initStaticAdmin, initStaticUpload } from '../middlewares/static';

import upload from './upload';
import admin from './admin'
import api from './api'
import site from './site'

let siteApp = new Router();

siteApp.use(initStaticAdmin())

siteApp.use('/uploads', initStaticUpload())

siteApp.use('/upload', upload)

siteApp.use('/admin', admin)

siteApp.use('/api', api)

siteApp.use('/', site)

export default siteApp;