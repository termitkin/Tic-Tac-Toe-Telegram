import type { Request } from 'express';

export type ChatId = number;
export type PlayerId = number;
export type PlayerName = string;
export type ChatMessage = string;
export type GameFieldData = string;

export interface IncomingMessage {
  readonly chatId: ChatId;
  readonly playerId: PlayerId;
  readonly playerName: PlayerName;
}

export interface MessageWithText extends IncomingMessage {
  readonly chatMessage: ChatMessage;
}

export interface MessageWithKeyboard extends IncomingMessage {
  readonly gameFieldData: GameFieldData;
}

export type ParsedMessage = MessageWithText | MessageWithKeyboard;

export const parseMessage = (req: Request): ParsedMessage | null => {
  const chatId = req.body?.message?.chat?.id || req.body?.callback_query?.message?.chat?.id;
  const playerId = req.body?.message?.from?.id || req.body?.callback_query?.from?.id;
  const playerName = req.body?.message?.from?.username || req.body?.callback_query?.from?.username;
  const chatMessage = req.body?.message?.text;
  const gameFieldData = req.body?.callback_query?.data;

  if (!(chatId && playerId && playerName)) {
    console.log('chatId and/or playerId and/or playerName are not defined');
    console.log('body:', req.body);

    return null;
  }

  if (chatMessage) {
    return { chatId, playerId, playerName, chatMessage };
  } else if (gameFieldData) {
    return { chatId, playerId, playerName, gameFieldData };
  } else {
    console.log('chatMessage and/or gameFieldData are not defined');
    console.log('chatMessage:', chatMessage);
    console.log('gameFieldData:', gameFieldData);

    return null;
  }
};
