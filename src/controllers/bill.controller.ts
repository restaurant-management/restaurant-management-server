import {NextFunction, Request, Response} from 'express';
import {BillStatus} from '../entities/Bill';
import {Permission} from '../entities/Permission';
import {User} from '../entities/User';
import {checkUserPermission} from '../helpers/authorize';
import * as BillService from '../services/bill.service';

const create = (req: Request, res: Response, next: NextFunction) => {
    if (!(req['user'] as User).userName || !req.body.dishIds || !req.body.prices)
        return next(new Error('Missing body parameters.'));
    BillService.create((req['user'] as User).userName, req.body.dishIds,
        req.body.prices, req.body.quantities, new Date())
        .then(bill => {
            return res.status(200).json(bill);
        }).catch(err => next(err));
};

const createCustom = (req: Request, res: Response, next: NextFunction) => {
    if (!(req['user'] as User).userName || !req.body.dishIds || !req.body.prices)
        return next(new Error('Missing body parameters.'));
    BillService.create(req.body.user, req.body.dishIds, req.body.prices,
        req.body.quantities, req.body.day || new Date(), req.body.status, req.body.manager)
        .then(bill => {
            return res.status(200).json(bill);
        }).catch(err => next(err));
};

const editBill = (req: Request, res: Response, next: NextFunction) => {
    BillService.edit(req.params.billId, req.body.user, req.body.day || new Date(),
        req.body.status, req.body.manager).then(bill => {
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
    BillService.getAll(req.query.day, req.query.length, req.query.offset,
        checkUserPermission(req['user'] as User, [Permission.BillManagement, Permission.UpdatePaidBillStatus]),
        checkUserPermission(req['user'] as User, [Permission.BillManagement, Permission.UpdatePreparingBillStatus]),
        checkUserPermission(req['user'] as User, Permission.BillManagement),
        checkUserPermission(req['user'] as User, [Permission.BillManagement, Permission.UpdateDeliveringBillStatus]),
        checkUserPermission(req['user'] as User, Permission.BillManagement),
        checkUserPermission(req['user'] as User, Permission.BillManagement),
    )
        .then((bills) => {
            return res.status(200).json(bills);
        }).catch(err => next(err));
};

const getAllUserBills = (req: Request, res: Response, next: NextFunction) => {
    if (!checkUserPermission(req['user'] as User, Permission.BillManagement) &&
        (req['user'] as User).userName != req.params.username) {
        return next(new Error('Unauthorized'));
    }

    BillService.getAllUserBills(req.params.username, req.query.length, req.query.offset)
        .then((bills) => {
            return res.status(200).json(bills);
        }).catch(err => next(err));
};

const addDish = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.price) return next(new Error('Price is required.'));
    BillService.addDish(req.params.dishId, req.params.billId, req.body.price, req.body.quantity).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const removeDish = (req: Request, res: Response, next: NextFunction) => {
    BillService.removeDish(req.params.dishId, req.params.billId).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updateCreatedStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.Created, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updatePaidStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.Paid, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updateDeliveringStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.Delivering, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updatePreparingStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.Preparing, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updatePrepareDoneStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.PrepareDone, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updateShippingStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.Shipping, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const updateCompleteStatus = (req: Request, res: Response, next: NextFunction) => {
    BillService.updateStatus(req.params.billId, BillStatus.Complete, (req['user'] as User).userName,
        checkUserPermission(req['user'] as User, Permission.BillManagement)).then((bill) => {
        return res.status(200).json(bill);
    }).catch(err => next(err));
};

const countBillByDate = (req: Request, res: Response, next: NextFunction) => {
    BillService.countByDate(req.query.startDate, req.query.endDate).then((value) => {
        return res.status(200).json(value);
    }).catch(err => next(err));
};

const getDishOrderedByDay = (req: Request, res: Response, next: NextFunction) => {
    BillService.getDishOrderedByDay(req.query.dishId, req.query.startDate, req.query.endDate).then(value => {
        return res.status(200).json(value);
    }).catch(err => next(err));
}

export {
    create,
    getById,
    deleteBill,
    getAll,
    createCustom,
    editBill,
    addDish,
    removeDish,
    updateDeliveringStatus,
    updatePreparingStatus,
    updatePrepareDoneStatus,
    updateShippingStatus,
    updateCompleteStatus,
    updatePaidStatus,
    updateCreatedStatus,
    getAllUserBills,
    countBillByDate,
    getDishOrderedByDay
}
