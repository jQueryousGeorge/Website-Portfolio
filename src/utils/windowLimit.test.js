import { canOpenWindow, MAX_WINDOWS } from './windowLimit';

describe('windowLimit', () => {
  test('allows opening when below limit', () => {
    const openWindows = { a: {}, b: {} };
    expect(canOpenWindow(openWindows, 'c', 3)).toBe(true);
  });

  test('blocks opening when at limit', () => {
    const openWindows = { a: {}, b: {}, c: {} };
    expect(canOpenWindow(openWindows, 'd', 3)).toBe(false);
  });

  test('allows focusing existing window even at limit', () => {
    const openWindows = { a: {}, b: {}, c: {} };
    expect(canOpenWindow(openWindows, 'b', 3)).toBe(true);
  });

  test('uses default MAX_WINDOWS when not provided', () => {
    const open = {};
    for (let i = 0; i < MAX_WINDOWS - 1; i++) {
      open['w' + i] = {};
    }
    expect(canOpenWindow(open, 'last')).toBe(true);
  });
});


