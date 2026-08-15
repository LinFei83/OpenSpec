## MODIFIED Requirements

### Requirement: Guided Artifact Creation

The skill SHALL guide users through each artifact with narration explaining the purpose.

#### Scenario: Change creation with narration

- **WHEN** creating the change directory
- **THEN** agent runs `openspec new change "<name>"` with a derived short Simplified Chinese directory name
- **AND** does not derive an English kebab-case name
- **AND** explains what a "change" is (container for thinking and planning)
- **AND** shows the folder structure that was created
- **AND** pauses for user acknowledgment before proceeding

#### Scenario: Proposal creation with narration

- **WHEN** creating proposal.md
- **THEN** agent explains proposals capture WHY we're making this change
- **AND** drafts proposal based on selected task
- **AND** shows draft to user for approval before saving
- **AND** explains the sections (Why, What Changes, Capabilities, Impact)

#### Scenario: Specs creation with narration

- **WHEN** creating spec files
- **THEN** agent explains specs define WHAT we're building in detail
- **AND** explains the requirement/scenario format
- **AND** creates spec file(s) based on proposal capabilities
- **AND** notes that specs become documentation that stays in sync

#### Scenario: Design creation with narration

- **WHEN** creating design.md
- **THEN** agent explains design captures HOW we'll build it
- **AND** notes this is where technical decisions and tradeoffs live
- **AND** for small changes, acknowledges design may be brief
- **AND** creates design based on proposal and specs

#### Scenario: Tasks creation with narration

- **WHEN** creating tasks.md
- **THEN** agent explains tasks break work into checkboxes
- **AND** explains these drive the apply phase
- **AND** generates task list from design and specs
- **AND** shows tasks and asks if ready to implement
