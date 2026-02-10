import { useContext } from 'react';
import { A11yRegistryContext } from '../context/A11yRegistryContext';
import type { A11yOverlayConfig } from '../types';
import { DEFAULT_CONFIG } from '../utils/constants';

export function useA11yConfig(): A11yOverlayConfig {
  const context = useContext(A11yRegistryContext);
  return context?.config ?? DEFAULT_CONFIG;
}
