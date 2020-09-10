import { Router } from 'express';
import { PermissionController } from '../../controllers/admin'
import { isCanDoActionAdmin, isCanAccessRouterAdmin } from '../../middlewares/auth'
import UserController from '../../controllers/admin/UserController';
const router = new Router();

router.get('/create', isCanAccessRouterAdmin('createPermission'), UserController.loadForm)

router.post('/createPermission', isCanDoActionAdmin('createPermission'), PermissionController.createPermission)

router.get('/list', isCanAccessRouterAdmin('listPermission'), UserController.loadForm)

router.get('/getPermission', isCanDoActionAdmin('listPermission'), PermissionController.getPermission)

router.get('/getPermissionById', isCanDoActionAdmin('updatePermission'), PermissionController.getPermissionById)

router.post('/updatePermission', isCanDoActionAdmin('updatePermission'), PermissionController.updatePermission)

router.post('/deletePermission', isCanDoActionAdmin('deletePermission'), PermissionController.deletePermission)

router.get('/getRolePermission', isCanDoActionAdmin('updateRolePermission'), PermissionController.getRolePermission)

router.post('/updateRolePermission', isCanDoActionAdmin('updateRolePermission'), PermissionController.updateRolePermission)

router.get('/getPermissionUser', PermissionController.getPermissionUser)


export default router;