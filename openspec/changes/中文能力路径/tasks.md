## 1. 能力路径语法

- [x] 1.1 为能力路径增加按 `/` 分段的校验：每段与变更名同一套汉字/kebab 规则，整段允许分层，拒绝空格、`\`、空段。
- [x] 1.2 确认 store id、workset 名、schema 名仍走 kebab；中文 store id 继续被拒绝。
- [x] 1.3 补测试：`用户认证`、`身份/用户认证` 通过；带空格或 `\` 失败；`cli-list` 与 `identity/user-auth` 仍通过。
- [x] 1.4 在 Windows 上用 `path.join` 覆盖 `openspec/specs/用户认证/` 与嵌套 `身份/用户认证/` 的真实目录，不写死斜杠。

## 2. Skill 与指令模板

- [x] 2.1 改 propose / explore / onboard / new / ff：新能力示例改为 `用户认证` 或 `身份/用户认证`，禁止拼音和英文 kebab；已有能力仍原样用现有路径。
- [x] 2.2 去掉 spec-driven 指令里「新引入的 path segment 必须 kebab-case」那句，改为与中文能力路径规则一致。
- [x] 2.3 更新 archive / sync / bulk-archive 的示例为中文路径，并保持「按 delta 已有 `<capability-path>` 原样落地」。
- [x] 2.4 构建并重新生成 `skills/`，更新 `skill-templates-parity` 的 hash。只应变动上述模板对应的 skills。

## 3. 测试与校验

- [x] 3.1 补齐 Skill 正文断言：新能力指导含 `用户认证`，不含把新能力写成 `user-auth`；改 `cli-list` 时仍指向 `specs/cli-list/`。
- [x] 3.2 跑能力路径、validate-international、archive/sync 相关聚焦测试，确认 Windows 路径用例会在 CI 中执行。
- [x] 3.3 运行 `openspec validate 中文能力路径 --strict` 与相关构建，确认产物齐全。
