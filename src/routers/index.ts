import {Router} from 'express';
import userRouter from './user.router';
import dishRouter from './dish.router';
import roleRouter from './role.router';
import billRouter from './bill.router';
import dailyDishRouter from './dailyDish.router';
import statisticsRouter from './statistics.router';

const router = Router();

router.use('/users', userRouter);
router.use('/dishes', dishRouter);
router.use('/roles', roleRouter);
router.use('/bills', billRouter);
router.use('/dailyDishes', dailyDishRouter);
router.use('/statistics', statisticsRouter);

export default router;
