import React, { useCallback, useMemo, useRef, useState } from 'react';
import { A11yRegistryContext } from './A11yRegistryContext';
import type { A11yRegistryContextValue } from './A11yRegistryContext';
import type {
  RegisteredElement,
  ElementLayout,
  ElementA11yProps,
  A11yOverlayConfig,
  A11yCheckResult,
} from '../types';
import { DEFAULT_CHECKS } from '../checks';
import { DEFAULT_CONFIG } from '../utils/constants';

interface Props {
  children: React.ReactNode;
  config?: Partial<A11yOverlayConfig>;
}

let nextId = 0;
function generateId(): string {
  return `a11y-${++nextId}`;
}

function runChecks(
  element: RegisteredElement,
  config: A11yOverlayConfig
): A11yCheckResult[] {
  const results: A11yCheckResult[] = [];
  for (const check of DEFAULT_CHECKS) {
    const result = check(
      element.layout,
      element.a11yProps,
      element.isInteractive,
      config
    );
    if (result) {
      results.push(result);
    }
  }
  return results;
}

export function A11yRegistryProvider({ children, config: configOverrides }: Props) {
  const config = useMemo<A11yOverlayConfig>(
    () => ({
      ...DEFAULT_CONFIG,
      ...configOverrides,
      colors: {
        ...DEFAULT_CONFIG.colors,
        ...configOverrides?.colors,
      },
    }),
    [configOverrides]
  );

  const elementsRef = useRef<Map<string, RegisteredElement>>(new Map());
  const [revision, setRevision] = useState(0);

  const triggerUpdate = useCallback(() => {
    setRevision((r) => r + 1);
  }, []);

  const register = useCallback(
    (a11yProps: ElementA11yProps, isInteractive: boolean, displayName?: string): string => {
      const id = generateId();
      const element: RegisteredElement = {
        id,
        layout: null,
        a11yProps,
        isInteractive,
        displayName,
        checkResults: [],
      };
      elementsRef.current.set(id, element);
      return id;
    },
    []
  );

  const unregister = useCallback(
    (id: string) => {
      elementsRef.current.delete(id);
      triggerUpdate();
    },
    [triggerUpdate]
  );

  const updateLayout = useCallback(
    (id: string, layout: ElementLayout) => {
      const element = elementsRef.current.get(id);
      if (!element) return;

      element.layout = layout;
      element.checkResults = runChecks(element, config);
      elementsRef.current.set(id, element);
      triggerUpdate();
    },
    [config, triggerUpdate]
  );

  const updateA11yProps = useCallback(
    (id: string, a11yProps: ElementA11yProps) => {
      const element = elementsRef.current.get(id);
      if (!element) return;

      element.a11yProps = a11yProps;
      element.checkResults = runChecks(element, config);
      elementsRef.current.set(id, element);
      triggerUpdate();
    },
    [config, triggerUpdate]
  );

  const elements = useMemo(() => {
    void revision;
    return new Map(elementsRef.current);
  }, [revision]);

  const contextValue = useMemo<A11yRegistryContextValue>(
    () => ({
      register,
      unregister,
      updateLayout,
      updateA11yProps,
      elements,
      config,
    }),
    [register, unregister, updateLayout, updateA11yProps, elements, config]
  );

  return (
    <A11yRegistryContext.Provider value={contextValue}>
      {children}
    </A11yRegistryContext.Provider>
  );
}
