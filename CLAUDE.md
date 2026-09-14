# Contributor guide

## Stack and dependencies

- Node.js 22 (the production image uses Node.js 22.12).
- TypeScript 5 with ES modules.
- Express 5 for the webhook server and Mongoose 8 for persistence.
- Yarn Classic, with exact dependency versions recorded in `yarn.lock`.

Install dependencies from the repository root:

```bash
yarn install
```

Keep `yarn.lock` in sync with `package.json`. Do not use npm to install project
dependencies.

## Validation

Compile the application before committing:

```bash
yarn build
```

The compiled files are written to `dist/` and are not committed. The repository
does not currently define an automated test script; do not describe a successful
build as a test run.

## Running the bot locally

The application is a Telegram webhook server that listens on port `7000`. Set a
real bot token before building or starting it:

```bash
export TELEGRAM_BOT_TOKEN='<telegram-bot-token>'
yarn dev
```

`yarn dev` compiles the TypeScript sources and starts `dist/index.js`. The
equivalent two-step flow is `yarn build` followed by `yarn start`.

A reachable MongoDB instance is also required. In managed development
environments, use the supplied `MONGODB_URI` and do not start another database.
Be aware that the current application does not read `MONGODB_URI`: it connects to
`mongodb://mongodb:27017/tic-tac-toe`. Local execution therefore requires that
the host name `mongodb` resolve to the supplied database, or a separate code
change that makes the connection configurable.

`TELEGRAM_BOT_CHAT_ID` appears in the deployment example but is not read by the
current application. Telegram sends the chat ID in each webhook request. To
receive requests, configure the bot's webhook to point to the local server
through a reachable HTTPS endpoint.

## Project structure

- `app/index.ts` creates the Express server, connects to MongoDB, and registers
  the webhook handler.
- `app/Application/` contains request parsing and orchestration, Telegram API
  message construction, and outbound message delivery.
- `app/Domain/` contains game rules and domain types for games, players, scores,
  and the board.
- `app/models/` contains Mongoose persistence models.
- `dist/` is generated build output.

Keep game rules and other deterministic logic in `app/Domain/`. Keep transport
and use-case coordination in `app/Application/`, and persistence schemas in
`app/models/`.

## Git conventions

- Create a dedicated branch and worktree for each task; never develop directly
  on `main`.
- Use a short, descriptive branch name such as `docs/add-contributor-guide` or
  `fix/validate-game-move`.
- Keep commits focused on one logical change.
- Write concise, imperative commit subjects, for example
  `docs: add contributor guide` or `fix: reject occupied cells`.
- Run the available validation commands before committing, then push the task
  branch for review. Merge into `main` only after required approvals and green
  checks.
