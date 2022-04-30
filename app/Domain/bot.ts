import { markCell, getRandomEmptyCell, winningCombinations } from './gameField.js';
import { getActorMark } from './game.js';
import type { GameField, Mark, CellIndex } from './gameField.js';

export type WinnerData = {
  status: true | null;
  index: CellIndex | null;
};

export const checkIfPlayerCanWin = (gameField: GameField, mark: Mark): WinnerData => {
  const winnerData: WinnerData = {
    status: null,
    index: null,
  };

  for (const i in winningCombinations) {
    if (
      gameField[winningCombinations[i][1]] === mark &&
      gameField[winningCombinations[i][2]] === mark &&
      gameField[winningCombinations[i][0]] === ''
    ) {
      winnerData.status = true;
      winnerData.index = winningCombinations[i][0];
      break;
    } else if (
      gameField[winningCombinations[i][0]] === mark &&
      gameField[winningCombinations[i][2]] === mark &&
      gameField[winningCombinations[i][1]] === ''
    ) {
      winnerData.status = true;
      winnerData.index = winningCombinations[i][1];
      break;
    } else if (
      gameField[winningCombinations[i][0]] === mark &&
      gameField[winningCombinations[i][1]] === mark &&
      gameField[winningCombinations[i][2]] === ''
    ) {
      winnerData.status = true;
      winnerData.index = winningCombinations[i][2];
      break;
    }
  }

  return winnerData;
};

export const makeBotMove = (gameField: GameField): GameField => {
  const newGameField = gameField.slice();
  const botCanWin = checkIfPlayerCanWin(newGameField, getActorMark('bot'));
  const playerCanWin = checkIfPlayerCanWin(newGameField, getActorMark('player'));
  const randomEmptyCell = getRandomEmptyCell(newGameField);

  if (botCanWin.status) {
    return markCell(newGameField, botCanWin.index, getActorMark('bot'));
  } else if (playerCanWin.status) {
    return markCell(newGameField, playerCanWin.index, getActorMark('bot'));
  } else {
    return markCell(newGameField, randomEmptyCell, getActorMark('bot'));
  }
};
