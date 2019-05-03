import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DailyDishDetail} from './DailyDishDetail';

export enum DaySession {
    Morning = 'morning',
    Noon = 'noon',
    Afternoon = 'afternoon',
    Evening = 'evening'
}

@Entity()
export class DailyStorage {
    @PrimaryGeneratedColumn()
    public dailyStorageId: number;

    @Column("date")
    public day: Date;

    @Column({
        type: 'enum',
        nullable: true,
        enum: Object.keys(DaySession).map(value => DaySession[value]),
    })
    public session: DaySession;

    @ManyToOne(_type => DailyDishDetail, dailyDishDetail => dailyDishDetail.listDailyStorage)
    public dailyDishDetail: DailyDishDetail;
}
