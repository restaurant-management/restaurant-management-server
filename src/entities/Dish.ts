import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BillDetail} from './BillDetail';
import {DailyDishDetail} from './DailyDishDetail';

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

    @ManyToOne(_type => DailyDishDetail, dailyDishDetail => dailyDishDetail.dishes, {nullable: true})
    public dailyDishDetail: DailyDishDetail;
}
