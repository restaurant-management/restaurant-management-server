import {Router} from 'express';
import * as billController from '../controllers/bill.controller';
import {Permission} from '../entities/Permission';
import Authorize from '../helpers/authorize';

const router = Router();

router.post('/', Authorize([Permission.CreateBill, Permission.BillManagement]), billController.create);
router.post('/custom', Authorize(Permission.BillManagement), billController.createCustom);
router.put('/:billId', Authorize(Permission.BillManagement), billController.editBill);
router.put('/:billId/status/:status', Authorize([Permission.BillManagement, Permission.UpdateBillStatus]),
    billController.updateStatus);
router.get('/', Authorize(Permission.BillManagement), billController.getAll);
router.get('/:billId', Authorize(), billController.getById);
router.delete('/:billId', Authorize(Permission.BillManagement), billController.deleteBill);
router.post('/:billId/dishes/:dishId', Authorize(Permission.BillManagement), billController.addDish);
router.delete('/:billId/dishes/:dishId', Authorize(Permission.BillManagement), billController.removeDish);

export default router;
