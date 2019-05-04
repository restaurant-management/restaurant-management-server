import {DailyDish, DailyDishStatus, DaySession} from '../entities/DailyDish';
import {Dish} from '../entities/Dish';

const create = async (day: Date, dishId: number, session?: string, status?: string, price?: number) => {
    if (session && Object.keys(DaySession).map(i => DaySession[i]).indexOf(session) < 0)
        throw new Error('Session not found.');
    if (status && Object.keys(DailyDishStatus).map(i => DailyDishStatus[i]).indexOf(status) < 0)
        throw new Error('Status not found.');

    let dailyDish = new DailyDish();
    dailyDish.day = day;
    dailyDish.session = session as DaySession;
    let dish = await Dish.findOne(dishId);
    if (!dish) throw new Error('Dish not found.');
    dailyDish.dish = dish;
    dailyDish.status = status as DailyDishStatus;
    dailyDish.price = price;
    const saved = await dailyDish.save();
    if (saved) return saved;
    throw new Error('Create daily dish failed.')
};

const deleteDailyDish = async (day: Date, dishId: number, session: string = DaySession.None) => {
    const dailyDish = await DailyDish.findOne({day, dishId, session: session as DaySession});
    if (!dailyDish) throw new Error('Not found.');
    await dailyDish.remove();
};

const edit = async (day: Date, dishId: number, session: string, status?: string, price?: number) => {
    // Check status is correct
    if (status &&
        Object.keys(DailyDishStatus).map(i => DailyDishStatus[i]).indexOf(status) < 0)
        throw new Error('Daily Dish Status not found.');

    let dailyDish = await DailyDish.findOne({day, dishId, session: session as DaySession});
    if (status) dailyDish.status = status as DailyDishStatus;
    if (price) dailyDish.price = price;
    const saved = await dailyDish.save();
    if (saved) return saved;
    throw new Error('Update failed.');
};

const getAll = async (length?: number, offset?: number) => {
    return await DailyDish.find({skip: offset, take: length});
};

const getBy = async (day?: Date, dishId?: number, session?: string, length?: number, offset?: number) => {
    let where = {};
    if(day) where['day'] = day;
    if(dishId) where['dishId'] = dishId;
    if(session) where['session'] = session;
    return await DailyDish.find({where, skip: offset, take: length});
};

export {create, deleteDailyDish, getAll, edit, getBy}
