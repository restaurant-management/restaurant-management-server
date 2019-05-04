import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {Bill} from './Bill';
import {Dish} from './Dish';

@Entity()
export class BillDetail extends BaseEntity{
    @ManyToOne(_type => Bill, bill => bill.billDetails, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'billId'})
    public bill: Bill;

    @PrimaryColumn()
    public billId: number;

    @ManyToOne(_type => Dish, dish => dish.billDetails)
    @JoinColumn({name: 'dishId'})
    public dish: Dish;

    @PrimaryColumn()
    public dishId: number;

    @Column("int", {default: 1})
    public quantity: number;
}
