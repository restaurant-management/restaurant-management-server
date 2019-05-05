import {NextFunction, Request, Response} from 'express';
import * as DishService from '../services/dish.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
    DishService.create(req.body.name, req.body.description,
        req.body.images, req.body.defaultPrice).then(dish => {
        return res.status(200).json(dish);
    }).catch(err => next(err));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
    DishService.getAll().then(dishes => {
        return res.status(200).json(dishes);
    }).catch(err => next(err))
};

const deleteDish = async (req: Request, res: Response, next: NextFunction) => {
    DishService.deleteDish(req.params.dishId).then(() => {
        return res.status(200).json({message: 'Delete success.'});
    }).catch(e => next(e))
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    DishService.findById(req.params.dishId).then(dish => {
        return res.status(200).json(dish);
    }).catch(e => next(e))
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    DishService.update(req.params.dishId, req.body.name, req.body.description,
        req.body.images, req.body.defaultPrice).then(dish => {
        return res.status(200).json(dish);
    }).catch(e => next(e));
};

export {create, getAll, deleteDish, getById, update}
