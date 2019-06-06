import {Router} from 'express';
import * as billController from '../controllers/bill.controller';
import authorize from '../helpers/authorize';

const router = Router();

router.get('/countBill', authorize(), billController.countBillByDate);

export default router;
