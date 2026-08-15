## Context

See proposal.md for motivation. Today every human-mode string is an English literal next to `console.log`, Commander `.description()`, Inquirer prompts, or `ora()`. Change names share `isKebabId()` with store ids (`^[a-z0-9]+(?:-[a-z0-9]+)*$`), so `openspec new change "添加用户认证"` fails before mkdir. Create-change skill templates in `src/core/templates/workflows/` tell agents to derive kebab-case; `skills/` is generated from those templates and checked by parity hashes.

The CLI already splits human vs JSON output (`emitFailure`, `isJsonRun`). This change keeps that split and only rewrites the human side.

## Goals / Non-Goals

**Goals:**

- One hardcoded Simplified Chinese catalog for human-mode CLI copy.
- Change-name grammar that accepts Chinese folder names without loosening store ids.
- Naming instructions in the four create-change templates, then regenerate skills and refresh hashes.
- Display-width handling for CJK on the welcome screen and dashboard.

**Non-Goals:**

- i18n framework, locale detection, or an English UI toggle.
- Translating Skill bodies beyond the naming sentences.
- Translating JSON `message`/`fix`, the website, or README.
- Renaming existing English change directories.
- Changing spec capability path kebab rules.

## Decisions

### 1. Hardcoded catalog, not a locale library

Put human-mode strings in one TypeScript module (for example `src/ui/zh-copy.ts`) and import it from Commander registration, welcome, view, list, shared failure lines, and prompts. Do not add `i18next` or read `LANG`.

**Why:** The product choice is "always Chinese". A library would imply switching that we are not building.

**Alternative considered:** Inline Chinese at every call site. Rejected because the same `错误:` / `修复:` / `已取消。` lines would drift.

### 2. Split change-name grammar from kebab ids

Keep `isKebabId()` for store ids, workset names, and schema names. Give `validateChangeName()` its own rule: existing kebab **or** Unicode letters (including CJK) plus digits and single hyphens; still reject spaces, `\` `/`, underscores, leading/trailing/consecutive hyphens, and names longer than 200 characters.

**Why:** Sharing one regex would let `openspec store register` take Chinese ids, which is out of scope.

**Alternative considered:** Reject kebab on create so every new name is Chinese. Rejected: existing tests and scripts still pass `add-auth`; skills enforce Chinese going forward.

### 3. Edit templates, then generate skills

Change naming copy only in:

- `propose.ts` (skill + command)
- `new-change.ts` (skill + command)
- `ff-change.ts` (skill + command)
- `onboard.ts` (skill + command)

Then rebuild and regenerate `skills/` / command snapshots, and update `test/core/templates/skill-templates-parity.test.ts` hashes. Apply, archive, continue, update, sync, verify, and explore keep English workflow text; their `add-auth` examples MAY be swapped to a Chinese name but that is not required for the naming contract.

**Why:** `skills/*.md` is not the source of truth. Editing only the generated files would fail parity.

### 4. Count CJK as two columns

Welcome onboarding hints currently budget 17 ASCII characters beside a 24-column art column (`DESCRIPTION_BUDGET`). Dashboard uses `padEnd(30)` on change names. Use a display-width helper (East Asian Width: CJK = 2, ASCII = 1) for those paddings and wrap checks.

**Why:** `String.length` and `padEnd` treat `中` as one column, so the animation cursor-up count and progress-bar column break on Windows terminals.

### 5. JSON `message` stays English

`StoreDiagnostic.message` / `fix` remain English. Human mode prefixes them with `错误:` / `修复:` and may translate the prefix only, or look up a Chinese sentence from the catalog keyed by `code` when one exists. Prefer catalog-by-code for the first-circle commands so humans do not see a Chinese prefix plus an English sentence.

**Why:** `--json` is the agent contract (see `suppress-telemetry-notice-in-json`). Mixing Chinese into JSON would break parsers that snapshot `message`.

## Risks / Trade-offs

- [汉字目录名在 cmd.exe / 旧 Git 上的编码] → 用 UTF-8 路径 API；测试在 Windows 上创建 `openspec/changes/添加用户认证/`；`Fix:` 里需要粘贴的名字用双引号包起来（现有 `quoteForShell` 已会给非 ASCII 加引号）。
- [欢迎屏折行导致动画错位] → 显示宽度预算按列计算，中文短句写进 `DESCRIPTION_BUDGET` 的列宽，而不是字符数。
- [与未归档的 `suppress-telemetry-notice-in-json` 同时改 telemetry 披露] → telemetry delta 保留 JSON 静默行为，只替换人机那一行中文。
- [已安装 Skill 仍教 kebab] → 实现后需要 `openspec update`；在 init/update 成功摘要里用中文提示刷新。
- [上游难以合入] → 这是写死中文的产品分叉；不引入 locale 开关来假装可上游化。

## Migration Plan

1. Ship catalog + validation + templates in one change.
2. After install, users who already ran `init` run `openspec update` so create-change skills pick up Chinese naming.
3. Existing `openspec/changes/<kebab>/` directories stay; new changes use Chinese names.
4. Rollback is reverting the change; no data migration.

## Open Questions

None. Language is hardcoded; kebab remains valid on create; only the four create-change templates change naming text.
