import { URLSearchParams } from 'node:url';

export const buildQuery = (chat_id: number, text: string, reply_markup: string): string => {
  return new URLSearchParams({
    chat_id: chat_id.toString(),
    text,
    reply_markup,
    parse_mode: 'HTML',
  }).toString();
};
