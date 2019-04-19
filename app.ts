import {Request, Response} from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'
import {createConnection} from 'typeorm';
import ormconfig from './ormconfig';

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

// Create connection to database with config is database detail
createConnection(ormconfig).then(() => {
    app.get('*', (_req: Request, res: Response) =>
        res.status(200).send({
            message: 'Welcome to test typescript',
        }),
    );
}).catch((e) => {
    console.error(e);
});
