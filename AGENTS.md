# AGENTS.md

Telegram-бот «Крестики-нолики» ([@noughts_and_crosses_game_bot](https://t.me/noughts_and_crosses_game_bot)): webhook-сервер на Express, состояние игр и счёт хранятся в MongoDB.

## Стек

- Node.js 22 (production-образ — `node:22.12.0-alpine`).
- TypeScript 5, ES modules (`"type": "module"`), сборка `tsc` в `dist/`.
- Express 5 (webhook-сервер), Mongoose 8 (хранение).
- Yarn Classic; точные версии зафиксированы в `yarn.lock`. Держите `yarn.lock` в синхроне с `package.json`, зависимости через npm не ставьте.

## Команды

| Задача | Команда |
|--------|---------|
| Установка | `yarn install` (в CI — `yarn install --frozen-lockfile`) |
| Сборка | `yarn build` (`tsc` → `dist/`, не коммитится) |
| Тесты | `yarn test` (сначала сборка, затем `node --test dist/config.test.js`) |
| Полная проверка | `yarn run check` (build + test) |
| Запуск | `yarn dev` (= `tsc && node dist/index.js`) или `yarn build` + `yarn start` |

**ВАЖНО:** запускайте именно `yarn run check`. В Yarn Classic `yarn check` — встроенная проверка зависимостей Yarn, а не скрипт репозитория.

Скрипта `lint` нет: `.eslintrc.json` и `.prettierrc` лежат в репозитории, но в проверки не подключены.

## Запуск бота локально

Сервер слушает порт `7000` (константа в `app/index.ts`), webhook-обработчик — `POST /`.

Переменные окружения:

- `TELEGRAM_BOT_TOKEN` — обязателен: без него процесс сразу завершается (`app/Application/buildUrl.ts`).
- `MONGODB_URI` — строка подключения к MongoDB; если не задана, используется `mongodb://mongodb:27017/tic-tac-toe` (для контейнерного деплоя, `app/config.ts`). В управляемых dev-окружениях используйте выданный `MONGODB_URI` и не поднимайте отдельную базу.
- `TELEGRAM_BOT_CHAT_ID` встречается в примере деплоя (README), но приложением не читается — chat ID приходит в каждом webhook-запросе.

Чтобы получать запросы, webhook бота должен указывать на локальный сервер через доступный HTTPS-эндпоинт.

## Структура

- `app/index.ts` — Express-сервер, подключение к MongoDB, регистрация webhook-обработчика.
- `app/config.ts` (+ `config.test.ts`) — выбор MongoDB URI.
- `app/Application/` — разбор запроса и оркестрация (`messageController.ts`), построение сообщений Telegram API и отправка.
- `app/Domain/` — правила игры и доменные типы: игра, игроки, счёт, поле, бот.
- `app/models/` — Mongoose-модели.
- `openspec/changes/` — OpenSpec-изменения.

Игровые правила и детерминированная логика — в `app/Domain/`; транспорт и координация сценариев — в `app/Application/`; схемы хранения — в `app/models/`.

## Деплой

- `Dockerfile`: двухстадийная сборка (`yarn install --frozen-lockfile` + `yarn run build`, затем production-зависимости и `dist/`), старт `npm run start`.
- CI — Gitea Actions, `.gitea/workflows/ci.yml`: на push в `main`, pull request и вручную запускается `yarn run check`, затем `docker build`. Только на push в `main` после успешной проверки образ публикуется в DockerHub как `${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest` (секреты `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `DOCKERHUB_REPO`).
- `docker-compose.yml`: образ `termitkin/tic-tac-toe-telegram:latest`, внешняя сеть `mongodb`, `.env`, автообновление через Watchtower (label `com.centurylinklabs.watchtower.enable`).

## Git

- Под каждую задачу — отдельная ветка и worktree; не разрабатывайте напрямую в `main`.
- Короткие описательные имена веток: `docs/add-contributor-guide`, `fix/validate-game-move`.
- Один логический change на коммит; тема коммита — короткая, в повелительном наклонении, например `docs: add contributor guide`, `fix: reject occupied cells`.
- Перед коммитом прогоните доступные проверки, затем пушьте ветку задачи на ревью. В `main` — только после одобрения и зелёных проверок.
