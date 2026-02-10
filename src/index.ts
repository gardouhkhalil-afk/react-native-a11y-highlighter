export { A11yDevOverlay } from './A11yDevOverlay';
export { A11yCheck } from './A11yCheck';

export { useA11yRegister } from './hooks/useA11yRegister';
export { useA11yConfig } from './hooks/useA11yConfig';

export type {
  A11ySeverity,
  A11yCheckResult,
  A11yOverlayConfig,
  ElementLayout,
  ElementA11yProps,
  RegisteredElement,
} from './types';

export { checkTouchTargetSize } from './checks/checkTouchTargetSize';
export { checkAccessibilityLabel } from './checks/checkAccessibilityLabel';
export { checkAccessibilityRole } from './checks/checkAccessibilityRole';
export type { A11yCheckFn } from './checks/types';
