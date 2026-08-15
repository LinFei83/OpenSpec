## 1. 中文文案目录与显示宽度

- [x] 1.1 新增人机文案模块，集中存放简体中文 copy（help、Error/Fix/Cancelled、相对时间、Dashboard 分区标题等），不引入 i18n 库，不读 locale。
- [x] 1.2 新增按终端列宽计算的辅助函数：CJK 计 2 列、ASCII 计 1 列；欢迎屏预算和 Dashboard `padEnd` 改用列宽而不是 `String.length`。
- [x] 1.3 共享失败输出改为中文前缀 `错误:` / `修复:` / `已取消。`；`--json` 的 `message`/`fix` 保持英文。

## 2. 变更名校验

- [x] 2.1 把 `validateChangeName` 从 `isKebabId` 拆开：允许汉字目录名与原有 kebab；仍拒绝空格、路径分隔符、下划线、首尾/连续连字符。
- [x] 2.2 确认 store id、workset 名、schema 名仍走 `isKebabId`，中文 store id 继续被拒绝。
- [x] 2.3 补充 `validateChangeName` / `createChange` 测试：`添加用户认证`、`中文化cli人机面` 通过；带空格或 `\` `/` 的中文名失败；kebab 旧名仍通过。
- [x] 2.4 在 Windows 上覆盖 `createChange(..., '添加用户认证')` 的真实目录创建（`path.join` 断言，不写死斜杠）。

## 3. 第一圈 CLI 人机面

- [x] 3.1 将 Commander 根命令与各子命令的 `.description()` / option 说明改为文案模块中的中文。
- [x] 3.2 欢迎屏与 onboarding 短句改为中文，并按列宽验证 60 列下不折行。
- [x] 3.3 `openspec view` 分区标题、空目录错误、进度标签改为中文，中文变更名与进度条对齐。
- [x] 3.4 `openspec list` 空状态、无任务、缺目录错误、相对时间改为中文。
- [x] 3.5 `openspec init` 进度 spinner、工具多选提示、已配置/即将推出、成功摘要改为中文。
- [x] 3.6 首次 telemetry 披露改为规格中的中文原文；`--json` 仍不打印该行。
- [x] 3.7 doctor 及其他第一圈人机提示接入同一文案模块。

## 4. 创建类 Skill 起名规则

- [x] 4.1 只改 `propose`、`new-change`、`ff-change`、`onboard` 的 skill 与 command 模板起名句：从描述压短中文名，禁止拼音和英文 kebab。
- [x] 4.2 去掉 new-change 里「必须 kebab-case」的 guardrail，改为与新的变更名语法一致。
- [x] 4.3 构建并重新生成 `skills/`，更新 `skill-templates-parity` 的 hash。

## 5. 测试与校验

- [x] 5.1 把断言英文原文的人机面测试改为断言规格中的中文原文；JSON 测试仍断言英文 `message`。
- [x] 5.2 跑变更名、欢迎屏、view、list、init、telemetry 的聚焦测试，并确认 Windows 路径用例会在 CI 中执行。
- [x] 5.3 运行 `openspec validate --change localize-cli-zh --strict` 与相关构建，确认产物齐全。
