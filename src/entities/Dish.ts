import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BillDetail} from './BillDetail';
import {Comment} from './Comment';
import {DailyDish} from './DailyDish';
import {Favorite} from './Favorite';

@Entity()
export class Dish extends BaseEntity{
    @PrimaryGeneratedColumn()
    public dishId: number;

    @Column({length: 100})
    public name: string;

    @Column({nullable: true})
    public description: string;

    @Column('text', {array: true})
    public images: string[];

    @Column('float', {default: 0})
    public defaultPrice: number;

    @OneToMany(_type => BillDetail, billDetail => billDetail.dish, {nullable: true})
    public billDetails: BillDetail[];

    @OneToMany(_type => DailyDish, dailyDish => dailyDish.dish, {nullable: true})
    public dailyDishes: DailyDish[];

    @OneToMany(_type => Favorite, favorite => favorite.dish)
    public favorites: Favorite[];

    @OneToMany(_type => Comment, comment => comment.dish)
    public comments: Comment[];
}
