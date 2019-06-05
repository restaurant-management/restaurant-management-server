import {Router} from 'express';
import * as dishController from '../controllers/dish.controller';
import {Permission} from '../entities/Permission';
import authorize from '../helpers/authorize';

const router = Router();

router.post('/', authorize(Permission.DishManagement), dishController.create);
router.delete('/:dishId', authorize(Permission.DishManagement), dishController.deleteDish);
router.get('/:dishId', authorize(), dishController.getById);
router.put('/:dishId', authorize(Permission.DishManagement), dishController.update);
router.get('/', authorize(), dishController.getAll);

export default router;
