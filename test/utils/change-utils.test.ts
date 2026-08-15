import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { validateChangeName, validateCapabilityPath, createChange } from '../../src/utils/change-utils.js';

describe('validateChangeName', () => {
  describe('valid names', () => {
    it('should accept simple kebab-case name', () => {
      const result = validateChangeName('add-auth');
      expect(result).toEqual({ valid: true });
    });

    it('should accept a long-but-bounded name and reject one past the cap', () => {
      // Past the cap the failure must be a validation message, not a raw
      // ENAMETOOLONG once mkdir hits the 255-byte component limit.
      expect(validateChangeName('a'.repeat(200))).toEqual({ valid: true });
      const result = validateChangeName('a'.repeat(201));
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('should accept name with multiple segments', () => {
      const result = validateChangeName('add-user-auth');
      expect(result).toEqual({ valid: true });
    });

    it('should accept name with numeric suffix', () => {
      const result = validateChangeName('add-feature-2');
      expect(result).toEqual({ valid: true });
    });

    it('should accept single word name', () => {
      const result = validateChangeName('refactor');
      expect(result).toEqual({ valid: true });
    });

    it('should accept name with numbers in segments', () => {
      const result = validateChangeName('upgrade-to-v2');
      expect(result).toEqual({ valid: true });
    });

    it('should accept a numeric-prefixed name for ordering (#850, #1169)', () => {
      const result = validateChangeName('100-add-feature');
      expect(result).toEqual({ valid: true });
    });

    it('should accept a zero-padded numeric-prefixed name', () => {
      const result = validateChangeName('00001-add-auth');
      expect(result).toEqual({ valid: true });
    });

    it('should accept a tiered numeric prefix with alphanumeric segments (#850)', () => {
      const result = validateChangeName('101-01-fix-auth');
      expect(result).toEqual({ valid: true });
    });

    it('should accept an all-numeric name', () => {
      const result = validateChangeName('100');
      expect(result).toEqual({ valid: true });
    });

    it('should accept a Chinese directory name', () => {
      expect(validateChangeName('添加用户认证')).toEqual({ valid: true });
    });

    it('should accept a mixed Chinese and Latin name', () => {
      expect(validateChangeName('中文化cli人机面')).toEqual({ valid: true });
    });
  });

  describe('invalid names - uppercase rejected', () => {
    it('should reject name with uppercase letters', () => {
      const result = validateChangeName('Add-Auth');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('lowercase');
    });

    it('should reject fully uppercase name', () => {
      const result = validateChangeName('ADD-AUTH');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('lowercase');
    });
  });

  describe('invalid names - spaces rejected', () => {
    it('should reject name with spaces', () => {
      const result = validateChangeName('add auth');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('spaces');
    });

    it('should reject a Chinese name with spaces', () => {
      const result = validateChangeName('添加 用户认证');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('spaces');
    });
  });

  describe('invalid names - path separators rejected', () => {
    it('should reject a Chinese name with a forward slash', () => {
      const result = validateChangeName('添加/认证');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('path separators');
    });

    it('should reject a Chinese name with a backslash', () => {
      const result = validateChangeName('添加\\认证');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('path separators');
    });
  });

  describe('invalid names - underscores rejected', () => {
    it('should reject name with underscores', () => {
      const result = validateChangeName('add_auth');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('underscores');
    });
  });

  describe('invalid names - special characters rejected', () => {
    it('should reject name with exclamation mark', () => {
      const result = validateChangeName('add-auth!');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject name with @ symbol', () => {
      const result = validateChangeName('add@auth');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('invalid names - leading/trailing hyphens rejected', () => {
    it('should reject name with leading hyphen', () => {
      const result = validateChangeName('-add-auth');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('start with a hyphen');
    });

    it('should reject name with trailing hyphen', () => {
      const result = validateChangeName('add-auth-');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('end with a hyphen');
    });
  });

  describe('invalid names - consecutive hyphens rejected', () => {
    it('should reject name with double hyphens', () => {
      const result = validateChangeName('add--auth');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('consecutive hyphens');
    });
  });

  describe('invalid names - empty name rejected', () => {
    it('should reject empty string', () => {
      const result = validateChangeName('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('empty');
    });
  });
});

describe('validateCapabilityPath', () => {
  describe('valid paths', () => {
    it('should accept a Chinese capability directory', () => {
      expect(validateCapabilityPath('用户认证')).toEqual({ valid: true });
    });

    it('should accept a nested Chinese capability path', () => {
      expect(validateCapabilityPath('身份/用户认证')).toEqual({ valid: true });
    });

    it('should accept existing kebab capability paths', () => {
      expect(validateCapabilityPath('cli-list')).toEqual({ valid: true });
      expect(validateCapabilityPath('identity/user-auth')).toEqual({ valid: true });
    });
  });

  describe('invalid paths', () => {
    it('should reject a path with spaces', () => {
      const result = validateCapabilityPath('用户 认证');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('spaces');
    });

    it('should reject a nested path with a space in a segment', () => {
      const result = validateCapabilityPath('身份/用户 认证');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('spaces');
    });

    it('should reject a path with a backslash', () => {
      const result = validateCapabilityPath('身份\\用户认证');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('backslashes');
    });

    it('should reject empty segments', () => {
      expect(validateCapabilityPath('身份/').valid).toBe(false);
      expect(validateCapabilityPath('/用户认证').valid).toBe(false);
      expect(validateCapabilityPath('身份//用户认证').valid).toBe(false);
      expect(validateCapabilityPath('').valid).toBe(false);
    });

    it('should reject relative path segments', () => {
      expect(validateCapabilityPath('.').error).toContain("'.'");
      expect(validateCapabilityPath('..').error).toContain("'..'");
      expect(validateCapabilityPath('身份/..').error).toContain("'..'");
    });
  });
});

describe('createChange', () => {
  let testDir: string;
  const originalTimeZone = process.env.TZ;

  beforeEach(async () => {
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openspec-test-'));
  });

  afterEach(async () => {
    vi.useRealTimers();
    if (originalTimeZone === undefined) {
      delete process.env.TZ;
    } else {
      process.env.TZ = originalTimeZone;
    }
    await fs.rm(testDir, { recursive: true, force: true });
  });

  describe('creates directory', () => {
    it('should create change directory', async () => {
      await createChange(testDir, 'add-auth');

      const changeDir = path.join(testDir, 'openspec', 'changes', 'add-auth');
      const stats = await fs.stat(changeDir);
      expect(stats.isDirectory()).toBe(true);
    });

    it('should create a Chinese change directory using the platform separator', async () => {
      await createChange(testDir, '添加用户认证');

      const changeDir = path.join(testDir, 'openspec', 'changes', '添加用户认证');
      const stats = await fs.stat(changeDir);
      expect(stats.isDirectory()).toBe(true);
    });

    it('should create a numeric-prefixed change directory (#850, #1169)', async () => {
      await createChange(testDir, '100-add-feature');

      const changeDir = path.join(testDir, 'openspec', 'changes', '100-add-feature');
      const stats = await fs.stat(changeDir);
      expect(stats.isDirectory()).toBe(true);
    });

    it('should create .openspec.yaml metadata file with default schema', async () => {
      await createChange(testDir, 'add-auth');

      const metaPath = path.join(testDir, 'openspec', 'changes', 'add-auth', '.openspec.yaml');
      const content = await fs.readFile(metaPath, 'utf-8');
      expect(content).toContain('schema: spec-driven');
      expect(content).toMatch(/created: \d{4}-\d{2}-\d{2}/);
    });

    it('should use the process local date across a UTC date boundary', async () => {
      process.env.TZ = 'Asia/Shanghai';
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-07-14T16:30:00.000Z'));

      await createChange(testDir, 'local-date-change');

      const metaPath = path.join(testDir, 'openspec', 'changes', 'local-date-change', '.openspec.yaml');
      const content = await fs.readFile(metaPath, 'utf-8');
      expect(content).toContain('created: 2026-07-15');
    });

    it('should preserve the date when UTC and local calendar dates match', async () => {
      process.env.TZ = 'Asia/Shanghai';
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-05T04:30:00.000Z'));

      await createChange(testDir, 'same-date-change');

      const metaPath = path.join(testDir, 'openspec', 'changes', 'same-date-change', '.openspec.yaml');
      const content = await fs.readFile(metaPath, 'utf-8');
      expect(content).toContain('created: 2026-01-05');
    });

    it('should create .openspec.yaml with custom schema', async () => {
      await createChange(testDir, 'add-auth', { schema: 'spec-driven' });

      const metaPath = path.join(testDir, 'openspec', 'changes', 'add-auth', '.openspec.yaml');
      const content = await fs.readFile(metaPath, 'utf-8');
      expect(content).toContain('schema: spec-driven');
    });
  });

  describe('schema validation', () => {
    it('should throw error for unknown schema', async () => {
      await expect(createChange(testDir, 'add-auth', { schema: 'unknown-schema' })).rejects.toThrow(
        /Unknown schema/
      );
    });
  });

  describe('duplicate change throws error', () => {
    it('should throw error if change already exists', async () => {
      await createChange(testDir, 'add-auth');

      await expect(createChange(testDir, 'add-auth')).rejects.toThrow(
        /already exists/
      );
    });
  });

  describe('invalid name throws validation error', () => {
    it('should throw error for uppercase name', async () => {
      await expect(createChange(testDir, 'Add-Auth')).rejects.toThrow(
        /lowercase/
      );
    });

    it('should throw error for name with spaces', async () => {
      await expect(createChange(testDir, 'add auth')).rejects.toThrow(
        /spaces/
      );
    });

    it('should throw error for empty name', async () => {
      await expect(createChange(testDir, '')).rejects.toThrow(
        /empty/
      );
    });
  });

  describe('creates parent directories if needed', () => {
    it('should create openspec/changes/ directories if they do not exist', async () => {
      const newProjectDir = path.join(testDir, 'new-project');
      await fs.mkdir(newProjectDir);

      // openspec/changes/ does not exist yet
      await createChange(newProjectDir, 'add-auth');

      const changeDir = path.join(newProjectDir, 'openspec', 'changes', 'add-auth');
      const stats = await fs.stat(changeDir);
      expect(stats.isDirectory()).toBe(true);
    });
  });
});
