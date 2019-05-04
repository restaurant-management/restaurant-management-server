import {Router} from 'express';
import * as dailyDishController from '../controllers/dailyDish.controller';
import {Permission} from '../entities/Permission';
import authorize from '../helpers/authorize';

const router = Router();

router.post('/', authorize(Permission.DailyDishManagement), dailyDishController.create);
router.delete('/',authorize(Permission.DailyDishManagement) , dailyDishController.deleteDailyDish);
router.put('/',authorize(Permission.DailyDishManagement) , dailyDishController.editDailyDish);
router.get('/', dailyDishController.getAll);
router.get('/getBy', dailyDishController.getBy);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Dish!');
});

export default router;
