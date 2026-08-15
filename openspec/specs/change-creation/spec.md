# change-creation Specification

## Purpose
Provide programmatic utilities for creating and validating OpenSpec change directories.
## Requirements
### Requirement: Change Creation
The system SHALL provide a function to create new change directories programmatically.

#### Scenario: Create change
- **WHEN** `createChange(projectRoot, 'add-auth')` is called
- **THEN** the system creates `openspec/changes/add-auth/` directory

#### Scenario: Duplicate change rejected
- **WHEN** `createChange(projectRoot, 'add-auth')` is called and `openspec/changes/add-auth/` already exists
- **THEN** the system throws an error indicating the change already exists

#### Scenario: Creates parent directories if needed
- **WHEN** `createChange(projectRoot, 'add-auth')` is called and `openspec/changes/` does not exist
- **THEN** the system creates the full path including parent directories

#### Scenario: Invalid change name rejected
- **WHEN** `createChange(projectRoot, 'Add Auth')` is called with an invalid name
- **THEN** the system throws a validation error

### Requirement: Change Name Validation
The system SHALL accept a change name that is either kebab-case (`a-z`, digits, single hyphens) or a folder-safe name that includes Simplified Chinese characters. The name SHALL NOT be empty, SHALL NOT contain spaces, path separators, underscores, or other punctuation beyond single ASCII hyphens, SHALL NOT start or end with a hyphen, and SHALL NOT contain consecutive hyphens. Store ids, workset names, and spec capability paths keep their existing kebab-case grammar.

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

