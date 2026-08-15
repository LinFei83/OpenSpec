import type { FlagDefinition } from './types.js';
import { ZH } from '../../ui/zh-copy.js';

/**
 * Common flags used across multiple commands.
 */
export const COMMON_FLAGS = {
  json: {
    name: 'json',
    description: ZH.flags.json,
  } as FlagDefinition,
  jsonValidation: {
    name: 'json',
    description: ZH.flags.jsonValidation,
  } as FlagDefinition,
  strict: {
    name: 'strict',
    description: ZH.flags.strict,
  } as FlagDefinition,
  noInteractive: {
    name: 'no-interactive',
    description: ZH.flags.noInteractive,
  } as FlagDefinition,
  type: {
    name: 'type',
    description: ZH.flags.type,
    takesValue: true,
    values: ['change', 'spec'],
  } as FlagDefinition,
  store: {
    name: 'store',
    description: ZH.flags.store,
    takesValue: true,
  } as FlagDefinition,
} as const;
