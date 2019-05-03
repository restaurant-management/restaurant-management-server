import {Router} from 'express';
import * as userController from '../controllers/user.controller';
import {Permission} from '../entities/Permission';
import Authorize from '../helpers/authorize';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/uuid/:uuid', Authorize(), userController.getByUuid);
router.get('/', Authorize(Permission.UserManagement), userController.getAll);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to User!');
});

export default router;
