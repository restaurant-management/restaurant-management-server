import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import {createConnection} from 'typeorm';
import router from './src/router';

// Config to use environment variable
dotenv.config();

// Create port
const port = process.env.PORT || 8000;

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));


createConnection().then(() => {

    app.use(router);

}).catch((error) => console.log(error));

app.listen(port, () => {
    console.log('App listening on ' + port);
});
