import mongoose from 'mongoose';
import { ScoresSchema } from './scores.js';
import type { ScoresDoc } from './scores.js';
import type { GameField } from '../Domain/gameField.js';

export interface PlayerDoc {
  readonly id: number;
  readonly username: string;
  readonly gameField: GameField;
  readonly scores: ScoresDoc;
}

const PlayerSchema = new mongoose.Schema<PlayerDoc>({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  gameField: {
    type: [String],
    required: true,
  },
  scores: {
    type: ScoresSchema,
    required: true,
  },
});

export const PlayerModel = mongoose.model<PlayerDoc>('player', PlayerSchema);
