import {getConnection} from 'typeorm';
import {Dish} from '../entities/Dish';

const create = async (_name: string, _description?: string, _images: string[] = [], _defaultPrice: number = 0) => {
    let newDish = new Dish();
    newDish.name = _name;
    newDish.description = _description;
    newDish.images = _images;
    newDish.defaultPrice = _defaultPrice;
    const dish = await newDish.save();

    if (dish) return {dish};
    return {};
};

const update = async (dishId: number, _name: string, _description?: string, _images: string[] = [], _defaultPrice: number = 0) => {
    let dish = await Dish.findOne(dishId);
    dish.name = _name;
    dish.description = _description;
    dish.images = _images;
    dish.defaultPrice = _defaultPrice;
    const updated = await dish.save();
    if (updated) return {dish: updated};
    return {};
};

const deleteDish = async (dishId: number) => {
    const result = await getConnection().createQueryBuilder()
        .delete().from(Dish)
        .where('dishId = :dishId', {dishId})
        .execute();
    return result.affected >= 1;
};

const findById = async (dishId: number) => {
    const dish = await Dish.findOne(dishId);

    if (dish) return {dish};
    return {};
};

const getAll = async () => {
    return await Dish.find();
};

export {create, getAll, deleteDish, findById, update}
