import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    public permissionId: number;

    @Column({unique: true})
    public slug: string;

    @Column({length: 100})
    public name: string;

    @Column({nullable: true})
    public Description: string;
}
