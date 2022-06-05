import { BOT, PLAYER } from './game.js';
import type { Actor } from './game.js';

export type Score = number;
export interface Scores {
  [PLAYER]: Score;
  [BOT]: Score;
}

export const getNewScores = (): Scores => {
  return {
    [PLAYER]: 0,
    [BOT]: 0,
  };
};

export const addScore = (scores: Scores, actor: Actor): Scores => {
  const newScores: Scores = {
    [PLAYER]: scores[PLAYER],
    [BOT]: scores[BOT],
  };

  if (actor === PLAYER) {
    newScores[PLAYER] += 1;
  } else if (actor === BOT) {
    newScores[BOT] += 1;
  }

  return newScores;
};
