import { buildQuery } from './buildQuery.js';
import { buildUrl } from './buildUrl.js';
import { generateGameField } from './generateGameField.js';
import { generateMessage } from './generateMessage.js';
import type { ChatId } from './parseMessage.js';

const sendMessage = (chatId: ChatId, game): Promise<boolean> => {
  const keyboard = generateGameField(game.gameField);
  const message = generateMessage(game.message, game.scores);
  const urlQuery = buildQuery(chatId, message, keyboard);
  const url = buildUrl(urlQuery);

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.ok);
};

export { sendMessage };
