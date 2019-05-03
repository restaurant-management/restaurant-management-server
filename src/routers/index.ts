import {Router} from 'express';
import userRouter from './user.router';

const router = Router();

router.use('/users', userRouter);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Server!');
});

export default router;
