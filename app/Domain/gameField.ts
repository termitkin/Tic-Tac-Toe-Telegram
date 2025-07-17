import type { Mark } from './game.js';

export type CellState = Mark | typeof EMPTY_CELL;
export type CellIndex = number;
export type EmptyCellsList = CellIndex[];
export type GameField = CellState[];
export type WinningCombination = readonly [number, number, number];

export const EMPTY_CELL = '';

export const winningCombinations: WinningCombination[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getNewField = (): GameField => [
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
  EMPTY_CELL,
];

export const checkCellIsEmpty = (gameField: GameField, cellIndex: CellIndex): boolean =>
  gameField[cellIndex] === EMPTY_CELL;

export const getEmptyCellsList = (gameField: GameField): EmptyCellsList => {
  const newGameField = gameField.slice();
  const emptyCellsList: EmptyCellsList = [];

  for (const cellIndex in newGameField) {
    if (checkCellIsEmpty(newGameField, Number(cellIndex))) {
      emptyCellsList.push(Number(cellIndex));
    }
  }

  return emptyCellsList;
};

export const getRandomEmptyCell = (gameField: GameField): CellIndex => {
  const newGameField = gameField.slice();
  const emptyCellsList = getEmptyCellsList(newGameField);

  return emptyCellsList[Math.round(Math.random() * (emptyCellsList.length - 1))];
};

export const markCell = (gameField: GameField, cellIndex: CellIndex | null, mark: Mark): GameField => {
  const newGameField = gameField.slice();

  if (cellIndex !== null) {
    newGameField[cellIndex] = mark;
  }

  return newGameField;
};
