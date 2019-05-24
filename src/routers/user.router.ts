import {Router} from 'express';
import * as userController from '../controllers/user.controller';
import {Permission} from '../entities/Permission';
import Authorize from '../helpers/authorize';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/uuid/:uuid', Authorize(), userController.getByUuid);
router.get('/:username', Authorize(), userController.getByUsername);
router.put('/:username', Authorize(), userController.editProfile);
router.put('/:username/password', Authorize(), userController.editPassword);
router.delete('/:username', Authorize(Permission.UserManagement), userController.deleteUser);
router.get('/email/:email', Authorize(), userController.getByEmail);
router.get('/', Authorize(Permission.UserManagement), userController.getAll);
router.get('/:username/permissions', Authorize(), userController.getAllPermissions);
router.post('/:username/permissions/:permission', Authorize(Permission.UserManagement), userController.addPermission);
router.delete('/:username/permissions/:permission', Authorize(Permission.UserManagement), userController.removePermission);
router.put('/:username/role/:role', Authorize(Permission.UserManagement), userController.changeRole);

export default router;
