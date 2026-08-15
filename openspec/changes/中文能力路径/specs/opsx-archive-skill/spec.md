## ADDED Requirements

### Requirement: Archive Sync Preserves Chinese Capability Paths

When the archive skill syncs delta specs, it SHALL resolve each main spec from the delta's `<capability-path>` as written, including Simplified Chinese directory names. It SHALL NOT convert those paths to English kebab-case.

#### Scenario: Archive syncs a new Chinese capability

- **WHEN** the change contains `specs/用户认证/spec.md`
- **AND** the agent syncs specs before archiving
- **THEN** the main spec is written to `openspec/specs/用户认证/spec.md`
- **AND** on Windows the path uses the platform separator
