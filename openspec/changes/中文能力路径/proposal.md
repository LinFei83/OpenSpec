## Why

变更目录已经可以是短中文名，但代理写 delta 规格时仍会新建 `current-date-display` 这类英文 kebab 能力目录。人看到「变更是中文、规格是英文」会以为汉化没做完。CLI 其实已经能读写中文规格目录（例如校验 `日志记录`），缺口在约定和 Skill 示例：它们仍把新能力写成 `user-auth`。

## What Changes

- 新建能力时，`<capability-path>` 从描述压成短中文目录（可带领域前缀，如 `身份/用户认证`），禁止拼音和英文 kebab。
- 已有能力保持原路径：改 `cli-list` 仍写到 `specs/cli-list/`，不把存量规格改名。
- 能力路径每一段允许汉字或原有 kebab；段与段之间仍可用 `/` 分层。空格、下划线、反斜杠仍拒绝。
- 更新 propose / explore / onboard / archive / sync 的起名或示例句，使新能力示例不再是 `user-auth`。
- 修正 `change-creation` 里「规格能力路径仍 kebab」的句子（那是上一刀 `localize-cli-zh` 故意留下的）。
- store id、workset 名、schema 名仍走 kebab。不翻译 JSON 字段名。不批量重命名仓库里已有的英文规格目录。

## Capabilities

### New Capabilities

- `规格路径派生`: 创建类与探索类 Skill 指导代理为**新**能力选用短中文路径；改已有能力时原样使用现有路径。

### Modified Capabilities

- `change-creation`: 规格能力路径不再锁定 kebab；路径段语法与中文变更名同类，但允许 `/` 分层。
- `openspec-conventions`: 新能力目录约定改为短中文路径；存量路径保持。
- `opsx-archive-skill`: 示例改为中文能力路径；仍按 delta 里已有路径原样落到主规格。
- `specs-sync-skill`: 同上，sync 仍按 delta 路径原样写入，不把中文路径改回 kebab。

## Impact

- `src/core/templates/workflows/` 中 propose、explore、onboard、archive、sync 的能力路径说明与示例。
- 若 CLI 对能力 id 另有 kebab 校验，需与变更名拆开（发现阶段：目录发现已接受中文，`validate 日志记录` 已有测试）。
- 生成 `skills/` 并更新 parity hash。
- 已 init 的项目需 `openspec update` 后 Skill 才会改口。
- 与未归档的 `localize-cli-zh` 叠放：上一刀允许中文变更名并写明能力路径仍 kebab；本刀取消那句锁定。
