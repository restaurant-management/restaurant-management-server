import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import {Request, Response} from 'express';
import logger from 'morgan';
import {createConnection} from 'typeorm';
import {default as ormconfig} from './ormconfig';
import {User} from './src/entity/User';

// Config to use environment variable
dotenv.config();

// Create port
const port = process.env.PORT || 8000;

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

createConnection(ormconfig).then(async (connection) => {

    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');

    app.get('*', (_req: Request, res: Response) =>
        res.status(200).send({
            message: users,
        }),
    );

}).catch((error) => console.log(error));

app.listen(port, () => {
    console.log('App listening on ' + port);
});
