import {Router} from "express";
import * as billController from "../controllers/bill.controller";
import {Permission} from "../entities/Permission";
import Authorize from "../helpers/authorize";

const router = Router();

router.post(
    "/",
    Authorize([Permission.CreateBill, Permission.BillManagement]),
    billController.create
);
router.post(
    "/custom",
    Authorize(Permission.BillManagement),
    billController.createCustom
);
router.put(
    "/:billId",
    Authorize(Permission.BillManagement),
    billController.editBill
);
router.put(
    "/:billId/created",
    Authorize([Permission.BillManagement, Permission.UpdatePaidBillStatus]),
    billController.updateCreatedStatus
);
router.put(
    "/:billId/paid",
    Authorize([Permission.BillManagement, Permission.UpdatePaidBillStatus]),
    billController.updatePaidStatus
);
router.put(
    "/:billId/delivering",
    Authorize([Permission.BillManagement, Permission.UpdateDeliveringBillStatus]),
    billController.updateDeliveringStatus
);
router.put(
    "/:billId/preparing",
    Authorize([Permission.BillManagement, Permission.UpdatePreparingBillStatus]),
    billController.updatePreparingStatus
);
router.put("/:billId/prepare-done", Authorize([Permission.BillManagement, Permission.UpdatePrepareDoneBillStatus]),
    billController.updatePrepareDoneStatus);
router.put("/:billId/shipping", Authorize([Permission.BillManagement, Permission.UpdateShippingBillStatus]),
    billController.updateShippingStatus);
router.put("/:billId/complete", Authorize([Permission.BillManagement, Permission.UpdateCompleteBillStatus]), billController.updateCompleteStatus);
router.get("/", Authorize([
    Permission.BillManagement,
    Permission.UpdatePaidBillStatus,
    Permission.UpdatePreparingBillStatus,
    Permission.UpdatePrepareDoneBillStatus,
    Permission.UpdateDeliveringBillStatus,
    Permission.UpdateCompleteBillStatus
]), billController.getAll);
router.get("/user/:username", Authorize(), billController.getAllUserBills);
router.get("/:billId", Authorize(), billController.getById);
router.delete("/:billId", Authorize(Permission.BillManagement), billController.deleteBill);
router.post("/:billId/dishes/:dishId", Authorize(Permission.BillManagement), billController.addDish);
router.delete("/:billId/dishes/:dishId", Authorize(Permission.BillManagement), billController.removeDish);
router.get("/countBill", Authorize(Permission.BillManagement), billController.getAll);

export default router;
