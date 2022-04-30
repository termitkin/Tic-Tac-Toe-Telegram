import type { GameField } from '../Domain/gameField.js';

const generateGameField = (gameField: GameField): string => {
  const reply = {
    inline_keyboard: [[], [], []],
  };

  for (let i = 0, k = 0, w = 0; i < gameField.length; i += 1, w += 1) {
    if (w === 3) {
      w = 0;
    }

    if (gameField[i] === 'x') {
      reply.inline_keyboard[k][w] = { text: '❌', callback_data: 'player' };
    } else if (gameField[i] === 'o') {
      reply.inline_keyboard[k][w] = { text: '⭕', callback_data: 'bot' };
    } else {
      reply.inline_keyboard[k][w] = { text: ' ', callback_data: `${i}` };
    }

    if (i === 2 || i === 5) {
      k += 1;
    }
  }

  return JSON.stringify(reply);
};

export { generateGameField };
