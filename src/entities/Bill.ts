import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BillDetail} from './BillDetail';
import {User} from './User';

export enum BillStatus {
    Created = 'created',
    Preparing = 'preparing',
    PrepareDone = 'prepare-done',
    Delivering = 'delivering',
    Shiping = 'shipping',
    Complete = 'complete'
}

@Entity()
export class Bill extends BaseEntity{
    @PrimaryGeneratedColumn()
    public billId: number;

    @Column('timestamp with time zone')
    public day: Date;

    @Column({
        type: 'enum',
        enum: Object.keys(BillStatus).map(value => BillStatus[value]),
        default: BillStatus.Created
    })
    public status: BillStatus;

    @ManyToOne(_type => User, user => user.bills)
    @JoinColumn({name: 'username', referencedColumnName: 'userName'})
    public user: User;

    @Column()
    public username: string;

    @OneToMany(_type => BillDetail, billDetail => billDetail.bill,
        {cascade: true})
    public billDetails: BillDetail[];
}
