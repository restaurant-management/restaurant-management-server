import {NextFunction, Request, Response} from 'express';
import * as DishService from '../services/dish.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
    await DishService.create(req.body.name, req.body.description,
        req.body.images, req.body.defaultPrice).then(result => {
        return res.status(200).json({dish: result.dish});
    }).catch(err => next(err));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
    DishService.getAll().then(dishes => {
        return res.status(200).json(dishes);
    }).catch(err => next(err))
};

const deleteDish = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await DishService.deleteDish(req.params.dishId);

    if(result) return res.status(200).json({message: 'Delete success.'});
    return res.status(401).json({message: 'Delete failed.'})
};

const getById = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await DishService.findById(req.params.dishId);

    if(result.dish) return res.status(200).json(result.dish);
    return res.status(404).json({message: 'Not found.'})
};

const update = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await DishService.update(req.params.dishId, req.body.name, req.body.description,
        req.body.images, req.body.defaultPrice);

    if(result.dish) return res.status(200).json(result.dish);
    return res.status(404).json({message: 'Updating failed.'})
};

export {create, getAll, deleteDish, getById, update}
