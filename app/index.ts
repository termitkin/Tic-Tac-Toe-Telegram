import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { sendMessage } from './Application/sendMessage.js';
import { parseMessage } from './Application/parseMessage.js';
import { gameManager, newGame } from './Domain/game.js';
import { PlayerModel } from './models/player.js';
import type { PlayerDoc } from './models/player.js';

const APP_PORT = 7000;

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://mongodb:27017/tic-tac-toe')
  .catch((error) => console.log('CONNECTION NOT OPENED BECAUSE:\n', error));

mongoose.connection.on('error', (error) => console.log('SOME DB ERROR:\n', error));
mongoose.connection.on('open', () => console.log('mongo connection opened'));

app.post('/', async (req: Request, res: Response) => {
  const parsedMessage = parseMessage(req);

  if (!parsedMessage) {
    return res.status(200).send('ok');
  }

  const { chatId, playerId, playerName } = parsedMessage;

  let player: PlayerDoc = await PlayerModel.findOne({ id: playerId });

  if (!player) {
    const { gameField, scores } = newGame();

    await PlayerModel.create({
      id: playerId,
      username: playerName,
      gameField,
      scores,
    });

    await sendMessage(chatId, {
      message: `Hello, ${playerName}!`,
      gameField,
      scores,
    }).catch((e) => console.log(e));

    return res.status(200).send('ok');
  } else {
    if (!('gameFieldData' in parsedMessage)) {
      await sendMessage(chatId, {
        message: `Hello, ${player.username}!`,
        gameField: player.gameField,
        scores: player.scores,
      }).catch((e) => console.log(e));

      return res.status(200).send('ok');
    } else if ('gameFieldData' in parsedMessage) {
      const { gameField, scores, message } = gameManager(
        player.gameField,
        Number(parsedMessage.gameFieldData),
        player.scores
      );

      await PlayerModel.updateOne({ id: playerId }, { gameField, scores });

      await sendMessage(chatId, {
        message,
        gameField,
        scores,
      }).catch((e) => console.log(e));

      return res.status(200).send('ok');
    }
  }
});

app.listen(APP_PORT, () => console.log(`server is listening on ${APP_PORT}`));
