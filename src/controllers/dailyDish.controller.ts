import {NextFunction, Request, Response} from 'express';
import * as DailyDishService from '../services/dailyDish.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
    await DailyDishService.create(req.body.day || new Date(), req.body.dishId,
        req.body.session, req.body.status, req.body.price).then(dailyDish => {
        return res.status(200).json(dailyDish);
    }).catch(err => next(err));
};

const deleteDailyDish = async (req: Request, res: Response, next: NextFunction) => {
    await DailyDishService.deleteDailyDish(req.query.day, req.query.dishId, req.query.session)
        .then(() => {
            return res.status(200).json({message: 'Delete success.'});
        }).catch(err => next(err));
};

const editDailyDish = async (req: Request, res: Response, next: NextFunction) => {
    await DailyDishService.edit(req.query.day, req.query.dishId, req.query.session, req.body.status, req.body.price)
        .then((dailyDish) => {
            return res.status(200).json(dailyDish);
        }).catch(err => next(err));
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    await DailyDishService.getAll(req.query.length, req.query.offset).then(dailyDishes => {
        return res.status(200).json(dailyDishes);
    }).catch(err => next(err));
};

const getBy = async (req: Request, res: Response, next: NextFunction) => {
    await DailyDishService.getBy(req.query.day, req.query.dishId, req.query.session, req.query.length, req.query.offset)
        .then(dailyDishes => {
            return res.status(200).json(dailyDishes);
        }).catch(err => next(err));
};

export {create, getAll, deleteDailyDish, editDailyDish, getBy}
