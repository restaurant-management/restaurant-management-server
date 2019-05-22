import {NextFunction, Request, Response} from 'express';
import {Permission} from '../entities/Permission';
import {User} from '../entities/User';
import {checkUserPermission} from '../helpers/authorize';
import * as BillService from '../services/bill.service';

const create = (req: Request, res: Response, next: NextFunction) => {
    BillService.create((req['user'] as User).userName, req.body.dishIds, 
        req.body.quantities, new Date())
        .then(bill => {
            return res.status(200).json(bill);
        }).catch(err => next(err));
};

const createCustom = (req: Request, res: Response, next: NextFunction) => {
    BillService.create((req['user'] as User).userName, req.body.dishIds, 
        req.body.quantities, req.body.day || new Date(), req.body.status)
        .then(bill => {
            return res.status(200).json(bill);
        }).catch(err => next(err));
};

const editBill = (req: Request, res: Response, next: NextFunction) => {
    BillService.edit(req.params.billId,req.body.day || new Date(),
        req.body.status).then(bill => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const getById = (req: Request, res: Response, next: NextFunction) => {
    BillService.findById(req.params.billId).then(bill => {
        if (!checkUserPermission(req['user'] as User, Permission.BillManagement) &&
            (req['user'] as User).userName != bill.username)
            return next(new Error('Unauthorized'));
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const deleteBill = (req: Request, res: Response, next: NextFunction) => {
    BillService.deleteBill(req.params.billId).then(() => {
        return res.status(200).json({message: 'Delete success.'});
    }).catch(err => next(err));
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    BillService.getAll(req.query.length, req.query.offset).then((bills) => {
        return res.status(200).json(bills);
    }).catch(err => next(err));
};

const addDish = (req: Request, res: Response, next: NextFunction) => {
    BillService.addDish(req.params.dishId, req.params.billId).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const removeDish = (req: Request, res: Response, next: NextFunction) => {
    BillService.removeDish(req.params.dishId, req.params.billId).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updateStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, req.params.status).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

export {create, getById, deleteBill, getAll, createCustom, editBill, addDish, removeDish, updateStatus}
