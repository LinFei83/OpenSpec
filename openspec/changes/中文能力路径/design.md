## Context

See proposal.md for motivation. `localize-cli-zh` already lets change folders be Chinese and taught create-change skills to derive `添加用户认证`. Spec capability folders were explicitly left on kebab. The filesystem and `discoverSpecFiles` already walk any directory name; `test/cli-e2e/validate-international.test.ts` validates `openspec/specs/日志记录`. Agents still emit `user-auth` because propose/explore/onboard examples say so, and the proposal/spec instruction templates still say "new path segments must be kebab-case".

Change names reject `/`. Capability ids historically allow nested `identity/user-auth`. Those two grammars must not be collapsed into one function.

## Goals / Non-Goals

**Goals:**

- One shared "path segment" grammar (Chinese-or-kebab, same character rules as change names) for each capability segment.
- Nested `/` still allowed between segments.
- Skill/instruction copy: new capability → Chinese path; existing capability → keep path.
- Rebuild skills and refresh parity hashes.

**Non-Goals:**

- Renaming existing `openspec/specs/cli-list/` (or any in-repo kebab spec) to Chinese.
- Chinese store ids, workset names, or schema names.
- i18n / locale switching.
- Translating Skill bodies beyond the capability-path sentences and examples.

## Decisions

### 1. Segment grammar, not a copy of `validateChangeName`

Add `validateCapabilityPath()` (name in design only) that splits on `/`, then validates each segment with the same character class as change names. Reject `\\`, empty segments, `.`, `..`. Do not reuse `validateChangeName` for the whole string, because that function rejects `/`.

**Why:** Nested specs (`身份/用户认证`) are already a product feature (`#1353`). Flattening to a single folder would break domain layouts.

**Alternative considered:** Allow Chinese only for the last segment and keep kebab area prefixes. Rejected: a Chinese-first project would still see `identity/用户认证` hybrids.

### 2. Teach skills; only add CLI validation if a write path currently rejects Chinese

Discovery, validate, and list already handle `日志记录`. If `openspec spec` create or some id parser still calls `isKebabId`, split that call. If nothing rejects Chinese paths, do not invent a new error for paths that already work.

**Why:** The user-visible bug is agent naming, not mkdir.

**Alternative considered:** A hard CLI validator that fails kebab-only new specs. Rejected: existing kebab must remain creatable, and we cannot distinguish "legacy kebab" from "agent ignored the skill" at the CLI.

### 3. Edit templates, then generate skills

Change capability-path copy in:

- `propose.ts` (skill + command + the "new segments must be kebab-case" instruction sentence)
- `explore.ts`
- `onboard.ts`
- `new-change.ts` / `ff-change.ts` if they mention capability examples
- `archive-change.ts`, `sync-specs.ts`, `bulk-archive-change.ts` examples (`user-auth` → `用户认证`) while keeping "preserve the delta path as-is"

Also update the spec-driven schema instruction templates that tell authors "Any path segment newly introduced in the proposal must be kebab-case" — that sentence is what will fight this change on the next propose.

Then `pnpm build && pnpm generate:skills && pnpm regen:parity-hashes`.

### 4. Stack after `localize-cli-zh`

The `change-creation` delta in this change MODIFIES the Chinese change-name requirement from `localize-cli-zh` (drops "spec capability paths keep kebab"). Archive or apply this change after that one, or merge the two deltas by hand if both are still open.

### 5. Windows paths

Tests that create `openspec/specs/用户认证/` or nested `身份/用户认证/` MUST use `path.join`. Do not hard-code `/` in expected filesystem paths. JSON spec ids stay forward-slash separated (`身份/用户认证`) as `discoverSpecFiles` already documents.

## Risks / Trade-offs

- [代理仍写出 kebab] → 指令里同时给正例 `用户认证` 和反例「不要 `user-auth`」；instruction 模板去掉 kebab-only 那句。
- [存量英文规格与新中文规格并存] → 明确「已有路径不改名」；接受仓库里两套风格直到有人另开迁移 change。
- [cmd.exe / 旧 Git 编码] → 与变更目录同一策略：Node UTF-8 路径 API；Windows 测试覆盖真实中文目录。
- [未 update 的已安装 Skill] → 与上一刀相同：`openspec update`。

## Migration Plan

1. Ship CLI segment validation (if needed) + template copy + generated skills.
2. Users who already ran init run `openspec update`.
3. Existing kebab specs stay. New capabilities in Chinese-first projects use Chinese paths.
4. Rollback is revert; no data migration.

## Open Questions

None that block this design. Whether to later migrate this repo's own `cli-list` etc. to Chinese is a separate change.
