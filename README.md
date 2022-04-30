#Tic Tac Toe game for telegram

[Click to play](https://t.me/noughts_and_crosses_game_bot)

[Docker image](https://hub.docker.com/repository/docker/termitkin/tic-tac-toe-telegram)

### Example of docker-compose.yml

```yml
version: "3.8"
services:
  mongodb:
    image: mongo:3.6.3
    container_name: tic-tac-toe-telegram-mongodb
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - tic-tac-toe-telegram-mongodb:/data/db
    restart: unless-stopped

  tic-tac-toe-telegram:
    image: termitkin/tic-tac-toe-telegram:latest
    container_name: tic-tac-toe-telegram
    restart: unless-stopped
    ports:
      - "7000:7000"
    environment:
      - TELEGRAM_BOT_TOKEN
      - TELEGRAM_BOT_CHAT_ID
    env_file:
      - .env

volumes:
  tic-tac-toe-telegram-mongodb:
```

### Example of .env

```dotenv
TELEGRAM_BOT_TOKEN=token
TELEGRAM_BOT_CHAT_ID=chatId
```

### Example of nginx block

```nginx
# Tic Tac Toe telegram bot
location ^~ /tic-tac-toe-telegram-bot/bot-token {
  proxy_pass http://0.0.0.0:7000/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

### Docker build

```bash
docker build -t termitkin/tic-tac-toe-telegram:latest .
```

### Run docker container

```bash
docker pull termitkin/tic-tac-toe-telegram:latest && docker-compose up -d
```
