import mongoose from 'mongoose';

export interface ScoresDoc {
  readonly player: number;
  readonly bot: number;
}

const ScoresSchema = new mongoose.Schema<ScoresDoc>({
  player: {
    type: Number,
    required: true,
  },
  bot: {
    type: Number,
    required: true,
  },
});

export { ScoresSchema };
