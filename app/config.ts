const DEFAULT_MONGODB_URI = 'mongodb://mongodb:27017/tic-tac-toe';

export const resolveMongoDbUri = (mongoDbUri?: string): string => mongoDbUri || DEFAULT_MONGODB_URI;
