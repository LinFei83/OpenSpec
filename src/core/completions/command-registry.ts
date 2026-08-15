import { COMMON_FLAGS } from './shared-flags.js';
import type { CommandDefinition } from './types.js';
import { ZH } from '../../ui/zh-copy.js';
export const COMMAND_REGISTRY: CommandDefinition[] = [
  {
    name: 'init',
    description: ZH.help.init.description,
    acceptsPositional: true,
    positionalType: 'path',
    positionals: [{ name: 'path', type: 'path', optional: true }],
    flags: [
      {
        name: 'tools',
        description: ZH.help.init.tools,
        takesValue: true,
      },
      {
        name: 'force',
        description: ZH.help.init.force,
      },
      {
        name: 'profile',
        description: ZH.help.init.profile,
        takesValue: true,
        values: ['core', 'custom'],
      },
      {
        name: 'no-animation',
        description: ZH.help.init.noAnimation,
      },
      {
        name: 'copilot-cloud',
        description: ZH.help.init.copilotCloud,
      },
      {
        name: 'no-copilot-cloud',
        description: ZH.help.init.noCopilotCloud,
      },
    ],
  },
  {
    name: 'update',
    description: ZH.help.update.description,
    acceptsPositional: true,
    positionalType: 'path',
    positionals: [{ name: 'path', type: 'path', optional: true }],
    flags: [
      {
        name: 'force',
        description: ZH.help.update.force,
      },
    ],
  },
  {
    name: 'list',
    description: ZH.help.list.description,
    flags: [
      {
        name: 'specs',
        description: ZH.help.list.specs,
      },
      {
        name: 'changes',
        description: ZH.help.list.changes,
      },
      {
        name: 'sort',
        description: ZH.help.list.sort,
        takesValue: true,
        values: ['recent', 'name'],
      },
      COMMON_FLAGS.json,
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'view',
    description: ZH.help.view.description,
    flags: [
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'validate',
    description: ZH.help.validate.description,
    acceptsPositional: true,
    positionalType: 'change-or-spec-id',
    positionals: [{ name: 'item-name', type: 'change-or-spec-id', optional: true }],
    flags: [
      {
        name: 'all',
        description: ZH.help.validate.all,
      },
      {
        name: 'changes',
        description: ZH.help.validate.changes,
      },
      {
        name: 'specs',
        description: ZH.help.validate.specs,
      },
      {
        name: 'archived',
        description: ZH.help.validate.archived,
      },
      COMMON_FLAGS.type,
      COMMON_FLAGS.strict,
      COMMON_FLAGS.jsonValidation,
      {
        name: 'concurrency',
        description: ZH.help.validate.concurrency,
        takesValue: true,
      },
      COMMON_FLAGS.noInteractive,
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'show',
    description: ZH.help.show.description,
    acceptsPositional: true,
    positionalType: 'change-or-spec-id',
    positionals: [{ name: 'item-name', type: 'change-or-spec-id', optional: true }],
    flags: [
      COMMON_FLAGS.json,
      COMMON_FLAGS.type,
      COMMON_FLAGS.noInteractive,
      {
        name: 'deltas-only',
        description: ZH.help.show.deltasOnly,
      },
      {
        name: 'requirements-only',
        description: ZH.help.show.requirementsOnly,
      },
      {
        name: 'requirements',
        description: ZH.help.spec.requirements,
      },
      {
        name: 'no-scenarios',
        description: ZH.help.spec.noScenarios,
      },
      {
        name: 'requirement',
        short: 'r',
        description: ZH.help.spec.requirement,
        takesValue: true,
      },
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'archive',
    description: ZH.help.archive.description,
    acceptsPositional: true,
    positionalType: 'change-id',
    positionals: [{ name: 'change-name', type: 'change-id', optional: true }],
    flags: [
      {
        name: 'yes',
        short: 'y',
        description: ZH.flags.yes,
      },
      {
        name: 'skip-specs',
        description: ZH.help.archive.skipSpecs,
      },
      {
        name: 'no-validate',
        description: ZH.help.archive.noValidate,
      },
      {
        name: 'json',
        description: ZH.flags.jsonNonInteractive,
      },
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'status',
    description: ZH.help.status.description,
    flags: [
      {
        name: 'change',
        description: ZH.help.status.change,
        takesValue: true,
      },
      {
        name: 'schema',
        description: ZH.help.status.schema,
        takesValue: true,
      },
      COMMON_FLAGS.json,
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'instructions',
    description: ZH.help.instructions.description,
    acceptsPositional: true,
    positionals: [{ name: 'artifact', optional: true }],
    flags: [
      {
        name: 'change',
        description: ZH.help.instructions.change,
        takesValue: true,
      },
      {
        name: 'schema',
        description: ZH.help.status.schema,
        takesValue: true,
      },
      COMMON_FLAGS.json,
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'templates',
    description: ZH.help.templates.description,
    flags: [
      {
        name: 'schema',
        description: ZH.help.templates.schemaPlain,
        takesValue: true,
      },
      COMMON_FLAGS.json,
    ],
  },
  {
    name: 'schemas',
    description: ZH.help.schemas.description,
    flags: [
      COMMON_FLAGS.json,
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'new',
    description: ZH.help.new.description,
    flags: [],
    subcommands: [
      {
        name: 'change',
        description: ZH.help.new.change,
        acceptsPositional: true,
        positionals: [{ name: 'name' }],
        flags: [
          {
            name: 'description',
            description: ZH.help.new.descriptionOpt,
            takesValue: true,
          },
          {
            name: 'goal',
            description: ZH.help.new.goal,
            takesValue: true,
          },
          {
            name: 'schema',
            description: ZH.help.new.schemaPlain,
            takesValue: true,
          },
          COMMON_FLAGS.json,
          COMMON_FLAGS.store,
        ],
      },
    ],
  },
  {
    name: 'store',
    description:
      ZH.help.store.description,
    flags: [],
    subcommands: [
      {
        name: 'setup',
        description: ZH.help.store.setup,
        acceptsPositional: true,
        positionals: [{ name: 'id', optional: true }],
        flags: [
          {
            name: 'path',
            description: ZH.help.store.path,
            takesValue: true,
          },
          {
            name: 'init-git',
            description: ZH.help.store.initGit,
          },
          {
            name: 'no-init-git',
            description: ZH.help.store.noInitGit,
          },
          {
            name: 'remote',
            description: ZH.help.store.remote,
            takesValue: true,
          },
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'register',
        description: ZH.help.store.register,
        acceptsPositional: true,
        positionals: [{ name: 'path', type: 'path', optional: true }],
        flags: [
          {
            name: 'id',
            description: ZH.help.store.id,
            takesValue: true,
          },
          {
            name: 'yes',
            description: ZH.help.store.yes,
          },
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'unregister',
        description: ZH.help.store.unregister,
        acceptsPositional: true,
        positionals: [{ name: 'id' }],
        flags: [
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'remove',
        description: ZH.help.store.remove,
        acceptsPositional: true,
        positionals: [{ name: 'id' }],
        flags: [
          {
            name: 'yes',
            description: ZH.help.store.removeYes,
          },
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'list',
        description: ZH.help.store.list,
        flags: [
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'ls',
        description: ZH.help.store.list,
        flags: [
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'doctor',
        description: ZH.help.store.doctor,
        acceptsPositional: true,
        positionals: [{ name: 'id', optional: true }],
        flags: [
          COMMON_FLAGS.json,
        ],
      },
    ],
  },
  {
    name: 'context',
    description: ZH.help.context.description,
    flags: [
      COMMON_FLAGS.json,
      COMMON_FLAGS.store,
      {
        name: 'code-workspace',
        description: ZH.help.context.codeWorkspace,
        takesValue: true,
      },
      {
        name: 'force',
        description: ZH.help.context.force,
      },
    ],
  },
  {
    name: 'doctor',
    description: ZH.help.doctor.description,
    flags: [
      COMMON_FLAGS.json,
      COMMON_FLAGS.store,
    ],
  },
  {
    name: 'workset',
    description: ZH.help.workset.description,
    flags: [],
    subcommands: [
      {
        name: 'create',
        description: ZH.help.workset.create,
        acceptsPositional: true,
        positionals: [{ name: 'name', optional: true }],
        flags: [
          {
            name: 'member',
            description:
              ZH.help.workset.member,
            takesValue: true,
          },
          {
            name: 'tool',
            description: ZH.help.workset.tool,
            takesValue: true,
          },
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'list',
        description: ZH.help.workset.list,
        flags: [COMMON_FLAGS.json],
      },
      {
        name: 'ls',
        description: ZH.help.workset.list,
        flags: [COMMON_FLAGS.json],
      },
      {
        name: 'open',
        description:
          ZH.help.workset.open,
        acceptsPositional: true,
        positionals: [{ name: 'name' }],
        flags: [
          {
            name: 'tool',
            description: ZH.help.workset.openTool,
            takesValue: true,
          },
        ],
      },
      {
        name: 'remove',
        description: ZH.help.workset.remove,
        acceptsPositional: true,
        positionals: [{ name: 'name' }],
        flags: [
          {
            name: 'yes',
            description: ZH.help.workset.removeYes,
          },
          COMMON_FLAGS.json,
        ],
      },
    ],
  },
  {
    name: 'feedback',
    description: ZH.help.feedback.description,
    acceptsPositional: true,
    positionals: [{ name: 'message' }],
    flags: [
      {
        name: 'body',
        description: ZH.help.feedback.body,
        takesValue: true,
      },
    ],
  },
  {
    name: 'change',
    description: ZH.help.change.description,
    flags: [],
    subcommands: [
      {
        name: 'show',
        description: ZH.help.change.show,
        acceptsPositional: true,
        positionalType: 'change-id',
        positionals: [{ name: 'change-name', type: 'change-id', optional: true }],
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'deltas-only',
            description: ZH.help.change.deltasOnly,
          },
          {
            name: 'requirements-only',
            description: ZH.help.change.requirementsOnly,
          },
          COMMON_FLAGS.noInteractive,
        ],
      },
      {
        name: 'list',
        description: ZH.help.change.list,
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'long',
            description: ZH.help.change.long,
          },
        ],
      },
      {
        name: 'validate',
        description: ZH.help.change.validate,
        acceptsPositional: true,
        positionalType: 'change-id',
        positionals: [{ name: 'change-name', type: 'change-id', optional: true }],
        flags: [
          COMMON_FLAGS.strict,
          COMMON_FLAGS.jsonValidation,
          COMMON_FLAGS.noInteractive,
        ],
      },
    ],
  },
  {
    name: 'spec',
    description: ZH.help.spec.description,
    flags: [],
    subcommands: [
      {
        name: 'show',
        description: ZH.help.spec.show,
        acceptsPositional: true,
        positionalType: 'spec-id',
        positionals: [{ name: 'spec-id', type: 'spec-id', optional: true }],
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'requirements',
            description: ZH.help.spec.requirements,
          },
          {
            name: 'no-scenarios',
            description: ZH.help.spec.noScenarios,
          },
          {
            name: 'requirement',
            short: 'r',
            description: ZH.help.spec.requirement,
            takesValue: true,
          },
          COMMON_FLAGS.noInteractive,
        ],
      },
      {
        name: 'list',
        description: ZH.help.spec.list,
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'long',
            description: ZH.help.change.long,
          },
        ],
      },
      {
        name: 'validate',
        description: ZH.help.spec.validate,
        acceptsPositional: true,
        positionalType: 'spec-id',
        positionals: [{ name: 'spec-id', type: 'spec-id', optional: true }],
        flags: [
          COMMON_FLAGS.strict,
          COMMON_FLAGS.jsonValidation,
          COMMON_FLAGS.noInteractive,
        ],
      },
    ],
  },
  {
    name: 'completion',
    description: ZH.help.completion.description,
    flags: [],
    subcommands: [
      {
        name: 'generate',
        description: ZH.help.completion.generate,
        acceptsPositional: true,
        positionalType: 'shell',
        positionals: [{ name: 'shell', type: 'shell', optional: true }],
        flags: [],
      },
      {
        name: 'install',
        description: ZH.help.completion.install,
        acceptsPositional: true,
        positionalType: 'shell',
        positionals: [{ name: 'shell', type: 'shell', optional: true }],
        flags: [
          {
            name: 'verbose',
            description: ZH.flags.verbose,
          },
        ],
      },
      {
        name: 'uninstall',
        description: ZH.help.completion.uninstall,
        acceptsPositional: true,
        positionalType: 'shell',
        positionals: [{ name: 'shell', type: 'shell', optional: true }],
        flags: [
          {
            name: 'yes',
            short: 'y',
            description: ZH.flags.yes,
          },
        ],
      },
    ],
  },
  {
    name: 'config',
    description: ZH.help.config.description,
    flags: [
      {
        name: 'scope',
        description: ZH.help.config.scope,
        takesValue: true,
        values: ['global'],
      },
    ],
    subcommands: [
      {
        name: 'path',
        description: ZH.help.config.path,
        flags: [],
      },
      {
        name: 'list',
        description: ZH.help.config.list,
        flags: [
          COMMON_FLAGS.json,
        ],
      },
      {
        name: 'get',
        description: ZH.help.config.get,
        acceptsPositional: true,
        positionals: [{ name: 'key' }],
        flags: [],
      },
      {
        name: 'set',
        description: ZH.help.config.set,
        acceptsPositional: true,
        positionals: [{ name: 'key' }, { name: 'value' }],
        flags: [
          {
            name: 'string',
            description: ZH.help.config.string,
          },
          {
            name: 'allow-unknown',
            description: ZH.help.config.allowUnknown,
          },
        ],
      },
      {
        name: 'unset',
        description: ZH.help.config.unset,
        acceptsPositional: true,
        positionals: [{ name: 'key' }],
        flags: [],
      },
      {
        name: 'reset',
        description: ZH.help.config.reset,
        flags: [
          {
            name: 'all',
            description: ZH.help.config.all,
          },
          {
            name: 'yes',
            short: 'y',
            description: ZH.flags.yes,
          },
        ],
      },
      {
        name: 'edit',
        description: ZH.help.config.edit,
        flags: [],
      },
      {
        name: 'profile',
        description: ZH.help.config.profile,
        acceptsPositional: true,
        positionals: [{ name: 'preset', optional: true }],
        flags: [],
      },
    ],
  },
  {
    name: 'schema',
    description: ZH.help.schema.description,
    flags: [],
    subcommands: [
      {
        name: 'which',
        description: ZH.help.schema.which,
        acceptsPositional: true,
        positionalType: 'schema-name',
        positionals: [{ name: 'name', type: 'schema-name', optional: true }],
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'all',
            description: ZH.help.schema.all,
          },
        ],
      },
      {
        name: 'validate',
        description: ZH.help.schema.validate,
        acceptsPositional: true,
        positionalType: 'schema-name',
        positionals: [{ name: 'name', type: 'schema-name', optional: true }],
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'verbose',
            description: ZH.help.schema.verbose,
          },
        ],
      },
      {
        name: 'fork',
        description: ZH.help.schema.fork,
        acceptsPositional: true,
        positionalType: 'schema-name',
        positionals: [
          { name: 'source', type: 'schema-name' },
          { name: 'name', optional: true },
        ],
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'force',
            description: ZH.help.schema.force,
          },
        ],
      },
      {
        name: 'init',
        description: ZH.help.schema.init,
        acceptsPositional: true,
        positionals: [{ name: 'name' }],
        flags: [
          COMMON_FLAGS.json,
          {
            name: 'description',
            description: ZH.help.schema.descriptionOpt,
            takesValue: true,
          },
          {
            name: 'artifacts',
            description: ZH.help.schema.artifacts,
            takesValue: true,
          },
          {
            name: 'default',
            description: ZH.help.schema.default,
          },
          {
            name: 'no-default',
            description: ZH.help.schema.noDefault,
          },
          {
            name: 'force',
            description: ZH.help.schema.forceOverwrite,
          },
        ],
      },
    ],
  },
];
