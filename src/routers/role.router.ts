import {Router} from 'express';
import * as roleController from '../controllers/role.controller';
import {Permission} from '../entities/Permission';
import Authorize from '../helpers/authorize';

const router = Router();

router.post('/', Authorize(Permission.RoleManagement), roleController.create);
router.put('/:slug', Authorize(Permission.RoleManagement), roleController.update);
router.get('/', Authorize(), roleController.getAll);
router.get('/:slug', Authorize(), roleController.getBySlug);
router.delete('/:slug', Authorize(Permission.RoleManagement), roleController.deleteRole);
router.post('/:slug/permissions/set', Authorize(Permission.RoleManagement), roleController.setPermission);
router.post('/:slug/permissions/:permission', Authorize(Permission.RoleManagement), roleController.addPermission);
router.delete('/:slug/permissions/:permission', Authorize(Permission.RoleManagement), roleController.removePermission);

export default router;
