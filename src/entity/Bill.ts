import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BillDetail} from './BillDetail';
import {User} from './User';

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    public billId: number;

    @Column("date")
    public day: Date;

    @ManyToOne(_type => User, user => user.bills)
    public user: User;

    @OneToMany(_type => BillDetail, billDetail => billDetail.bill)
    public billDetails: BillDetail[];
}
