import {Router} from 'express';
import userRouter from './user.router';
import dishRouter from './dish.router';
import roleRouter from './role.router';

const router = Router();

router.use('/users', userRouter);
router.use('/dishes', dishRouter);
router.use('/roles', roleRouter);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Server!');
});

export default router;
