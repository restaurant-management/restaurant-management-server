import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BillDetail} from './BillDetail';
import {User} from './User';

export enum BillStatus {
    Preparing = 'preparing',
    PrepareDone = 'prepare-done',
    Delivering = 'delivering',
    Shiping = 'shipping',
    Complete = 'complete'
}

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    public billId: number;

    @Column("date")
    public day: Date;

    @Column({
        type: 'enum',
        enum: Object.keys(BillStatus).map(value => BillStatus[value]),
        default: BillStatus.Preparing
    })
    public status: BillStatus;

    @ManyToOne(_type => User, user => user.bills)
    public user: User;

    @OneToMany(_type => BillDetail, billDetail => billDetail.bill)
    public billDetails: BillDetail[];
}
