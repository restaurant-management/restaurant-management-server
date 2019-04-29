import {Router} from 'express';
import * as authController from '../controller/authController';
import {User} from '../entity/User';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.authenticate, (req, res, _next) => {
    let user: User = req['user'];

    if(!user) res.status(401).send('User not found.');

    res.status(200).send(user);
});

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Auth!');
});

export default router;
