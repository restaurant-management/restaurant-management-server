import {Router} from 'express';
import * as dishController from '../controllers/dish.controller';
import {Permission} from '../entities/Permission';
import authorize from '../helpers/authorize';

const router = Router();

router.post('/', authorize(Permission.DishManagement), dishController.create);
router.delete('/:dishId', authorize(Permission.DishManagement), dishController.deleteDish);
router.get('/:dishId', authorize(Permission.DishManagement), dishController.getById);
router.put('/:dishId', authorize(Permission.DishManagement), dishController.update);
router.get('/', authorize(Permission.DishManagement), dishController.getAll);

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Dish!');
});

export default router;
