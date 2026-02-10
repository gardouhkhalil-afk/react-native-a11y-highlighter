import type { A11yCheckFn } from './types';
import { checkTouchTargetSize } from './checkTouchTargetSize';
import { checkAccessibilityLabel } from './checkAccessibilityLabel';
import { checkAccessibilityRole } from './checkAccessibilityRole';

export type { A11yCheckFn } from './types';
export { checkTouchTargetSize } from './checkTouchTargetSize';
export { checkAccessibilityLabel } from './checkAccessibilityLabel';
export { checkAccessibilityRole } from './checkAccessibilityRole';

export const DEFAULT_CHECKS: A11yCheckFn[] = [
  checkTouchTargetSize,
  checkAccessibilityLabel,
  checkAccessibilityRole,
];
