import type { Scores } from '../Domain/scores';

export type Message = string;

const generateMessage = (text: Message, scores: Scores): Message => {
  let message = '';

  if (text.length) {
    message += `${text}\n`;
  }

  message += `Scores:\nyou: ${scores.player}\nbot: ${scores.bot}`;

  return message;
};

export { generateMessage };
