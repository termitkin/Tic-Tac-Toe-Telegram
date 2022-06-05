import { getRandomEmptyCell, markCell } from './gameField.js';
import { BOT, PLAYER, getActorMark } from './game.js';
import { checkIfActorCanWin } from './game.js';
import type { GameField } from './gameField.js';

export const makeBotMove = (gameField: GameField): GameField => {
  const newGameField = gameField.slice();
  const botCanWin = checkIfActorCanWin(newGameField, getActorMark(BOT));
  const playerCanWin = checkIfActorCanWin(newGameField, getActorMark(PLAYER));
  const randomEmptyCell = getRandomEmptyCell(newGameField);

  if (botCanWin.status) {
    return markCell(newGameField, botCanWin.index, getActorMark(BOT));
  } else if (playerCanWin.status) {
    return markCell(newGameField, playerCanWin.index, getActorMark(BOT));
  } else {
    return markCell(newGameField, randomEmptyCell, getActorMark(BOT));
  }
};
