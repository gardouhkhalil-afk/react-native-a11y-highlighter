import type { A11yCheckFn } from './types';

export const checkTouchTargetSize: A11yCheckFn = (
  layout,
  _a11yProps,
  isInteractive,
  config
) => {
  if (!isInteractive) return null;
  if (!layout) return null;

  const { minTouchTargetSize } = config;
  const { width, height } = layout;

  if (width < minTouchTargetSize || height < minTouchTargetSize) {
    const details: string[] = [];
    if (width < minTouchTargetSize) {
      details.push(`width ${Math.round(width)}dp < ${minTouchTargetSize}dp`);
    }
    if (height < minTouchTargetSize) {
      details.push(`height ${Math.round(height)}dp < ${minTouchTargetSize}dp`);
    }

    return {
      checkId: 'touch-target-size',
      severity: 'error',
      message: `Touch target too small: ${details.join(', ')}. Minimum is ${minTouchTargetSize}x${minTouchTargetSize}dp.`,
    };
  }

  return {
    checkId: 'touch-target-size',
    severity: 'pass',
    message: `Touch target size OK (${Math.round(width)}x${Math.round(height)}dp).`,
  };
};
