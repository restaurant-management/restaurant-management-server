import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Dish} from './Dish';

export enum DailyDishStatus { InStock = 'in-stock', OutOfStock = 'out-of-stock' }

export enum DaySession {
    None = 'none',
    Morning = 'morning',
    Noon = 'noon',
    Afternoon = 'afternoon',
    Evening = 'evening'
}

@Entity()
export class DailyDish extends BaseEntity{
    @PrimaryColumn('date')
    public day: Date;

    @PrimaryColumn({default: DaySession.None})
    public session: DaySession;

    @ManyToOne(_type => Dish, dish => dish.dailyDishes, {eager: true})
    @JoinColumn({name: 'dishId'})
    public dish: Dish;

    @PrimaryColumn()
    public dishId: number;

    @Column({
        type: 'enum',
        enum: Object.keys(DailyDishStatus).map(value => DailyDishStatus[value]),
        default: DailyDishStatus.InStock
    })
    public status: DailyDishStatus;

    @Column('float', {default: 0})
    public price: number;
}
