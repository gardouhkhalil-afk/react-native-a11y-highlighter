import type { A11yCheckFn } from './types';

export const checkAccessibilityLabel: A11yCheckFn = (
  _layout,
  a11yProps,
  isInteractive,
  _config
) => {
  if (!isInteractive) return null;

  const hasLabel = Boolean(
    a11yProps.accessibilityLabel ||
    a11yProps['aria-label'] ||
    a11yProps.accessibilityLabelledBy ||
    a11yProps['aria-labelledby']
  );

  if (!hasLabel) {
    return {
      checkId: 'accessibility-label',
      severity: 'warning',
      message: 'Missing accessibilityLabel on interactive element.',
    };
  }

  return {
    checkId: 'accessibility-label',
    severity: 'pass',
    message: 'accessibilityLabel is set.',
  };
};
