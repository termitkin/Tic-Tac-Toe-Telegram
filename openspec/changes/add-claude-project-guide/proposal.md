# Proposal: add project contributor guide

## Why

The repository has no `CLAUDE.md`. Contributors must infer the TypeScript/Yarn workflow, local bot prerequisites, project layout, and Git conventions from source files and CI configuration.

## What Changes

- Add a root-level `CLAUDE.md` with the supported development stack, Yarn commands, and currently available validation commands.
- Document local startup requirements for the Telegram bot, including required environment variables and use of the supplied MongoDB connection string.
- Describe the `app/Application`, `app/Domain`, and `app/models` layout.
- Define repository conventions for task branches and concise, imperative commits.
- Correct import path casing so the documented TypeScript build works on
  case-sensitive filesystems.
- Read the local MongoDB connection from `MONGODB_URI`, retaining the existing
  container URI as a fallback, and cover the selection logic with tests.

## Impact

- Affected files: new `CLAUDE.md` at the repository root, `package.json`, MongoDB
  startup configuration, its tests, and import declarations under `app/`.
- Affected capability: developer documentation and local build validation.
- Runtime configuration changes only in the MongoDB URI selection; the API,
  database schema, and user-facing game flow are unchanged.
