import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {Table} from './Table';

export enum TableStatus {
    Free = 'free',
    Full = 'full'
}

export enum DaySession {
    None = 'none',
    Morning = 'morning',
    Noon = 'noon',
    Afternoon = 'afternoon',
    Evening = 'evening'
}

@Entity()
export class DailyTable extends BaseEntity {
    @PrimaryColumn('date')
    public day: Date;

    @PrimaryColumn({default: DaySession.None})
    public session: DaySession;

    @ManyToOne(_type => Table, table => table.dailyTables)
    @JoinColumn({name: 'tableId'})
    public table: Table;

    @Column({
        type: 'enum',
        enum: Object.keys(TableStatus).map(value => TableStatus[value]),
        default: TableStatus.Free
    })
    public status: TableStatus;
}
