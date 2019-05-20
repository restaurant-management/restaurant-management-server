import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {DailyTable} from './DailyTable';

@Entity()
export class Table extends BaseEntity {
    @PrimaryGeneratedColumn()
    public tableId: number;

    @Column({nullable: true})
    public name: string;

    @Column()
    public numberOfSeats: number;

    @OneToMany(_type => DailyTable, dailyTable => dailyTable.table, {nullable: true})
    public dailyTables: DailyTable[];
}
