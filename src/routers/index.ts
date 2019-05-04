import {Router} from 'express';
import userRouter from './user.router';
import dishRouter from './dish.router';
import roleRouter from './role.router';
import billRouter from './bill.router';

const router = Router();

router.use('/users', userRouter);
router.use('/dishes', dishRouter);
router.use('/roles', roleRouter);
router.use('/bills', billRouter);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Server!');
});

export default router;
