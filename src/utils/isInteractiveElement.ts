import type { ElementA11yProps } from '../types';
import { INTERACTIVE_ROLES } from './constants';

export function isInteractiveElement(
  a11yProps: ElementA11yProps,
  explicitlyInteractive?: boolean
): boolean {
  if (explicitlyInteractive !== undefined) {
    return explicitlyInteractive;
  }

  const role = a11yProps.accessibilityRole;
  if (role && INTERACTIVE_ROLES.includes(role)) {
    return true;
  }

  return false;
}
