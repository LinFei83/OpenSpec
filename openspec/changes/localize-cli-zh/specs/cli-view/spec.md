## MODIFIED Requirements

### Requirement: Dashboard Display

The system SHALL provide a `view` command that displays a dashboard overview of specs and changes.

#### Scenario: Basic dashboard display

- **WHEN** user runs `openspec view`
- **THEN** system displays a formatted dashboard titled `OpenSpec 面板`
- **AND** shows sections for 概览, 进行中的变更, 已完成的变更, and 规格

#### Scenario: No OpenSpec directory

- **WHEN** user runs `openspec view` in a directory without OpenSpec
- **THEN** system displays error message "未找到 openspec 目录"

### Requirement: Draft Changes Display

The dashboard SHALL display changes without tasks in a separate draft section.

#### Scenario: Draft changes listing

- **WHEN** there are changes with no tasks.md or zero tasks defined
- **THEN** system shows them in a `草稿变更` section
- **AND** uses a distinct indicator (e.g., `○`) to show draft status

#### Scenario: Draft section ordering

- **WHEN** multiple draft changes exist
- **THEN** system sorts them alphabetically by name

### Requirement: Completed Changes Display

The dashboard SHALL list completed changes in a separate section, only showing changes with ALL tasks completed.

> **Fixes bug**: Previously, changes with `total === 0` were incorrectly shown as completed.

#### Scenario: Completed changes listing

- **WHEN** there are changes with `tasks.total > 0` AND `tasks.completed === tasks.total`
- **THEN** system shows them with checkmark indicators in a `已完成的变更` section

#### Scenario: Mixed completion states

- **WHEN** some changes are complete and others active
- **THEN** system separates them into appropriate sections

#### Scenario: Empty changes not completed

- **WHEN** a change has no tasks.md or zero tasks defined
- **THEN** system does NOT show it in the `已完成的变更` section
- **AND** shows it in the `草稿变更` section instead

### Requirement: Visual Formatting

The dashboard SHALL use consistent visual formatting with colors and symbols. Chinese labels SHALL be padded by terminal display width so East Asian characters align with ASCII names.

#### Scenario: Color coding

- **WHEN** dashboard elements are displayed
- **THEN** system uses cyan for specification items
- **AND** yellow for active changes
- **AND** green for completed items
- **AND** dim gray for supplementary text

#### Scenario: Progress bar rendering

- **WHEN** displaying progress bars
- **THEN** system uses filled blocks (█) for completed portions and light blocks (░) for remaining

#### Scenario: Chinese change names align by display width

- **WHEN** the dashboard lists an active change named `添加用户认证` next to an ASCII name
- **THEN** the progress bar column still lines up
- **AND** each CJK character counts as two display columns
