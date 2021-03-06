import { URLSearchParams } from 'url';

export const buildQuery = (chat_id, text, reply_markup): string => {
  return new URLSearchParams({
    chat_id,
    text,
    reply_markup,
    parse_mode: 'HTML',
  }).toString();
};
