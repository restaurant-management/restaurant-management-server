import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Authority} from './Authority';
import {User} from './User';

@Entity()
export class GroupUser {

    @PrimaryGeneratedColumn()
    public groupId: number;

    @Column({
        length: 100
    })
    public name: string;

    @Column({
        nullable: true
    })
    public description: string;

    @OneToMany(_type => User, user => user.Group)
    public users: User[];

    @ManyToMany(_type => Authority, {
        eager: true
    })
    @JoinTable()
    public authorities: Authority[];
}
