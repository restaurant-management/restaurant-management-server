import {getConnection} from 'typeorm';
import {Dish} from '../entities/Dish';

const create = async (_name: string, _description: string = '', _images: string[] = [], _defaultPrice: number = 0) => {
    let newDish = new Dish();
    newDish.name = _name;
    newDish.description = _description;
    newDish.images = _images;
    newDish.defaultPrice = _defaultPrice;
    return await newDish.save();
};

const update = async (dishId: number, _name?: string, _description?: string, _images?: string[], _defaultPrice?: number) => {
    let dish = await Dish.findOne(dishId);
    if (!dish) throw new Error('Dish not found.');
    if (_name) dish.name = _name;
    if (_description) dish.description = _description;
    if (_images) dish.images = _images;
    if (_defaultPrice) dish.defaultPrice = _defaultPrice;
    return await dish.save();
};

const deleteDish = async (dishId: number) => {
    const result = await getConnection().createQueryBuilder()
        .delete().from(Dish)
        .where('dishId = :dishId', {dishId})
        .execute();
    if (result.affected < 1) throw new Error('Delete failed.');
};

const findById = async (dishId: number) => {
    const dish = await Dish.findOne(dishId);

    if (dish) return dish;
    throw new Error('Not found.');
};

const getAll = async () => {
    return await Dish.find();
};

export {create, getAll, deleteDish, findById, update}
