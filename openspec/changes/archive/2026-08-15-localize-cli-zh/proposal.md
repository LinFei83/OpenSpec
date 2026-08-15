## Why

人类在终端里看到的 OpenSpec 全是英文：help、欢迎屏、Dashboard、`list`、提示和 Error/Fix。这个仓库面向中文使用者，需要把人机面写死成简体中文。同时，新建变更的文件夹名应是中文短名；当前 kebab 校验会拒绝汉字，代理 Skill 也会把描述收成英文 kebab，所以人机面改完之后，变更名仍会继续是 `add-user-auth`。

本次 change 自己仍用英文名 `localize-cli-zh`，因为创建规则还没有放宽。

## What Changes

- **BREAKING**（对人机面）：非 JSON 的 CLI 文案写死为简体中文。不做 locale 检测，不做 `--locale`，不保留英文 UI 开关。命令名、flag 名、`--json` 字段保持英文。
- 放宽**变更目录名**校验：允许汉字等字母，仍禁止空格和路径分隔符。英文 kebab 创建时仍接受，以便旧脚本和已有测试不炸。store id、workset 名、规格路径仍用原来的 kebab。
- 只改创建类 Skill/Command 模板里的**起名规则**（propose、new、ff、onboard）：从描述压成短中文目录名，不要拼音、不要英文 kebab。Skill 正文其余部分保持英文，供模型执行。
- 已有英文变更目录不改名。规格能力路径 `openspec/specs/<capability>/` 仍 kebab。
- 不翻译网站、README、JSON `message`/`fix`（代理契约）。欢迎屏和 Dashboard 按终端显示宽度处理汉字双宽，避免折行和对不齐。

## Capabilities

### New Capabilities

- `cli-human-copy`: 人机面（help、欢迎屏、Dashboard、list、doctor、交互提示、Error/Fix/Cancelled、相对时间）固定为简体中文；JSON 与命令标识保持英文。
- `change-name-derivation`: 生成出的 propose / new / ff / onboard Skill 与对应 slash command 指导代理用短中文目录名创建变更。

### Modified Capabilities

- `change-creation`: 变更名允许汉字；kebab 仍可创建；空格、路径分隔符、非法符号仍拒绝。store id 语法不变。
- `opsx-onboard-skill`: 引导创建变更时派生中文目录名，不再派生 kebab-case。
- `cli-init`: 欢迎屏、进度、交互提示等人机文案改为简体中文。
- `cli-list`: 空列表与相关人机提示改为简体中文。
- `cli-view`: Dashboard 分区标题与人机标签改为简体中文，汉字按显示宽度对齐。
- `telemetry`: 首次运行披露改为简体中文；`--json` 仍不打印该行。

## Impact

- CLI 入口、各命令 description、欢迎屏、Dashboard、`list`、共享 Error/Fix/Cancelled、相对时间、doctor/init 提示。
- `validateChangeName` 与 `isKebabId` 拆开：后者继续服务 store id。
- `src/core/templates/workflows/` 中 propose、new-change、ff-change、onboard 的起名句；生成 `skills/` 并更新 parity hash。
- 主规格 `change-creation`、`opsx-onboard-skill`、以及钉死了英文原文的 CLI/telemetry 场景。
- 大量断言英文原文的测试改为断言中文原文；Windows 上覆盖中文变更目录名。
- 已安装到各工具目录的 Skill 需 `openspec update` 后才会带上新的起名规则。
