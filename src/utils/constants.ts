import type { A11yOverlayConfig } from '../types';

export const MIN_TOUCH_TARGET_SIZE = 44;

export const DEFAULT_CONFIG: A11yOverlayConfig = {
  enabled: true,
  minTouchTargetSize: MIN_TOUCH_TARGET_SIZE,
  showSummaryPanel: true,
  showPassingElements: false,
  remeasureInterval: 1000,
  borderWidth: 2,
  colors: {
    error: '#FF3B30',
    warning: '#FF9500',
    pass: '#34C759',
  },
};

export const INTERACTIVE_ROLES: string[] = [
  'button',
  'link',
  'checkbox',
  'radio',
  'switch',
  'togglebutton',
  'spinbutton',
  'slider',
  'adjustable',
  'imagebutton',
  'searchbox',
  'combobox',
  'menuitem',
  'tab',
];
