const { TELEGRAM_BOT_TOKEN } = process.env;

const buildUrl = (query: string): string => `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?${query}`;

export { buildUrl };
