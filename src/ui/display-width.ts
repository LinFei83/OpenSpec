/**
 * 按终端列宽计量字符串：CJK/全角计 2 列，ASCII 计 1 列。
 * 欢迎屏折行与 Dashboard padEnd 必须走这里，不能用 String.length。
 */

const ANSI_REGEX = /\u001b\[[0-9;]*m/g;

export function stripAnsi(text: string): string {
  return text.replace(ANSI_REGEX, '');
}

function isWideCodePoint(code: number): boolean {
  return (
    (code >= 0x1100 && code <= 0x115f) ||
    code === 0x2329 ||
    code === 0x232a ||
    (code >= 0x2e80 && code <= 0xa4cf && code !== 0x303f) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xfe10 && code <= 0xfe19) ||
    (code >= 0xfe30 && code <= 0xfe6f) ||
    (code >= 0xff00 && code <= 0xff60) ||
    (code >= 0xffe0 && code <= 0xffe6) ||
    (code >= 0x1f300 && code <= 0x1f64f) ||
    (code >= 0x1f900 && code <= 0x1f9ff) ||
    (code >= 0x20000 && code <= 0x3fffd)
  );
}

function isZeroWidthCodePoint(code: number): boolean {
  return (
    (code >= 0x0300 && code <= 0x036f) ||
    (code >= 0x200b && code <= 0x200f) ||
    (code >= 0x202a && code <= 0x202e) ||
    (code >= 0xfe00 && code <= 0xfe0f) ||
    code === 0xfeff ||
    (code >= 0x1160 && code <= 0x11ff)
  );
}

/**
 * 返回字符串在终端中占用的列数（忽略 ANSI 颜色码）。
 */
export function displayWidth(text: string): number {
  let width = 0;
  for (const char of stripAnsi(text)) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;
    if (isZeroWidthCodePoint(code)) continue;
    width += isWideCodePoint(code) ? 2 : 1;
  }
  return width;
}

/**
 * 按显示列宽右填充空格，使 CJK 与 ASCII 在同一列对齐。
 */
export function padEndDisplay(text: string, columns: number): string {
  const width = displayWidth(text);
  if (width >= columns) return text;
  return text + ' '.repeat(columns - width);
}
