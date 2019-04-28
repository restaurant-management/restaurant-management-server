import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {Bill} from './Bill';
import {Dish} from './Dish';

@Entity()
export class BillDetail {
    @ManyToOne(_type => Bill, bill => bill.billDetails)
    @JoinColumn({name: 'billId'})
    public bill: Bill;

    @PrimaryColumn()
    public billId: number;

    @ManyToOne(_type => Dish, dish => dish.billDetails)
    @JoinColumn({name: 'dishId'})
    public dish: Dish;

    @PrimaryColumn()
    public dishId: number;

    @Column("int", {
        default: 0
    })
    public quantity: number;
}
