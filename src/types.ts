export type A11ySeverity = 'error' | 'warning' | 'pass';

export interface A11yCheckResult {
  checkId: string;
  message: string;
  severity: A11ySeverity;
}

export interface ElementLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementA11yProps {
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
  accessibilityState?: Record<string, unknown>;
  accessibilityLabelledBy?: string | string[];
  accessible?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface RegisteredElement {
  id: string;
  layout: ElementLayout | null;
  a11yProps: ElementA11yProps;
  isInteractive: boolean;
  displayName?: string;
  checkResults: A11yCheckResult[];
}

export interface A11yOverlayConfig {
  enabled: boolean;
  minTouchTargetSize: number;
  showSummaryPanel: boolean;
  showPassingElements: boolean;
  remeasureInterval: number;
  borderWidth: number;
  colors: {
    error: string;
    warning: string;
    pass: string;
  };
}
