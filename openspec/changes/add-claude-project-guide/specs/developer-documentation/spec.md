# Developer Documentation Specification

## ADDED Requirements

### Requirement: Repository contributor guide

The repository SHALL contain a root-level `CLAUDE.md` that describes the project stack, dependency manager, validation commands, local bot startup, source layout, and Git conventions.

#### Scenario: A contributor prepares a local environment

- **WHEN** a contributor reads `CLAUDE.md` before changing the project
- **THEN** they can identify the Yarn install command, the available build or test commands, required local environment variables, and how to start the bot

#### Scenario: A contributor chooses a place for a change

- **WHEN** a contributor needs to modify game behavior or persistence
- **THEN** `CLAUDE.md` identifies the responsibilities of `app/Application`, `app/Domain`, and `app/models`

#### Scenario: A contributor prepares Git history

- **WHEN** a contributor creates a task branch and commit
- **THEN** `CLAUDE.md` states the branch and commit-message conventions used by this repository

### Requirement: Documented build is portable

The application SHALL compile with the documented build command on a
case-sensitive filesystem.

#### Scenario: A contributor validates the application

- **WHEN** a contributor runs `yarn build` after installing dependencies
- **THEN** TypeScript resolves the `Application` and `Domain` imports using their on-disk casing
