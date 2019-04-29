import {Router} from 'express';
import authRouter from './authRouter';

const router = Router();

router.use('/api/auth', authRouter);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Server!');
});

export default router;
