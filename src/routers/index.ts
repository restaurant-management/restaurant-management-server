import {Router} from 'express';
import userRouter from './user.router';
import dishRouter from './dish.router';

const router = Router();

router.use('/users', userRouter);
router.use('/dishes', dishRouter);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Server!');
});

export default router;
