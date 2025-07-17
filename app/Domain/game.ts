import { getNewField, getEmptyCellsList, checkCellIsEmpty, winningCombinations } from './gameField.js';
import { getNewScores, addScore } from './scores.js';
import { makeBotMove } from './bot.js';
import { makePlayerMove } from './player.js';
import type { GameField, CellIndex } from './gameField.js';
import type { Scores } from './scores.js';

export const MARK_X = 'x';
export const MARK_O = 'o';

export const PLAYER = 'player';
export const BOT = 'bot';

export const MESSAGE_PLAYER_WIN = 'You win!';
export const MESSAGE_BOT_WIN = 'Bot win!';
export const MESSAGE_TIE = 'Tie!';
export const MESSAGE_EMPTY = '';

export interface Game {
  readonly gameField: GameField;
  readonly scores: Scores;
  readonly message: Message;
  readonly actorMarks: ActorMarks;
}

export type Message = string;

export type Mark = typeof MARK_X | typeof MARK_O;
export type Actor = typeof PLAYER | typeof BOT;

export interface ActorMarks {
  readonly player: typeof MARK_X;
  readonly bot: typeof MARK_O;
}

export interface WinnerData {
  status: true | false | null;
  index: CellIndex | null;
}

export const actorMarks: ActorMarks = {
  [PLAYER]: MARK_X,
  [BOT]: MARK_O,
};

export const checkIfActorCanWin = (gameField: GameField, mark: Mark): WinnerData => {
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

export const getActorMark = (actorType: Actor): Mark => {
  if (actorType === PLAYER) {
    return actorMarks[PLAYER];
  }

  return actorMarks[BOT];
};

export const checkIfWinnerExists = (gameField: GameField, actorType: Actor): boolean => {
  const mark: Mark = getActorMark(actorType);

  return (
    (gameField[0] === mark && gameField[1] === mark && gameField[2] === mark) ||
    (gameField[3] === mark && gameField[4] === mark && gameField[5] === mark) ||
    (gameField[6] === mark && gameField[7] === mark && gameField[8] === mark) ||
    (gameField[0] === mark && gameField[3] === mark && gameField[6] === mark) ||
    (gameField[1] === mark && gameField[4] === mark && gameField[7] === mark) ||
    (gameField[2] === mark && gameField[5] === mark && gameField[8] === mark) ||
    (gameField[0] === mark && gameField[4] === mark && gameField[8] === mark) ||
    (gameField[2] === mark && gameField[4] === mark && gameField[6] === mark)
  );
};

export const getNewGame = (): Game => {
  const gameField = getNewField();
  const scores = getNewScores();

  return {
    gameField,
    scores,
    message: MESSAGE_EMPTY,
    actorMarks,
  };
};

export const gameManager = (gameField: GameField, cellIndex: CellIndex, scores: Scores): Game => {
  let newGameField = gameField.slice();

  if (!checkCellIsEmpty(newGameField, cellIndex)) {
    return {
      gameField: newGameField,
      scores,
      message: MESSAGE_EMPTY,
      actorMarks,
    };
  }

  if (getEmptyCellsList(newGameField).length !== 0) {
    newGameField = makePlayerMove(newGameField, cellIndex);
  }

  if (getEmptyCellsList(newGameField).length !== 0) {
    newGameField = makeBotMove(newGameField);
  }

  if (checkIfWinnerExists(newGameField, PLAYER)) {
    const newScores = addScore(scores, PLAYER);

    return {
      message: MESSAGE_PLAYER_WIN,
      scores: newScores,
      gameField: getNewField(),
      actorMarks,
    };
  } else if (checkIfWinnerExists(newGameField, BOT)) {
    const newScores = addScore(scores, BOT);

    return {
      message: MESSAGE_BOT_WIN,
      scores: newScores,
      gameField: getNewField(),
      actorMarks,
    };
  } else if (getEmptyCellsList(newGameField).length === 0) {
    return {
      message: MESSAGE_TIE,
      scores,
      gameField: getNewField(),
      actorMarks,
    };
  } else {
    return {
      message: MESSAGE_EMPTY,
      scores,
      gameField: newGameField,
      actorMarks,
    };
  }
};
