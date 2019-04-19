import * as dotenv from 'dotenv';
import {createServer} from 'http';
import {app} from './app';

// Config to use environment variable
dotenv.config();

// Create port
const port = process.env.PORT || 8000;

app.set('port', port);

const server = createServer(app);

server.listen(port, () => {
   console.log('App listening on ' + port);
});


