import path from 'path';
import { FileSystemUtils } from './file-system.js';
import { writeChangeMetadata, validateSchemaName } from './change-metadata.js';
import { formatLocalDate } from './date.js';
import { readProjectConfig } from '../core/project-config.js';
import type { ChangeMetadata } from '../core/change-metadata/index.js';

/**
 * 变更目录名：原有 kebab，或 Unicode 字母（含汉字）+ 数字 + 单连字符。
 * 错误文案保持英文，避免 `--json` 的 status[].message 被写成中文。
 */
const CHANGE_NAME_REGEX = /^(?!-)(?!.*-$)(?!.*--)[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u;

const DEFAULT_SCHEMA = 'spec-driven';

/**
 * Options for creating a change.
 */
export interface CreateChangeOptions {
  /** The workflow schema to use (default: 'spec-driven') */
  schema?: string;
  /** Default schema to use when no explicit schema or project config is present */
  defaultSchema?: string;
  /** Directory that should contain the change directories */
  changesDir?: string;
  /** Additional metadata to persist in the change's .openspec.yaml */
  metadata?: Partial<Pick<ChangeMetadata, 'goal' | 'affected_areas' | 'initiative'>>;
}

/**
 * Result of creating a change.
 */
export interface CreateChangeResult {
  /** The schema that was actually used (resolved from options, config, or default) */
  schema: string;
  /** Absolute path to the created change directory */
  changeDir: string;
}

/**
 * Result of validating a change name.
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a change directory name.
 *
 * Accepts the original kebab-case grammar (`add-user-auth`, `100-add-feature`)
 * or a folder-safe name with Unicode letters (including CJK), digits, and
 * single ASCII hyphens. Store ids, workset names, and schema names keep
 * `isKebabId` and are not validated here.
 *
 * Error messages stay English so `openspec new change --json` does not put
 * Chinese into `status[].message`.
 */
export function validateChangeName(name: string): ValidationResult {
  if (!name) {
    return { valid: false, error: 'Change name cannot be empty' };
  }

  // Filesystem directory components cap at 255 bytes and archive prepends a
  // date prefix; bounding here turns the failure into a validation message
  // instead of a raw ENAMETOOLONG from mkdir.
  if (name.length > 200) {
    return { valid: false, error: 'Change name is too long (200 characters max)' };
  }

  if (/[A-Z]/.test(name)) {
    return { valid: false, error: 'Change name must be lowercase (use kebab-case)' };
  }
  if (/\s/.test(name)) {
    return { valid: false, error: 'Change name cannot contain spaces (use hyphens instead)' };
  }
  if (/_/.test(name)) {
    return { valid: false, error: 'Change name cannot contain underscores (use hyphens instead)' };
  }
  if (/[\\/]/.test(name)) {
    return { valid: false, error: 'Change name cannot contain path separators' };
  }
  if (name.startsWith('-')) {
    return { valid: false, error: 'Change name cannot start with a hyphen' };
  }
  if (name.endsWith('-')) {
    return { valid: false, error: 'Change name cannot end with a hyphen' };
  }
  if (/--/.test(name)) {
    return { valid: false, error: 'Change name cannot contain consecutive hyphens' };
  }
  if (!CHANGE_NAME_REGEX.test(name)) {
    return {
      valid: false,
      error: 'Change name can only contain letters, numbers, and single hyphens',
    };
  }

  return { valid: true };
}

/**
 * 能力路径：按 `/` 分层，每段与变更名同一套汉字/kebab 规则。
 * 整段允许嵌套（如 `身份/用户认证`）；拒绝反斜杠、空段、`.`、`..`。
 * 不要对整串调用 `validateChangeName`，因为变更名拒绝 `/`。
 */
export function validateCapabilityPath(capabilityPath: string): ValidationResult {
  if (!capabilityPath) {
    return { valid: false, error: 'Capability path cannot be empty' };
  }

  if (/\\/.test(capabilityPath)) {
    return { valid: false, error: 'Capability path cannot contain backslashes' };
  }

  const segments = capabilityPath.split('/');
  if (segments.some((segment) => segment.length === 0)) {
    return { valid: false, error: 'Capability path cannot contain empty segments' };
  }

  for (const segment of segments) {
    if (segment === '.' || segment === '..') {
      return { valid: false, error: `Capability path cannot contain '${segment}'` };
    }

    const result = validateChangeName(segment);
    if (!result.valid) {
      return {
        valid: false,
        error: result.error?.replace(/^Change name/, 'Capability path segment'),
      };
    }
  }

  return { valid: true };
}

/**
 * Creates a new change directory with metadata file.
 *
 * @param projectRoot - The root directory of the project (where `openspec/` lives)
 * @param name - The change name (kebab-case or a folder-safe Chinese name)
 * @param options - Optional settings for the change
 * @throws Error if the change name is invalid
 * @throws Error if the schema name is invalid
 * @throws Error if the change directory already exists
 *
 * @returns Result containing the resolved schema name
 *
 * @example
 * // Creates openspec/changes/add-auth/ with default schema
 * const result = await createChange('/path/to/project', 'add-auth')
 * console.log(result.schema) // 'spec-driven' or value from config
 *
 * @example
 * // Creates openspec/changes/add-auth/ with custom schema
 * const result = await createChange('/path/to/project', 'add-auth', { schema: 'my-workflow' })
 * console.log(result.schema) // 'my-workflow'
 */
export async function createChange(
  projectRoot: string,
  name: string,
  options: CreateChangeOptions = {}
): Promise<CreateChangeResult> {
  // Validate the name first
  const validation = validateChangeName(name);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const defaultSchema = options.defaultSchema ?? DEFAULT_SCHEMA;

  // Determine schema: explicit option → project config → supplied default
  let schemaName: string;
  if (options.schema) {
    schemaName = options.schema;
  } else {
    // Try to read from project config
    try {
      const config = readProjectConfig(projectRoot);
      schemaName = config?.schema ?? defaultSchema;
    } catch {
      // If config read fails, use default
      schemaName = defaultSchema;
    }
  }

  // Validate the resolved schema
  validateSchemaName(schemaName, projectRoot);

  // Build the change directory path
  const changeDir = path.join(options.changesDir ?? path.join(projectRoot, 'openspec', 'changes'), name);

  // Check if change already exists
  if (await FileSystemUtils.directoryExists(changeDir)) {
    throw new Error(`Change '${name}' already exists at ${changeDir}`);
  }

  // Creating a change may scaffold or complete the root itself (an
  // implicit root, or a config-only/incomplete clone). Never leave a
  // half-root behind that doctor immediately calls unhealthy: ensure
  // specs/ and changes/archive/ exist, and write a config only when
  // none exists. The config records the PROJECT default schema, never
  // a one-change --schema override.
  const openspecDir = path.join(projectRoot, 'openspec');

  // Create the directory (including parent directories if needed)
  await FileSystemUtils.createDirectory(changeDir);
  await FileSystemUtils.createDirectory(path.join(openspecDir, 'specs'));
  await FileSystemUtils.createDirectory(path.join(openspecDir, 'changes', 'archive'));
  const configPath = path.join(openspecDir, 'config.yaml');
  const configYmlPath = path.join(openspecDir, 'config.yml');
  if (
    !(await FileSystemUtils.fileExists(configPath)) &&
    !(await FileSystemUtils.fileExists(configYmlPath))
  ) {
    await FileSystemUtils.writeFile(configPath, `schema: ${defaultSchema}\n`);
  }

  // Write metadata file with schema and creation date
  writeChangeMetadata(changeDir, {
    schema: schemaName,
    created: formatLocalDate(),
    ...options.metadata,
  }, projectRoot);

  return { schema: schemaName, changeDir };
}
