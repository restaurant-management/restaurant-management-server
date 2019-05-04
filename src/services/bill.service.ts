import {Bill, BillStatus} from '../entities/Bill';
import {BillDetail} from '../entities/BillDetail';
import {Dish} from '../entities/Dish';
import {User} from '../entities/User';

const create = async (_username: string, _dishIds: number[], _day?: Date, _status?: string) => {
    // Check status is correct
    if (_status &&
        Object.keys(BillStatus).map(i => BillStatus[i]).indexOf(_status) < 0)
        throw new Error('Bill Status not found.');

    const user = await User.findOne({where: {userName: _username}});
    let newBill = new Bill();
    newBill.user = user;
    newBill.day = _day || newBill.day;
    newBill.status = _status as BillStatus;
    newBill.billDetails = [];
    for (let dishId of _dishIds) {
        let dish = await Dish.findOne(dishId);
        let billDetail = new BillDetail();
        billDetail.dish = dish;
        billDetail.bill = newBill;
        newBill.billDetails.push(billDetail);
    }
    const billId = (await newBill.save()).billId;
    return await Bill.findOne(billId);
};

const edit = async (_billId: number, _day?: Date, _status?: string) => {
    // Check status is correct
    if (_status &&
        Object.keys(BillStatus).map(i => BillStatus[i]).indexOf(_status) < 0)
        throw new Error('Bill Status not found.');

    let bill = await Bill.findOne(_billId);
    if (_day) bill.day = _day;
    if (_status) bill.status = _status as BillStatus;
    const billId = (await bill.save()).billId;
    return await Bill.findOne(billId, {relations: ['billDetails']});
};

const findById = async (billId: number) => {
    const bill = await Bill.findOne(billId, {relations: ['billDetails']});
    if (bill) return bill;
    throw new Error('Not found.');
};

const deleteBill = async (billId: number) => {
    try {
        const bill = await Bill.findOne(billId);
        const billDetails = await BillDetail.find({where: {billId}});
        billDetails.forEach(async (billDetail) => await billDetail.remove());
        await bill.remove();
    } catch (e) {
        throw e;
    }
};

const getAll = async (length?: number, offset?: number) => {
    try {
        return await Bill.find({skip: offset, take: length, relations: ['billDetails']});
    } catch (e) {
        throw e;
    }
};

const addDish = async (dishId: number, billId: number) => {
    if (await BillDetail.findOne({dishId, billId}))
        throw new Error('Dish existed in bill');
    let billDetail = new BillDetail();

    const dish = await Dish.findOne(dishId);
    if (!dish) throw new Error('Dish not found.');
    billDetail.dish = dish;

    const bill = await Bill.findOne(billId);
    if (!bill) throw new Error('Bill not found.');
    billDetail.bill = bill;

    await billDetail.save();

    return await Bill.findOne(billId, {relations: ['billDetails']});
};

const removeDish = async (dishId: number, billId: number) => {
    const billDetail = await BillDetail.findOne({dishId, billId});
    if (!billDetail) throw new Error('Not found to delete.');
    await (billDetail).remove();
    return await Bill.findOne(billId, {relations: ['billDetails']});
};

const updateStatus = async (billId: number, status: string) => {
    if (Object.keys(BillStatus).map(i => BillStatus[i]).indexOf(status) < 0)
        throw new Error('Bill Status not found.');

    let bill = await Bill.findOne(billId);
    if (!bill) throw new Error('Bill not found.');
    bill.status = status as BillStatus;
    return await bill.save();
};

export {create, findById, deleteBill, getAll, edit, addDish, removeDish, updateStatus}
