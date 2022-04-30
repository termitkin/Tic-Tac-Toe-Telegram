import { getActorMark } from './game.js';
import type { CellIndex, GameField } from './gameField.js';

export const makePlayerMove = (gameField: GameField, cellIndex?: CellIndex): GameField => {
  const newGameField = gameField.slice();

  newGameField[cellIndex] = getActorMark('player');

  return newGameField;
};
