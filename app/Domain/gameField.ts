export type Mark = 'x' | 'o';
export type CellState = Mark | '';
export type CellIndex = number;
export type EmptyCellsList = CellIndex[];
export type GameField = CellState[];
export type WinningCombination = readonly [number, number, number];

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

export const getNewField = (): GameField => ['', '', '', '', '', '', '', '', ''];

export const checkCellIsEmpty = (gameField: GameField, cellIndex: CellIndex): boolean => gameField[cellIndex] === '';

export const getEmptyCellsList = (gameField: GameField): EmptyCellsList => {
  const emptyCellsList = [];

  for (const cellIndex in gameField) {
    if (checkCellIsEmpty(gameField, Number(cellIndex))) {
      emptyCellsList.push(cellIndex);
    }
  }

  return emptyCellsList;
};

export const getRandomEmptyCell = (gameField: GameField): CellIndex => {
  const newGameField = gameField.slice();
  const emptyCellsList = getEmptyCellsList(newGameField);

  return emptyCellsList[Math.round(Math.random() * (emptyCellsList.length - 1))];
};

export const markCell = (gameField: GameField, cellIndex: CellIndex, mark: Mark): GameField => {
  const newGameField = gameField.slice();

  newGameField[cellIndex] = mark;

  return newGameField;
};
