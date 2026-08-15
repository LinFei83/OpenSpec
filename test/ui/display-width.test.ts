import { describe, expect, it } from 'vitest';
import { displayWidth, padEndDisplay, stripAnsi } from '../../src/ui/display-width.js';

describe('displayWidth', () => {
  it('counts ASCII as one column', () => {
    expect(displayWidth('add-auth')).toBe(8);
  });

  it('counts CJK as two columns', () => {
    expect(displayWidth('添加用户认证')).toBe(12);
    expect(displayWidth('中')).toBe(2);
  });

  it('ignores ANSI color codes', () => {
    expect(displayWidth('\u001b[36m添加\u001b[0m')).toBe(4);
    expect(stripAnsi('\u001b[36m添加\u001b[0m')).toBe('添加');
  });

  it('pads by display columns so CJK aligns with ASCII', () => {
    expect(padEndDisplay('添加', 10)).toBe('添加      ');
    expect(displayWidth(padEndDisplay('添加', 10))).toBe(10);
    expect(displayWidth(padEndDisplay('add-auth', 10))).toBe(10);
  });
});
