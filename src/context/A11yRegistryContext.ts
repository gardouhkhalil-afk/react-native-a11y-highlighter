import { createContext } from 'react';
import type {
  RegisteredElement,
  ElementLayout,
  ElementA11yProps,
  A11yOverlayConfig,
} from '../types';

export interface A11yRegistryContextValue {
  register: (
    a11yProps: ElementA11yProps,
    isInteractive: boolean,
    displayName?: string
  ) => string;
  unregister: (id: string) => void;
  updateLayout: (id: string, layout: ElementLayout) => void;
  updateA11yProps: (id: string, a11yProps: ElementA11yProps) => void;
  elements: Map<string, RegisteredElement>;
  config: A11yOverlayConfig;
}

export const A11yRegistryContext = createContext<
  A11yRegistryContextValue | undefined
>(undefined);

A11yRegistryContext.displayName = 'A11yRegistryContext';
