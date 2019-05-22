import {BaseEntity, Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Bill} from './Bill';
import {Comment} from './Comment';
import {Favorite} from './Favorite';
import {Role} from './Role';

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

    @Column({select: false})
    public password: string;

    @Column({nullable: true})
    public avatar: string;

    @Column({length: 100, nullable: true})
    public fullName: string;

    @Column("date", {nullable: true})
    public birthday: Date;

    @Column("int", {default: 0})
    public point: number;

    @ManyToOne(_type => Role, role => role.users)
    @JoinColumn({referencedColumnName: 'slug', name: 'role'})
    public userRole: Role;

    @Column()
    public role: string;

    @Column('text', {array: true, nullable: true})
    public permissions: string[];

    @OneToMany(_type => Bill, bill => bill.user, {nullable: true})
    public bills: Bill[];

    @OneToMany(_type => Favorite, favorite => favorite.user)
    public favorites: Favorite[];

    @OneToMany(_type => Comment, comment => comment.user)
    public comments: Comment[];
}
