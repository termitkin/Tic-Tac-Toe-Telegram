const { TELEGRAM_BOT_TOKEN } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.log('TELEGRAM_BOT_TOKEN is not defined');
  process.exit(1);
}

export const buildUrl = (query: string): string =>
  `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?${query}`;
