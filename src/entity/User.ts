import {BaseEntity, Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Bill} from './Bill';
import {GroupUser} from './GroupUser';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public userId: number;

    @Column()
    @Generated("uuid")
    public uuid: string;

    @Column({unique: true})
    public userName: string;

    @Column({unique: true})
    public email: string;

    @Column()
    public password: string;

    @Column({
        length: 100,
        nullable: true
    })
    public fullName: string;

    @Column("date", {
        nullable: true
    })
    public birthday: Date;

    @Column("int", {
        default: 0
    })
    public point: number;

    @ManyToOne(_type => GroupUser, groupUser => groupUser.users)
    public Group: GroupUser;

    @OneToMany(_type => Bill, bill => bill.user, {
        nullable: true
    })
    public bills: Bill[];
}
