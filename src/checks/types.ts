import type { A11yCheckResult, ElementLayout, ElementA11yProps, A11yOverlayConfig } from '../types';

export type A11yCheckFn = (
  layout: ElementLayout | null,
  a11yProps: ElementA11yProps,
  isInteractive: boolean,
  config: A11yOverlayConfig
) => A11yCheckResult | null;
