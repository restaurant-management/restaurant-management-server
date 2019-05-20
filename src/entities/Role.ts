import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity()
export class Role extends BaseEntity{

    @PrimaryGeneratedColumn()
    public roleId: number;

    @Column({unique: true})
    public slug: string;

    @Column({length: 100})
    public name: string;

    @Column({nullable: true})
    public description: string;

    @Column('text', {array: true, nullable: true})
    public permissions: string[];

    @OneToMany(_type => User, user => user.userRole)
    public users: User[];
}
