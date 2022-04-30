import type { Actor } from './game.js';

export type Score = number;
export type Scores = {
  player: Score;
  bot: Score;
};

export const getNewScores = (): Scores => {
  return {
    player: 0,
    bot: 0,
  };
};

export const addScore = (scores: Scores, actor: Actor): Scores => {
  const newScores: Scores = {
    player: scores.player,
    bot: scores.bot,
  };

  if (actor === 'player') {
    newScores.player += 1;
  } else if (actor === 'bot') {
    newScores.bot += 1;
  }

  return newScores;
};
