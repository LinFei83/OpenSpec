# change-name-derivation Specification

## Purpose

Tells generated create-change skills to pick a short Chinese directory name so new changes are not kebab-cased into English.

## Requirements

### Requirement: Create-Change Skills Derive Chinese Directory Names

Generated skill and slash-command files for `propose`, `new`, `ff`, and `onboard` SHALL instruct the agent to create a short Simplified Chinese directory name from the user's description. The instructions SHALL tell the agent not to transliterate into pinyin and not to derive an English kebab-case name. The rest of those files MAY remain English so the model can follow the workflow.

#### Scenario: Propose skill names from a Chinese description

- **WHEN** the user asks to propose adding user authentication and does not supply a directory name
- **THEN** the generated `openspec-propose` skill tells the agent to derive a short Chinese name such as `添加用户认证`
- **AND** tells the agent to run `openspec new change "<that-name>"`

#### Scenario: Propose skill names from an English description

- **WHEN** the user asks to propose "add user authentication" and does not supply a directory name
- **THEN** the generated `openspec-propose` skill still tells the agent to derive a short Chinese name such as `添加用户认证`
- **AND** does not tell the agent to use `add-user-auth`

#### Scenario: User-supplied Chinese name is kept

- **WHEN** the user already provides a Chinese change name without spaces or path separators
- **THEN** the generated create-change skills tell the agent to use that name as-is

#### Scenario: New, ff, and onboard match propose

- **WHEN** skills are generated for `new`, `ff`, and `onboard`
- **THEN** each file's change-naming instruction matches the Chinese-directory rule used by `propose`
- **AND** no other generated skill is required to change its naming text

### Requirement: Invalid Name Guardrail Uses The New Grammar

The generated `new` skill and `/opsx:new` command SHALL reject names that the CLI change-name grammar rejects, and SHALL NOT say that only kebab-case is valid.

#### Scenario: New skill no longer requires kebab-case

- **WHEN** an agent follows the generated `openspec-new-change` skill
- **AND** the chosen name is a valid Chinese directory name
- **THEN** the skill does not tell the agent to ask for a kebab-case replacement
