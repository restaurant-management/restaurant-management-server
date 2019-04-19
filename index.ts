import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {Request, Response} from 'express';
import * as logger from 'morgan';

// Config to use environment variable
dotenv.config();

// Create port
const port = process.env.PORT || 8000;

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

app.get('*', (_req: Request, res: Response) =>
    res.status(200).send({
        message: 'Welcome to test typescript',
    }),
);

app.listen(port, () => {
    console.log('App listening on ' + port);
});
