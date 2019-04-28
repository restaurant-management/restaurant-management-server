import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Authority {
    @PrimaryGeneratedColumn()
    public authorityId: number;

    @Column({
        length: 100
    })
    public name: string;

    @Column({
        nullable: true
    })
    public Description: string;
}
