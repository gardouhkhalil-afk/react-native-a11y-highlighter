import type { A11yCheckFn } from './types';

export const checkAccessibilityRole: A11yCheckFn = (
  _layout,
  a11yProps,
  isInteractive,
  _config
) => {
  if (!isInteractive) return null;

  if (!a11yProps.accessibilityRole) {
    return {
      checkId: 'accessibility-role',
      severity: 'warning',
      message: 'Missing accessibilityRole on interactive element.',
    };
  }

  return {
    checkId: 'accessibility-role',
    severity: 'pass',
    message: `accessibilityRole is "${a11yProps.accessibilityRole}".`,
  };
};
