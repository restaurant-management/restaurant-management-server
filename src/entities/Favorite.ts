import {BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {Dish} from './Dish';
import {User} from './User';

@Entity()
export class Favorite extends BaseEntity {
    @PrimaryColumn()
    public username: string;

    @PrimaryColumn()
    public dishId: number;

    @ManyToOne(_type => User, user => user.favorites)
    @JoinColumn({name: 'username', referencedColumnName: 'userName'})
    public user: User;

    @ManyToOne(_type => Dish, dish => dish.favorites)
    @JoinColumn({name: 'dishId'})
    public dish: Dish;
}
