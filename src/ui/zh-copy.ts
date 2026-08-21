/**
 * 人机面简体中文文案目录。不读 locale，不提供语言开关。
 * JSON `message`/`fix`、命令名、flag 名保持英文，不从这里取值。
 */

export const ZH = {
  prefix: {
    error: '错误:',
    fix: '修复:',
    cancelled: '已取消。',
  },

  welcome: {
    title: '欢迎使用 OpenSpec',
    subtitle: '轻量规格驱动框架',
    willConfigure: '本次设置将配置：',
    agentSkills: '  • 面向 AI 工具的 Agent Skills',
    workflowCommands: '  • 工作流命令，若工具支持',
    quickStart: '设置完成后快速开始：',
    spellingVaries: '  (各工具拼写可能不同)',
    pressEnter: '按 Enter 选择工具',
  },

  onboarding: {
    propose: '开始变更',
    scaffold: '搭建变更',
    nextArtifact: '下一产物',
    implement: '实现任务',
  },

  view: {
    title: 'OpenSpec 面板',
    missingDir: '未找到 openspec 目录',
    summary: '概览',
    specifications: '规格',
    draftChanges: '草稿变更',
    activeChanges: '进行中的变更',
    completedChanges: '已完成的变更',
    specsCount: (specs: number, requirements: number) =>
      `规格: ${specs} 项，${requirements} 条需求`,
    draftCount: (count: number) => `草稿变更: ${count}`,
    activeCount: (count: number) => `进行中的变更: ${count} 进行中`,
    completedCount: (count: number) => `已完成的变更: ${count}`,
    taskProgress: (completed: number, total: number, percent: number) =>
      `任务进度: ${completed}/${total}（${percent}% 完成）`,
    requirement: (count: number) => `需求 ${count}`,
    footer: '使用 openspec list --changes 或 openspec list --specs 查看详细列表',
  },

  list: {
    noActiveChanges: '没有进行中的变更。',
    noSpecs: '没有找到规格。',
    noTasks: '无任务',
    complete: '✓ 完成',
    tasks: (completed: number, total: number) => `${completed}/${total} 任务`,
    requirement: (count: number) => `需求 ${count}`,
    justNow: '刚刚',
    daysAgo: (n: number) => `${n}天前`,
    hoursAgo: (n: number) => `${n}小时前`,
    minutesAgo: (n: number) => `${n}分钟前`,
    missingChangesDir: "未找到 OpenSpec 变更目录。请先运行 'openspec init'。",
    changesHeader: '变更:',
    specsHeader: '规格:',
  },

  init: {
    creatingStructure: '正在创建 OpenSpec 结构...',
    structureCreated: '已创建 OpenSpec 结构',
    configuringTools: '正在配置 AI 工具...',
    toolsConfigured: '已配置 AI 工具',
    settingUpTool: (name: string) => `正在配置 ${name}...`,
    setupCompleteFor: (name: string) => `已配置 ${name}`,
    created: (names: string) => `已创建: ${names}`,
    refreshed: (names: string) => `已刷新: ${names}`,
    extendPrompt: '你想添加或刷新哪些 AI 工具？',
    selectTools: (count: number) => `选择要配置的 AI 工具（${count} 个可用）`,
    configuredCheck: '(已配置 ✓)',
    configured: '(已配置)',
    comingSoon: '即将推出',
    detected: '(已检测)',
    refresh: '(刷新)',
    selected: '(已选)',
    noneSelected: '(未选择)',
    none: '(无)',
    selectedLabel: '已选:',
    searchLabel: '搜索:',
    typeToFilter: '输入以筛选',
    noMatches: '无匹配项',
    instructions: '导航 • Space 切换 • Backspace 移除 • Enter 确认',
    selectAtLeastOne: '请至少选择一个工具',
    gettingStarted: '开始使用:',
    restartIde: '请重启 IDE 以使斜杠命令生效',
  },

  doctor: {
    title: '诊断',
    root: '根目录',
    location: '位置',
    openspecRoot: 'OpenSpec 根目录',
    ok: '正常',
    unhealthy: '异常',
    store: '仓库',
    metadataOk: '元数据正常',
    metadataInvalid: '元数据无效',
    references: '引用',
    noneDeclared: '(未声明)',
    note: '说明',
  },

  flags: {
    json: '以 JSON 输出',
    jsonValidation: '以 JSON 输出校验结果',
    jsonProgrammatic: '以 JSON 输出（供程序使用）',
    jsonNonInteractive: '以 JSON 输出（非交互）',
    jsonAgent: '以 JSON 输出（供代理使用）',
    jsonContext: '以 JSON 输出代理摘要',
    jsonTemplates: '以 JSON 输出产物 ID 到模板路径的映射',
    strict: '启用严格校验模式',
    noInteractive: '禁用交互式提示',
    type: '类型不明确时指定项目类型：change|spec',
    store: '用作 OpenSpec 根目录的仓库 ID（仓库是你已注册的独立 OpenSpec 仓库）',
    storePathHidden: '不支持；请用 "openspec store register <path>" 注册路径，然后使用 --store <id>',
    storePathRemoved: '已移除；请注册仓库并使用 --store',
    noColor: '禁用彩色输出',
    yes: '跳过确认提示',
    force: '即使工具已是最新也强制更新',
    verbose: '显示详细输出',
  },

  help: {
    program: '面向 AI 的规格驱动开发系统',
    init: {
      description: '在项目中初始化 OpenSpec',
      tools: '非交互方式配置 AI 工具（例如 "all"、"none" 或逗号分隔的工具 ID）',
      force: '自动清理旧文件，不再提示',
      profile: '覆盖全局配置档案（core 或 custom）',
      noAnimation: '显示静态欢迎屏，而不是动画',
      copilotCloud: '不经提示直接设置 GitHub Copilot 云端 coding-agent 文件',
      noCopilotCloud: '不经提示跳过 GitHub Copilot 云端 coding-agent 文件',
      experimental: 'init 的别名（已弃用）',
      tool: '目标 AI 工具（映射到 --tools）',
    },
    update: {
      description: '更新 OpenSpec 指令文件',
      force: '即使工具已是最新也强制更新',
    },
    list: {
      description: '列出项目（默认列出变更）。使用 --specs 列出规格。',
      specs: '列出规格而不是变更',
      changes: '显式列出变更（默认）',
      sort: '排序方式："recent"（默认）或 "name"',
    },
    view: {
      description: '显示规格与变更的交互式面板',
    },
    validate: {
      description: '校验变更和规格',
      all: '校验全部变更和规格',
      changes: '校验全部变更',
      specs: '校验全部规格',
      archived: '校验已归档变更的任务是否全部完成（用于提交前检查）',
      concurrency: '最大并发校验数（默认取环境变量 OPENSPEC_CONCURRENCY 或 6）',
    },
    show: {
      description: '显示变更或规格',
      deltasOnly: '仅显示增量（仅 JSON，变更）',
      requirementsOnly: '--deltas-only 的别名（已弃用，变更）',
      requirements: '仅 JSON：只显示需求（不含场景）',
      noScenarios: '仅 JSON：排除场景内容',
      requirement: '仅 JSON：按 ID 显示指定需求（从 1 开始）',
    },
    archive: {
      description: '归档已完成的变更并更新主规格',
      skipSpecs: '跳过规格更新（适用于基础设施、工具或纯文档变更）',
      noValidate: '跳过校验（不推荐，需要确认）',
    },
    status: {
      description: '显示变更的产物完成状态',
      change: '要查看状态的变更名',
      schema: '覆盖所用工作流 schema（默认从 config.yaml 检测）',
    },
    instructions: {
      description: '输出产物、apply 或 archive 的增强指令',
      change: '变更名',
      schema: '覆盖所用工作流 schema（默认从 config.yaml 检测）',
    },
    templates: {
      description: '显示 schema 中全部产物的解析后模板路径',
      schema: (defaultSchema: string) => `使用的 schema（默认：${defaultSchema}）`,
      schemaPlain: '使用的 schema',
    },
    schemas: {
      description: '列出可用的工作流 schema 及其说明',
    },
    new: {
      description: '创建新项目',
      change: '创建新的变更目录',
      descriptionOpt: '写入 README.md 的说明',
      goal: '与变更一起存储的可选目标元数据',
      schema: (defaultSchema: string) => `使用的工作流 schema（默认：${defaultSchema}）`,
      schemaPlain: '使用的工作流 schema',
    },
    change: {
      description: '管理 OpenSpec 变更提案',
      show: '以 JSON 或 Markdown 显示变更提案',
      list: '列出全部进行中的变更（已弃用：请改用 "openspec list"）',
      validate: '校验变更提案',
      long: '显示 id、标题和计数',
      deltasOnly: '仅显示增量（仅 JSON）',
      requirementsOnly: '--deltas-only 的别名（已弃用）',
    },
    spec: {
      description: '管理 OpenSpec 规格',
      show: '显示规格',
      list: '列出全部规格',
      validate: '校验规格',
      long: '显示 id、标题和计数',
      requirements: '仅显示需求，排除场景（仅 JSON）',
      noScenarios: '排除场景内容（仅 JSON）',
      requirement: '按 ID 显示指定需求（仅 JSON）',
    },
    store: {
      description: '创建并管理仓库——你在本机注册的独立 OpenSpec 仓库',
      setup: '创建或注册本地仓库',
      path: '仓库所在目录',
      initGit: '在仓库中初始化 Git 仓库',
      noInitGit: '跳过 Git 仓库初始化',
      remote: '写入 store.yaml 的规范克隆源',
      register: '注册已有仓库目录',
      id: '仓库 ID',
      yes: '确认创建仓库身份元数据',
      unregister: '忘记本地仓库注册，不删除文件',
      remove: '忘记本地仓库注册并删除其本地文件夹',
      removeYes: '确认删除本地仓库文件夹',
      list: '列出已注册的仓库',
      doctor: '检查本地仓库注册和元数据',
    },
    context: {
      description: '打印已解析 OpenSpec 根目录的工作上下文',
      codeWorkspace: '同时为该集合写入 VS Code 工作区文件',
      force: '覆盖已有的 --code-workspace 文件',
    },
    doctor: {
      description: '报告已解析 OpenSpec 根目录的关系健康状况',
    },
    workset: {
      description: '组合、保留并打开个人工作视图（纯本地）',
      create: '组合并保存你所选文件夹的命名工作视图',
      member: '成员文件夹，格式为 <path> 或 <name>=<path>；可重复，第一项为主目录',
      tool: '打开此工作集时首选的工具',
      list: '显示已保存的工作集及其成员',
      open: '在工具中打开已保存的工作集（编辑器窗口或代理会话）',
      openTool: '仅此次使用该工具打开',
      remove: '删除已保存的工作集（不会触及成员文件夹）',
      removeYes: '非交互确认删除',
    },
    feedback: {
      description: '提交关于 OpenSpec 的反馈',
      body: '反馈的详细说明',
    },
    completion: {
      description: '管理 OpenSpec CLI 的 shell 补全',
      generate: '为指定 shell 生成补全脚本（输出到 stdout）',
      install: '为指定 shell 安装补全脚本',
      uninstall: '卸载指定 shell 的补全脚本',
      complete: '以机器可读格式输出补全数据（内部使用）',
    },
    config: {
      description: '查看和修改全局 OpenSpec 配置',
      scope: '配置范围（目前仅支持 "global"）',
      path: '显示配置文件位置',
      list: '显示全部当前设置',
      get: '获取指定值（原始值，可供脚本使用）',
      set: '设置值（自动转换类型）',
      string: '强制将值存为字符串',
      allowUnknown: '允许设置未知键',
      unset: '移除键（恢复默认）',
      reset: '将配置重置为默认值',
      all: '重置全部配置（必需）',
      edit: '在 $EDITOR 中打开配置',
      profile: '配置工作流档案（交互选择或预设快捷方式）',
    },
    schema: {
      description: '管理工作流 schema',
      which: '显示 schema 从何处解析',
      all: '列出全部 schema 及其解析来源',
      validate: '校验 schema 结构与模板',
      verbose: '显示详细校验步骤',
      fork: '将已有 schema 复制到项目以便定制',
      force: '覆盖已有目标',
      init: '创建新的项目本地 schema',
      descriptionOpt: 'schema 说明',
      artifacts: '逗号分隔的产物 ID',
      default: '设为项目默认 schema',
      noDefault: '不提示设为默认',
      forceOverwrite: '覆盖已有 schema',
    },
  },

  diagnostics: {
    changes_dir_not_found: "未找到 OpenSpec 变更目录。请先运行 'openspec init'。",
    openspec_dir_not_found: '未找到 openspec 目录',
  },
} as const;

export function errorLine(message: string): string {
  return `${ZH.prefix.error} ${message}`;
}

export function fixLine(fix: string): string {
  return `${ZH.prefix.fix} ${fix}`;
}

export function humanMessageForCode(code: string | undefined, fallback: string): string {
  if (code && Object.prototype.hasOwnProperty.call(ZH.diagnostics, code)) {
    return ZH.diagnostics[code as keyof typeof ZH.diagnostics];
  }
  return fallback;
}

export function describeToolsOption(toolIds: string, aliasNote: string): string {
  return `非交互方式配置 AI 工具。使用 "all"、"none" 或逗号分隔的列表：${toolIds}。同时接受：${aliasNote}`;
}
