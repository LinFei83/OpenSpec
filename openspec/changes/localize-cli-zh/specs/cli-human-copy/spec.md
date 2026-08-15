## Purpose

Defines the hardcoded Simplified Chinese human-mode CLI so people see Chinese copy while JSON, command names, and flags stay English.

## ADDED Requirements

### Requirement: Human-Mode Copy Is Simplified Chinese

When the CLI writes human-mode output (not `--json`), the system SHALL use Simplified Chinese for help text, welcome screen copy, dashboard labels, list labels, doctor output, interactive prompts, `Error:`/`Fix:`/`Cancelled.` lines, relative times, and other operator-facing sentences. The system SHALL NOT switch language from the process locale and SHALL NOT offer a language flag or config key.

#### Scenario: Help text is Chinese

- **WHEN** a user runs `openspec --help` without `--json`
- **THEN** command and option descriptions are Simplified Chinese
- **AND** the command name remains `openspec`

#### Scenario: Shared failure lines are Chinese

- **WHEN** a command fails in human mode
- **THEN** the system prints a line starting with `错误:`
- **AND** when a pasteable fix exists, the next line starts with `修复:`

#### Scenario: Prompt cancellation is Chinese

- **WHEN** a user cancels an interactive prompt with Ctrl-C
- **THEN** the system prints `已取消。`
- **AND** the process exits with code 130

#### Scenario: Relative time is Chinese

- **WHEN** `openspec list` shows a change modified a few seconds ago
- **THEN** the relative time label is `刚刚`
- **WHEN** the same change was modified 3 days ago
- **THEN** the relative time label is `3天前`

#### Scenario: Language does not follow the process locale

- **WHEN** the process locale is `en-US`
- **AND** the user runs a human-mode command
- **THEN** the human-mode copy is still Simplified Chinese

### Requirement: JSON And Identifiers Stay English

`--json` output, status `code` values, command names, flag names, and change identifiers the user already typed SHALL remain ASCII/English contracts. JSON `message` and `fix` strings SHALL stay English so agents can parse them.

#### Scenario: JSON failure envelope stays English

- **WHEN** a command fails with `--json`
- **THEN** stdout is a single JSON document
- **AND** `status[].code` is an English snake_case token
- **AND** `status[].message` is English

#### Scenario: Command names are unchanged

- **WHEN** a user runs help or a subcommand
- **THEN** they still invoke `openspec list`, `openspec view`, and `openspec init`
- **AND** flags such as `--json` and `--store` keep their English names

### Requirement: Welcome Screen Fits CJK Width

The animated welcome screen SHALL keep its side-by-side layout when the Chinese copy is rendered. East Asian characters SHALL count as two display columns for wrapping and animation line counts.

#### Scenario: Welcome screen Chinese title

- **WHEN** `openspec init` shows the animated welcome screen
- **THEN** the title line contains `欢迎使用 OpenSpec`
- **AND** the prompt line contains `按 Enter 选择工具`

#### Scenario: Welcome screen does not wrap at minimum width

- **WHEN** the terminal is at least 60 columns wide
- **AND** the welcome screen renders Chinese onboarding hints
- **THEN** each logical welcome line stays on one terminal row
