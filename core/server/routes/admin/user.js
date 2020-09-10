import { Router } from 'express';
import UserController from '../../controllers/admin/UserController'
import { isCanDoActionAdmin, isCanAccessRouterAdmin } from '../../middlewares/auth'
const router = new Router();

router.get('/createRole', isCanAccessRouterAdmin('createRole'), UserController.loadForm)

router.get('/listRole', isCanAccessRouterAdmin('listRole'), UserController.loadForm)

router.get('/updateRole/:role_id', isCanAccessRouterAdmin('updateRole'), UserController.loadForm)

router.get('/rolePermission/:role_id', isCanAccessRouterAdmin('updateRolePermission'), UserController.loadForm)

router.get('/createUser', isCanAccessRouterAdmin('createUser'), UserController.loadForm)

router.post('/createUser', isCanDoActionAdmin('createUser'), UserController.createUser)

router.get('/list', isCanAccessRouterAdmin('listUser'), UserController.loadForm)

router.get('/getUser', isCanDoActionAdmin('listUser'), UserController.getUser)

router.get('/update/:user_id', isCanAccessRouterAdmin('updateUser'), UserController.loadForm)

router.get('/getUserById', isCanDoActionAdmin('updateUser'), UserController.getUserById)

router.get('/getUserRoleById', isCanDoActionAdmin('updateUser'), UserController.getUserRoleById)

router.post('/updateUser', isCanDoActionAdmin('updateUser'), UserController.updateUser)

router.post('/deleteUser', isCanDoActionAdmin('deleteUser'), UserController.deleteUser)

router.post('/changePassword', UserController.changePassword);

router.get('/*', UserController.loadForm)

export default router