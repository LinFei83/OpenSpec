## Purpose

指导代理为尚未存在的规格能力选用短中文目录路径，同时在改已有能力时原样沿用现有路径，避免再把新规格收成英文 kebab。

## ADDED Requirements

### Requirement: New Capability Paths Are Short Chinese Names

Generated skill and slash-command files for `propose`, `explore`, `onboard`, `new`, and `ff` SHALL instruct the agent to derive a short Simplified Chinese capability path for a capability that does not yet exist under `openspec/specs/`. The instructions SHALL tell the agent not to transliterate into pinyin and not to derive an English kebab-case path. Nested areas MAY use `/` between Chinese segments (for example `身份/用户认证`) when the project already organizes specs by domain.

#### Scenario: Propose skill names a new capability in Chinese

- **WHEN** the user asks to propose adding user authentication and that capability has no main spec yet
- **THEN** the generated `openspec-propose` skill tells the agent to use a short Chinese capability path such as `用户认证`
- **AND** does not tell the agent to create `specs/user-auth/`

#### Scenario: Nested Chinese path when the project already nests specs

- **WHEN** the project already keeps specs under domain folders
- **AND** the agent introduces a new capability in that domain
- **THEN** the skill allows a nested Chinese path such as `身份/用户认证`
- **AND** each new path segment is a short Simplified Chinese name, not pinyin or English kebab

#### Scenario: Existing capability path is preserved

- **WHEN** the change modifies a capability that already lives at `openspec/specs/cli-list/`
- **THEN** the generated skills tell the agent to write the delta at `specs/cli-list/spec.md`
- **AND** do not rename that capability to a Chinese path

#### Scenario: User-supplied Chinese capability path is kept

- **WHEN** the user already provides a Chinese capability path without spaces or backslashes
- **THEN** the generated skills tell the agent to use that path as-is

#### Scenario: Explore, onboard, new, and ff match propose

- **WHEN** skills are generated for `explore`, `onboard`, `new`, and `ff`
- **THEN** each file's new-capability naming instruction matches the Chinese-path rule used by `propose`
- **AND** archive and sync skills are not required to derive new names; they SHALL copy the delta's existing `<capability-path>` as-is

### Requirement: Instruction Examples Stop Using English Kebab For New Capabilities

The generated `propose`, `explore`, and `onboard` skill and command files SHALL NOT use `user-auth` as the example of a newly introduced capability path. Examples for a new capability SHALL be a short Chinese path such as `用户认证` or `身份/用户认证`. Examples that show preserving an existing path MAY still mention a kebab path that already exists in a project.

#### Scenario: Propose template example is Chinese

- **WHEN** an agent reads the generated `openspec-propose` skill
- **THEN** the capability-path example for a new spec is a Simplified Chinese directory name
- **AND** the skill still says to preserve an existing capability's full path
