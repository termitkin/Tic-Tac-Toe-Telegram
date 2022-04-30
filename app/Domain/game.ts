import { getNewField, getEmptyCellsList, checkCellIsEmpty } from './gameField.js';
import { getNewScores, addScore } from './scores.js';
import { makeBotMove } from './bot.js';
import { makePlayerMove } from './player.js';
import type { GameField, Mark, CellIndex } from './gameField.js';
import type { Scores } from './scores.js';

export type Message = string;
export type Actor = 'player' | 'bot';
export type Game = {
  gameField: GameField;
  scores: Scores;
  message: Message;
  actorMarks: ActorMarks;
};

export type ActorMarks = {
  readonly player: 'x';
  readonly bot: 'o';
};

export const actorMarks: ActorMarks = {
  player: 'x',
  bot: 'o',
};

export const getActorMark = (actorType: Actor): Mark => {
  if (actorType === 'player') {
    return actorMarks.player;
  } else if (actorType === 'bot') {
    return actorMarks.bot;
  }
};

export const checkIfWinnerExists = (gameField: GameField, actorType: Actor): boolean => {
  let mark: Mark;

  if (actorType === 'player') {
    mark = getActorMark(actorType);
  } else if (actorType === 'bot') {
    mark = getActorMark(actorType);
  }

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

export const newGame = (): Game => {
  const gameField = getNewField();
  const scores = getNewScores();

  return {
    gameField,
    scores,
    message: '',
    actorMarks,
  };
};

export const gameManager = (gameField: GameField, cellIndex: CellIndex, scores: Scores): Game => {
  let newGameField = gameField.slice();

  if (!checkCellIsEmpty(newGameField, cellIndex)) {
    return {
      message: '',
      scores,
      gameField: newGameField,
      actorMarks,
    };
  }

  if (getEmptyCellsList(newGameField).length !== 0) {
    newGameField = makePlayerMove(newGameField, cellIndex);
  }

  if (getEmptyCellsList(newGameField).length !== 0) {
    newGameField = makeBotMove(newGameField);
  }

  if (checkIfWinnerExists(newGameField, 'player')) {
    const newScores = addScore(scores, 'player');

    return {
      message: 'You win!',
      scores: newScores,
      gameField: getNewField(),
      actorMarks,
    };
  } else if (checkIfWinnerExists(newGameField, 'bot')) {
    const newScores = addScore(scores, 'bot');

    return {
      message: 'Bot win!',
      scores: newScores,
      gameField: getNewField(),
      actorMarks,
    };
  } else if (getEmptyCellsList(newGameField).length === 0) {
    return {
      message: 'Tie!',
      scores,
      gameField: getNewField(),
      actorMarks,
    };
  } else {
    return {
      message: '',
      scores,
      gameField: newGameField,
      actorMarks,
    };
  }
};
