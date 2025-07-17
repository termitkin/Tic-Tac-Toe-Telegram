import express from 'express';
import mongoose from 'mongoose';
import { handleMessage } from './application/messageController.js';

const APP_PORT = 7000;

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://mongodb:27017/tic-tac-toe')
  .catch((error) => console.log('CONNECTION NOT OPENED BECAUSE:\n', error));

mongoose.connection.on('error', (error) => console.log('SOME DB ERROR:\n', error));
mongoose.connection.on('open', () => console.log('mongo connection opened'));

app.post('/', handleMessage);

app.listen(APP_PORT, () => console.log(`server is listening on ${APP_PORT}`));
