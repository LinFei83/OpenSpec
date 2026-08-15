## ADDED Requirements

### Requirement: Sync Writes The Delta Path Unchanged

When the agent syncs a delta spec to main specs, it SHALL create or update `openspec/specs/<capability-path>/spec.md` using the exact path relative to `specs/` from the delta, including Simplified Chinese segments. The agent SHALL NOT rewrite a Chinese capability path into English kebab-case.

#### Scenario: New Chinese capability spec

- **WHEN** a delta spec exists at `changes/<name>/specs/用户认证/spec.md`
- **AND** that capability is not in main specs
- **THEN** the agent creates the main spec at `openspec/specs/用户认证/spec.md`
- **AND** on Windows uses the platform path separator
- **AND** does not create `openspec/specs/user-auth/` instead

#### Scenario: Nested Chinese capability spec

- **WHEN** a delta spec exists at `changes/<name>/specs/身份/用户认证/spec.md`
- **THEN** the agent writes the main spec at `openspec/specs/身份/用户认证/spec.md`
