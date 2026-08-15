## MODIFIED Requirements

### Requirement: Progress Indicators

The command SHALL display progress indicators during initialization to provide clear feedback about each step.

#### Scenario: Displaying initialization progress

- **WHEN** executing initialization steps
- **THEN** validate environment silently in background (no output unless error)
- **AND** display progress with ora spinners:
  - Show spinner: "⠋ 正在创建 OpenSpec 结构..."
  - Then success: "✔ 已创建 OpenSpec 结构"
  - Show spinner: "⠋ 正在配置 AI 工具..."
  - Then success: "✔ 已配置 AI 工具"

### Requirement: AI Tool Configuration

The command SHALL configure AI coding assistants with skills and slash commands using a searchable multi-select experience.

#### Scenario: Prompting for AI tool selection

- **WHEN** run interactively
- **THEN** display animated welcome screen with OpenSpec logo
- **AND** present a searchable multi-select that shows all available tools
- **AND** mark already configured tools with "(已配置 ✓)" indicator
- **AND** pre-select configured tools for easy refresh
- **AND** sort configured tools to appear first in the list
- **AND** allow filtering by typing to search

#### Scenario: Selecting tools to configure

- **WHEN** user selects tools and confirms
- **THEN** generate skills in `.<tool>/skills/` directory for each selected tool
- **AND** generate slash commands for each selected tool with a command adapter, at that adapter's own path (for example `.claude/commands/opsx/<id>.md` or `.cursor/commands/opsx-<id>.md`)
- **AND** create `openspec/config.yaml` with default schema setting

### Requirement: Interactive Mode
The command SHALL provide an interactive menu for AI tool selection with clear navigation instructions.
#### Scenario: Displaying interactive menu
- **WHEN** run in fresh or extend mode
- **THEN** present a looping select menu that lets users toggle tools with Space and review selections with Enter
- **AND** when Enter is pressed on a highlighted selectable tool that is not already selected, automatically add it to the selection before moving to review so the highlighted tool is configured
- **AND** label already configured tools with "(已配置)" while keeping disabled options marked "即将推出"
- **AND** change the prompt copy in extend mode to "你想添加或刷新哪些 AI 工具？"
- **AND** display inline instructions clarifying that Space toggles tools and Enter selects the highlighted tool before reviewing selections

### Requirement: Success Output

The command SHALL provide clear, actionable next steps upon successful initialization.

#### Scenario: Displaying success message

- **WHEN** initialization completes successfully
- **THEN** display categorized summary:
  - "已创建: <tools>" for newly configured tools
  - "已刷新: <tools>" for already-configured tools that were updated
  - Count of skills and commands generated
- **AND** display a getting started section naming an installed onboarding workflow (for example `/opsx:propose` with a Simplified Chinese description)
- **AND** spell each command the way the configured tool registers it: `/opsx-<id>` for tools whose command files are named `opsx-<id>`, and the tool's skill invocation (`$openspec-<skill>` for Codex, `/skill:openspec-<skill>` for Kimi Code, `/openspec-<skill>` otherwise) for tools that receive no command files
- **AND** print one labeled line per distinct form when the selected tools disagree
- **AND** display links to documentation and feedback

#### Scenario: Displaying restart instruction

- **WHEN** initialization completes successfully and tools were created or refreshed
- **THEN** display instruction to restart IDE for slash commands to take effect
