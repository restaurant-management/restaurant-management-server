import {getConnection} from 'typeorm';
import {Bill, BillStatus} from "../entities/Bill";
import {BillDetail} from "../entities/BillDetail";
import {DailyDish} from "../entities/DailyDish";
import {Dish} from "../entities/Dish";
import {User} from "../entities/User";

const findOneBill = async (billId: number) => {
    return await Bill.findOne(billId, {relations: ["billDetails", "user"]});
};

const create = async (
    _username: string,
    _dishIds: number[],
    _prices: number[],
    _quantities?: number[],
    _day?: Date,
    _status?: string,
    _manager?: string
) => {
    // Check status is correct
    if (
        _status &&
        Object.keys(BillStatus)
            .map(i => BillStatus[i])
            .indexOf(_status) < 0
    )
        throw new Error("Bill Status not found.");

    if (_quantities && _quantities.length !== _dishIds.length)
        throw new Error(
            "Number of DishIds have to equal with number of quantities."
        );

    if (_prices.length !== _dishIds.length)
        throw new Error("Number of DishIds have to equal with number of Prices.");

    if (!_username) throw new Error(`User is required.`);
    const user = await User.findOne({where: {userName: _username}});
    if (!user) throw new Error(`User ${_username} not found`);

    let newBill = new Bill();
    newBill.user = user;
    if (_manager)
        newBill.manager = await User.findOne({where: {userName: _manager}});
    newBill.day = new Date(_day);
    newBill.status = _status as BillStatus;
    newBill.billDetails = [];
    if (!_dishIds) throw new Error("DishIds must be not null.");
    for (let i = 0; i < _dishIds.length; i++) {
        const listDishes = await DailyDish.find({where: {dishId: _dishIds[i]}});
        if (!listDishes.find(e => new Date(e.day).getDate() == newBill.day.getDate()
            && new Date(e.day).getMonth() == newBill.day.getMonth()
            && new Date(e.day).getFullYear() == newBill.day.getFullYear()))
            throw new Error(`This dish isn't sell on ${newBill.day.toDateString()}.`);

        let dish = await Dish.findOne(_dishIds[i]);
        let billDetail = new BillDetail();
        billDetail.dish = dish;
        if (_quantities)
            billDetail.quantity = _quantities[i] > 0 ? _quantities[i] : 1;
        billDetail.price = _prices[i];
        billDetail.bill = newBill;
        newBill.billDetails.push(billDetail);
    }
    const billId = (await newBill.save()).billId;
    return await findOneBill(billId);
};

const edit = async (_billId: number,
                    _username?: string,
                    _day?: Date,
                    _status?: string,
                    _manager?: string) => {
    // Check status is correct
    if (
        _status &&
        Object.keys(BillStatus)
            .map(i => BillStatus[i])
            .indexOf(_status) < 0
    )
        throw new Error("Bill Status not found.");

    if (!_username) throw new Error(`User is required.`);
    const user = await User.findOne({where: {userName: _username}});
    if (!user) throw new Error(`User ${_username} not found`);

    let bill = await Bill.findOne(_billId);
    if (!bill) throw new Error("Bill not found,");
    if (_day) bill.day = _day;
    bill.user = user;
    if (_manager)
        bill.manager = await User.findOne({where: {userName: _manager}});
    bill.day = new Date(_day);
    bill.status = _status as BillStatus;
    const billId = (await bill.save()).billId;
    return await findOneBill(billId);
};

const findById = async (billId: number) => {
    const bill = await findOneBill(billId);
    if (bill) return bill;
    throw new Error("Not found.");
};

const deleteBill = async (billId: number) => {
    const bill = await Bill.findOne(billId);
    const billDetails = await BillDetail.find({where: {billId}});
    billDetails.forEach(async billDetail => await billDetail.remove());
    await bill.remove();
};

const getAll = async (
    day?: Date,
    length?: number,
    offset?: number,
    createdBill: boolean = false,
    paidBill: boolean = false,
    preparingBill: boolean = false,
    prepareDoneBill: boolean = false,
    deliveringBill: boolean = false,
    completeBill: boolean = false
) => {
    let result: Bill[] = [];
    const listBills = await Bill.find({
        skip: offset,
        take: length,
        relations: ["billDetails", "user"]
    });
    if (createdBill)
        result = [
            ...result,
            ...listBills.filter(e => e.status === BillStatus.Created)
        ];
    if (paidBill)
        result = [
            ...result,
            ...listBills.filter(e => e.status === BillStatus.Paid)
        ];
    if (preparingBill)
        result = [
            ...result,
            ...listBills.filter(e => e.status === BillStatus.Preparing)
        ];
    if (prepareDoneBill)
        result = [
            ...result,
            ...listBills.filter(e => e.status === BillStatus.PrepareDone)
        ];
    if (deliveringBill)
        result = [
            ...result,
            ...listBills.filter(e => e.status === BillStatus.Delivering)
        ];
    if (completeBill)
        result = [
            ...result,
            ...listBills.filter(e => e.status === BillStatus.Complete)
        ];

    if (day) {
        day = new Date(day);
        result = result.filter(e => e.day.getUTCDate() === day.getUTCDate() && e.day.getMonth() === day.getMonth() &&
            e.day.getFullYear() === day.getFullYear());
    }

    return result;
};

const getAllUserBills = async (
    username: string,
    length?: number,
    offset?: number
) => {
    const listOwnerBill = await Bill.find({
        skip: offset,
        take: length,
        where: {username: username},
        relations: ["billDetails", "user"]
    });
    const listManageBill = await Bill.find({
        skip: offset,
        take: length,
        where: {managerUsername: username},
        relations: ["billDetails", "user"]
    });
    const result = listOwnerBill;
    listManageBill.forEach(e => {
        if (result.indexOf(e) < 0) result.push(e);
    });
    return result;
};

const addDish = async (dishId: number, billId: number, price: number, quantity?: number) => {
    const dish = await Dish.findOne(dishId);
    if (!dish) throw new Error("Dish not found.");

    if (await BillDetail.findOne({dishId, billId}))
        throw new Error("Dish existed in bill");

    let billDetail = new BillDetail();
    billDetail.dish = dish;

    const bill = await Bill.findOne(billId);
    if (!bill) throw new Error("Bill not found.");

    const listDishes = await DailyDish.find({where: {dishId}});
    if (!listDishes.find(e => new Date(e.day).getDate() == bill.day.getDate()
        && new Date(e.day).getMonth() == bill.day.getMonth()
        && new Date(e.day).getFullYear() == bill.day.getFullYear()))
        throw new Error(`This dish isn't sell on ${bill.day.toDateString()}.`);

    billDetail.bill = bill;
    billDetail.price = price;
    billDetail.quantity = quantity || 1;

    await billDetail.save();

    return await findOneBill(billId);
};

const removeDish = async (dishId: number, billId: number) => {
    const billDetail = await BillDetail.findOne({dishId, billId});
    if (!billDetail) throw new Error("Not found to delete.");
    await billDetail.remove();
    return await Bill.findOne(billId, {relations: ["billDetails"]});
};

const updateStatus = async (
    billId: number,
    status: string,
    managerUsername: string,
    haveMasterPermission: boolean
) => {
    if (
        Object.keys(BillStatus)
            .map(i => BillStatus[i])
            .indexOf(status) < 0
    )
        throw new Error("Bill Status not found.");

    let bill = await Bill.findOne(billId);
    if (!bill) throw new Error("Bill not found.");

    //Check previous status can change to new status
    if (!haveMasterPermission) {
        switch (bill.status) {
            case BillStatus.Created:
                if (status != BillStatus.Paid)
                    throw new Error("This bill is not paid.");
                break;
            case BillStatus.Preparing:
                if (status == BillStatus.Created)
                    throw new Error("The preparing bill can't change to created status.");
                if (status != BillStatus.PrepareDone)
                    throw new Error("Dishes of this bill is not finished preparing.");
                break;
            case BillStatus.PrepareDone:
                if (status == BillStatus.Created || status == BillStatus.Paid)
                    throw new Error(
                        "This bill is finished preparing, can't change status to not prepare."
                    );
                break;
            case BillStatus.Delivering:
                if (status != BillStatus.Complete && status != BillStatus.Shipping)
                    throw new Error("This bill is being delivering.");
                break;
            case BillStatus.Shipping:
                if (status != BillStatus.Complete && status != BillStatus.Delivering)
                    throw new Error("This bill is being delivering.");
                break;
            case BillStatus.Complete:
                throw new Error("Can't change status of Completed bill.");
            case BillStatus.Paid:
                if (status == BillStatus.Created)
                    throw new Error("The paid bill can't change to created status.");
        }
    }

    // Check manager bill
    if (!haveMasterPermission)
        if (
            status == BillStatus.PrepareDone ||
            status == BillStatus.Complete ||
            bill.status == status
        ) {
            if (bill.managerUsername !== managerUsername)
                throw new Error(
                    "Another user managed this bill. You can't change this bill's status"
                );
        }

    // Check can change to new status
    if (!haveMasterPermission) {
        if (status == BillStatus.Delivering || status == BillStatus.Shipping) {
            if (
                bill.status !== BillStatus.PrepareDone &&
                bill.status !== BillStatus.Delivering &&
                bill.status !== BillStatus.Shipping
            )
                throw new Error("Dishes of this bill is not finished preparing.");
        }
    }

    // Add manager
    if (
        status == BillStatus.Paid ||
        status == BillStatus.Preparing ||
        status == BillStatus.Shipping ||
        status == BillStatus.Delivering
    ) {
        bill.managerUsername = managerUsername;
    }

    bill.status = status as BillStatus;
    await bill.save();
    return await findOneBill(billId);
};

const countByDate = async (startDate: Date, endDate?: Date) => {
    let start = new Date(startDate);
    const end = new Date(endDate);

    console.log(start);
    if((end.getTime() - start.getTime()) / (1000*60*60*24) > 60)
        throw new Error("Exceeding amount days is 60 days.");
    if(start > end) throw new Error("Start day must be less then end day.");

    // return await Bill.findAndCount({where: {}});
    const listBill: Bill[] = await getConnection().createQueryBuilder().from(Bill, 'bill')
        .where('day > :startDate', {startDate: new Date(startDate)})
        .andWhere('day < :endDate', {endDate: endDate ? new Date(endDate) : new Date()})
        .execute();
    const result = [];

    while(start <= end) {
        const count = listBill.filter(e => e.day.getUTCDate() === start.getUTCDate()
            && e.day.getUTCMonth() === start.getUTCMonth() && e.day.getUTCFullYear() === start.getUTCFullYear()).length;
        result.push({day: `${start.getUTCDate()}/${start.getUTCMonth() + 1}/${start.getUTCFullYear()}`, count});
        start = new Date(start.getTime() + 1000*60*60*24);
    }

    return result;
};

const getDishOrderedByDay = async (dishId: number, startDate: Date, endDate?: Date) => {
    let start = new Date(startDate);
    const end = new Date(endDate);

    console.log(start);
    if((end.getTime() - start.getTime()) / (1000*60*60*24) > 60)
        throw new Error("Exceeding amount days is 60 days.");
    if(start > end) throw new Error("Start day must be less then end day.");

    let listBill: Bill[] = await Bill.find({relations: ["billDetails"]});

    listBill.forEach(e => e.billDetails.forEach(e1 => e1.dishId == dishId ? console.log(e1.dishId): console.log()));
        
    const result = [];

    while(start <= end) {
        const count = listBill.filter(e => e.day.getUTCDate() === start.getUTCDate()
            && e.day.getUTCMonth() === start.getUTCMonth() && e.day.getUTCFullYear() === start.getUTCFullYear() 
            && e.billDetails.find(bd => bd.dishId == dishId)).length;
        result.push({day: `${start.getUTCDate()}/${start.getUTCMonth() + 1}/${start.getUTCFullYear()}`, count});
        start = new Date(start.getTime() + 1000*60*60*24);
    }

    return result;
}

export {
    create,
    findById,
    deleteBill,
    getAll,
    edit,
    addDish,
    removeDish,
    updateStatus,
    getAllUserBills,
    countByDate,
    getDishOrderedByDay
};
