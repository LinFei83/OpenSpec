## MODIFIED Requirements

### Requirement: Change Name Validation
The system SHALL accept a change name that is either kebab-case (`a-z`, digits, single hyphens) or a folder-safe name that includes Simplified Chinese characters. The name SHALL NOT be empty, SHALL NOT contain spaces, path separators, underscores, or other punctuation beyond single ASCII hyphens, SHALL NOT start or end with a hyphen, and SHALL NOT contain consecutive hyphens. Store ids, workset names, and schema names keep their existing kebab-case grammar.

#### Scenario: Valid kebab-case name accepted
- **WHEN** a change name like `add-user-auth` is validated
- **THEN** validation returns `{ valid: true }`

#### Scenario: Numeric suffixes accepted
- **WHEN** a change name like `add-feature-2` is validated
- **THEN** validation returns `{ valid: true }`

#### Scenario: Single word accepted
- **WHEN** a change name like `refactor` is validated
- **THEN** validation returns `{ valid: true }`

#### Scenario: Chinese directory name accepted
- **WHEN** a change name like `添加用户认证` is validated
- **THEN** validation returns `{ valid: true }`

#### Scenario: Mixed Chinese and Latin name accepted
- **WHEN** a change name like `中文化cli人机面` is validated
- **THEN** validation returns `{ valid: true }`

#### Scenario: Chinese name creates a directory on Windows
- **WHEN** `createChange(projectRoot, '添加用户认证')` is called on Windows
- **THEN** the system creates the change directory at `openspec/changes/添加用户认证/` using the platform path separator

#### Scenario: Uppercase characters rejected
- **WHEN** a change name like `Add-Auth` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Spaces rejected
- **WHEN** a change name like `add auth` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Chinese name with spaces rejected
- **WHEN** a change name like `添加 用户认证` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Underscores rejected
- **WHEN** a change name like `add_auth` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Special characters rejected
- **WHEN** a change name like `add-auth!` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Path separators rejected
- **WHEN** a change name like `添加/认证` or `添加\认证` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Leading hyphen rejected
- **WHEN** a change name like `-add-auth` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Trailing hyphen rejected
- **WHEN** a change name like `add-auth-` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

#### Scenario: Consecutive hyphens rejected
- **WHEN** a change name like `add--auth` is validated
- **THEN** validation returns `{ valid: false, error: "..." }`

## ADDED Requirements

### Requirement: Capability Path Segments Allow Chinese Names

The system SHALL accept a spec capability path whose segments are each either kebab-case or a folder-safe Simplified Chinese name using the same character rules as change names. The path MAY contain `/` between segments to nest areas. The path SHALL NOT contain spaces, backslashes, underscores, or empty segments. Existing kebab capability directories remain valid. Store ids, workset names, and schema names stay kebab-case.

#### Scenario: Chinese capability directory is accepted

- **WHEN** a capability path like `用户认证` is used for a spec
- **THEN** the system treats it as a valid capability id
- **AND** on Windows the spec file lives at `openspec/specs/用户认证/spec.md` using the platform path separator

#### Scenario: Nested Chinese capability path is accepted

- **WHEN** a capability path like `身份/用户认证` is used
- **THEN** the system treats it as a valid nested capability id
- **AND** on Windows the spec file lives at `openspec/specs/身份/用户认证/spec.md` using the platform path separator

#### Scenario: Existing kebab capability path remains valid

- **WHEN** a capability path like `cli-list` or `identity/user-auth` is used
- **THEN** the system treats it as a valid capability id

#### Scenario: Spaces and backslashes are rejected

- **WHEN** a capability path contains a space or `\`
- **THEN** the system rejects that path
