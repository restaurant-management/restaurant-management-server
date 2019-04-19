import {Column} from 'typeorm/decorator/columns/Column';
import {PrimaryGeneratedColumn} from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import {Entity} from 'typeorm/decorator/entity/Entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public age: number;

}
