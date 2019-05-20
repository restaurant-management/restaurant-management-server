import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Dish} from './Dish';
import {User} from './User';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    public commentId: number;

    @Column()
    public username: string;

    @Column()
    public dishId: number;

    @ManyToOne(_type => User, user => user.comments)
    @JoinColumn({name: 'username', referencedColumnName: 'userName'})
    public user: User;

    @ManyToOne(_type => Dish, dish => dish.comments)
    @JoinColumn({name: 'dishId'})
    public dish: Dish;

    @Column({nullable: false})
    public content: string;

    @CreateDateColumn({type: 'timestamp with time zone'})
    date: Date;
}
