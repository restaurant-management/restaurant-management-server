import {Request, Response} from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

app.get('*', (_req: Request, res: Response) =>
    res.status(200).send({
        message: 'Welcome to test typescript',
    }),
);
