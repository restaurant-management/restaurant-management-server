import {Router} from 'express';
import * as roleController from '../controllers/role.controller';
import {Permission} from '../entities/Permission';
import Authorize from '../helpers/authorize';

const router = Router();

router.post('/', Authorize(Permission.RoleManagement), roleController.create);
router.put('/:slug', Authorize(Permission.RoleManagement), roleController.update);
router.get('/', Authorize(Permission.RoleManagement), roleController.getAll);
router.get('/:slug', Authorize(Permission.RoleManagement), roleController.getBySlug);
router.delete('/:slug', Authorize(Permission.RoleManagement), roleController.deleteRole);
router.post('/:slug/permissions/:permission', Authorize(Permission.RoleManagement), roleController.addPermission);
router.delete('/:slug/permissions/:permission', Authorize(Permission.RoleManagement), roleController.removePermission);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to User!');
});

export default router;
