import type { Request, Response } from 'express';
import { getNewGame, gameManager } from '../domain/game';
import { PlayerDoc, PlayerModel } from '../models/player';
import { parseMessage } from './parseMessage';
import { sendMessage } from './sendMessage';
import type { Scores } from '../domain/scores';
import type { GameField } from '../domain/gameField';

export const handleMessage = async (req: Request, res: Response) => {
  const parsedMessage = parseMessage(req);

  if (!parsedMessage) {
    return res.status(200).send('ok');
  }

  const { chatId, playerId, playerName } = parsedMessage;

  let player: PlayerDoc = await PlayerModel.findOne({ id: playerId });
  let message: string;
  let gameField: GameField;
  let scores: Scores;

  if (!player) {
    const newGame = getNewGame();

    gameField = newGame.gameField;
    scores = newGame.scores;

    await PlayerModel.create({
      id: playerId,
      username: playerName,
      gameField,
      scores,
    });

    message = `Hello, ${playerName}!`;
  } else {
    if (!('gameFieldData' in parsedMessage)) {
      message = `Hello, ${player.username}!`;
      gameField = player.gameField;
      scores = player.scores;
    } else {
      const gameResult = gameManager(player.gameField, Number(parsedMessage.gameFieldData), player.scores);

      await PlayerModel.updateOne({ id: playerId }, { gameField: gameResult.gameField, scores: gameResult.scores });

      message = gameResult.message;
      gameField = gameResult.gameField;
      scores = gameResult.scores;
    }
  }

  await sendMessage(chatId, {
    message,
    gameField,
    scores,
  }).catch((e) => console.log(e));

  return res.status(200).send('ok');
};
