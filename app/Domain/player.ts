import { getActorMark, PLAYER } from './game.js';
import { markCell } from './gameField.js';
import type { CellIndex, GameField } from './gameField.js';

export const makePlayerMove = (gameField: GameField, cellIndex: CellIndex): GameField => {
  const newGameField = gameField.slice();

  return markCell(newGameField, cellIndex, getActorMark(PLAYER));
};
