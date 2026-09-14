# Proposal: add project contributor guide

## Why

The repository has no `CLAUDE.md`. Contributors must infer the TypeScript/Yarn workflow, local bot prerequisites, project layout, and Git conventions from source files and CI configuration.

## What Changes

- Add a root-level `CLAUDE.md` with the supported development stack, Yarn commands, and currently available validation commands.
- Document local startup requirements for the Telegram bot, including required environment variables and use of the supplied MongoDB connection string.
- Describe the `app/Application`, `app/Domain`, and `app/models` layout.
- Define repository conventions for task branches and concise, imperative commits.

## Impact

- Affected files: new `CLAUDE.md` at the repository root.
- Affected capability: developer documentation.
- No runtime behavior, API, database schema, or user-facing game flow changes.
