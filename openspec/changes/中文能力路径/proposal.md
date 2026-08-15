## Why

上一刀把变更目录改成了短中文名，但 archive / sync 会把变更里已有的 `<capability-path>` 原样落到 `openspec/specs/`。代理若在 delta 里写成 `current-date-display`，主规格就永远是英文 kebab。人要在同步后看到中文规格目录，必须在给能力取名时就用中文。

## What Changes

- 新建能力时，propose / explore / onboard / new / ff 指导代理用短中文能力路径（例如 `用户认证`，已按领域分目录时可用 `身份/用户认证`），禁止拼音和英文 kebab。
- 改已有能力时，delta 仍写在现有路径上（例如 `specs/cli-list/spec.md`），不改名。
- archive / sync / bulk-archive 继续按 delta 路径原样同步，示例改为中文路径，且不得把中文路径改写成 kebab。
- spec-driven 的 proposal / specs 指令模板去掉「新路径段必须 kebab-case」。
- `change-creation` 不再把规格能力路径锁在 kebab；store id、workset 名、schema 名仍 kebab。已有英文规格目录不改名。

## Capabilities

### New Capabilities

- `规格路径派生`: 创建类 Skill 为尚未存在的能力选用短中文目录路径；改已有能力时沿用现有路径。

### Modified Capabilities

- `change-creation`: 能力路径各段允许汉字（可嵌套 `/`）；不再要求规格能力路径保持 kebab。变更名规则本身不变。

## Impact

- `src/core/templates/workflows/` 中 propose、explore、onboard、new-change、ff-change 的能力路径说明；archive、sync、bulk-archive 的示例。
- `schemas/spec-driven/` 里 proposal / specs 的指令句。
- 如有写路径仍用 `isKebabId` 拒绝中文能力段，则拆出按段校验（允许 `/`，拒绝 `\`）。
- 生成 `skills/` 并更新 parity hash；已 init 的项目需 `openspec update`。
- Windows 上覆盖中文及嵌套中文规格目录（`path.join`，不断言死斜杠）。
