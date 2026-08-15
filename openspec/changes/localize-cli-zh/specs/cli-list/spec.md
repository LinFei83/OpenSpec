## MODIFIED Requirements

### Requirement: Output Format
The command SHALL display items in a clear, readable table format with mode-appropriate progress or counts.

#### Scenario: Displaying change list (default)
- **WHEN** displaying the list of changes
- **THEN** show a table with columns:
  - Change name (directory name)
  - Task progress (e.g., "3/5 任务" or "✓ 完成")

#### Scenario: Displaying spec list
- **WHEN** displaying the list of specs
- **THEN** show a table with columns:
  - Spec id (directory name)
  - Requirement count (e.g., "需求 12")

### Requirement: Empty State
The command SHALL provide clear feedback when no items are present for the selected mode.

#### Scenario: Handling empty state (changes)
- **WHEN** no active changes exist (only archive/ or empty changes/)
- **THEN** display: "没有进行中的变更。"

#### Scenario: Handling empty state (specs)
- **WHEN** no specs directory exists or contains no capabilities
- **THEN** display: "没有找到规格。"

### Requirement: Error Handling

The command SHALL gracefully handle missing files and directories with appropriate messages.

#### Scenario: Missing tasks.md file

- **WHEN** a change directory has no `tasks.md` file
- **THEN** display the change with "无任务" status

#### Scenario: Missing changes directory

- **WHEN** `openspec/changes/` directory doesn't exist
- **THEN** display error: "未找到 OpenSpec 变更目录。请先运行 'openspec init'。"
- **AND** exit with code 1
