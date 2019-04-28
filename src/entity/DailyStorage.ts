import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DailyDishDetail} from './DailyDishDetail';

export type DaySession = 'morning' | 'noon' | 'afternoon' | 'evening';

@Entity()
export class DailyStorage {
    @PrimaryGeneratedColumn()
    public dailyStorageId: number;

    @Column("date")
    public day: Date;

    @Column({
        type: 'enum',
        nullable: true,
        enum: ['morning', 'noon', 'afternoon', 'evening']
    })
    public session: DaySession;

    @ManyToOne(_type => DailyDishDetail, dailyDishDetail => dailyDishDetail.listDailyStorage)
    public dailyDishDetail: DailyDishDetail;
}
