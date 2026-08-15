## ADDED Requirements

### Requirement: New Capability Directories Use Short Chinese Paths

When a change introduces a capability that does not yet exist under `openspec/specs/`, authors SHALL place its spec at `specs/<capability-path>/spec.md` using a short Simplified Chinese path. Existing capabilities SHALL keep the path they already occupy. Nested `/` segments remain allowed when the project organizes specs by domain.

#### Scenario: Introducing a new capability

- **WHEN** a delta introduces a capability that has no main spec yet
- **THEN** the capability directory is a short Simplified Chinese name such as `用户认证`
- **AND** the author does not invent an English kebab path such as `user-auth`

#### Scenario: Nested new capability in a domain layout

- **WHEN** the project already nests specs by domain
- **AND** a delta introduces a new capability in that domain
- **THEN** the path MAY be `身份/用户认证`
- **AND** on Windows the files are created with the platform path separator

#### Scenario: Changing an existing capability

- **WHEN** a delta updates a capability that already lives at `openspec/specs/cli-list/`
- **THEN** the delta is written at `specs/cli-list/spec.md`
- **AND** the existing directory is not renamed
