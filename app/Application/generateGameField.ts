import { BOT, PLAYER, getActorMark } from '../Domain/game.js';
import type { GameField } from '../Domain/gameField.js';

const PLAYER_MARK = '❌';
const BOT_MARK = '⭕';

export const generateGameField = (gameField: GameField): string => {
  const reply = {
    inline_keyboard: [[], [], []],
  };

  for (let i = 0, k = 0, w = 0; i < gameField.length; i += 1, w += 1) {
    if (w === 3) {
      w = 0;
    }

    if (gameField[i] === getActorMark(PLAYER)) {
      reply.inline_keyboard[k][w] = { text: PLAYER_MARK, callback_data: PLAYER };
    } else if (gameField[i] === getActorMark(BOT)) {
      reply.inline_keyboard[k][w] = { text: BOT_MARK, callback_data: BOT };
    } else {
      reply.inline_keyboard[k][w] = { text: ' ', callback_data: `${i}` };
    }

    if (i === 2 || i === 5) {
      k += 1;
    }
  }

  return JSON.stringify(reply);
};
