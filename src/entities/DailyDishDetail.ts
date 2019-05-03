import {Column, Entity, JoinColumn, OneToMany, PrimaryColumn} from "typeorm";
import {DailyStorage} from './DailyStorage';
import {Dish} from './Dish';

export type DailyDishStatus = 'in-stock' | 'out-of-range';

@Entity()
export class DailyDishDetail {
    @Column({
        type: 'enum',
        enum: ['in-stock', 'out-of-range'],
        default: 'out-of-range'
    })
    public status: DailyDishStatus;

    @Column('float', {default: 0})
    public price: number;

    @OneToMany(_type => DailyStorage, dailyStorage => dailyStorage.dailyDishDetail)
    @JoinColumn({name: 'dailyStorageId'})
    public listDailyStorage: DailyStorage[];

    @OneToMany(_type => Dish, dish => dish.dailyDishDetail)
    @JoinColumn({name: 'dishId'})
    public dishes: Dish[];

    @PrimaryColumn()
    public dailyStorageId: number;

    @PrimaryColumn()
    public dishId: number;
}
