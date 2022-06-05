import type { Scores } from '../Domain/scores.js';
import type { Message } from '../Domain/game.js';

export const generateMessage = (text: Message, scores: Scores): Message => {
  let message = '';

  if (text.length) {
    message += `${text}\n`;
  }

  message += `Scores:\nyou: ${scores.player}\nbot: ${scores.bot}`;

  return message;
};
