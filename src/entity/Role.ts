import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Permission} from './Permission';
import {User} from './User';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    public roleId: number;

    @Column({unique: true})
    public slug: string;

    @Column({length: 100})
    public name: string;

    @Column({nullable: true})
    public description: string;

    @OneToMany(_type => User, user => user.role)
    public users: User[];

    @ManyToMany(_type => Permission, {eager: true})
    @JoinTable()
    public permissions: Permission[];
}
