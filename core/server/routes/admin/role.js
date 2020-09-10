import { Router } from 'express';
import { RoleController } from '../../controllers/admin';
import LoginController from '../../controllers/admin/LoginController'
import { isCanDoActionAdmin, isCanAccessRouterAdmin } from '../../middlewares/auth'
const router = new Router();

router.post('/createRole', isCanDoActionAdmin('createRole'), RoleController.createRole)
router.get('/getRole', isCanDoActionAdmin('listRole'), RoleController.getRole)
router.get('/getRoleById', isCanDoActionAdmin('updateRole'), RoleController.getRoleById)
router.post('/updateRole', isCanDoActionAdmin('updateRole'), RoleController.updateRole)
router.post('/deleteRole', isCanDoActionAdmin('deleteRole'), RoleController.deleteRole)

router.get('/', LoginController.loadForm);

export default router;