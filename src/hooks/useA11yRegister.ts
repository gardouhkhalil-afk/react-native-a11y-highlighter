import { useContext, useEffect, useRef, useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { A11yRegistryContext } from '../context/A11yRegistryContext';
import { measureElement } from '../utils/measureElement';
import type { ElementA11yProps } from '../types';

interface UseA11yRegisterOptions {
  a11yProps: ElementA11yProps;
  isInteractive: boolean;
  displayName?: string;
}

export function useA11yRegister({
  a11yProps,
  isInteractive,
  displayName,
}: UseA11yRegisterOptions) {
  const context = useContext(A11yRegistryContext);
  const ref = useRef<any>(null);
  const idRef = useRef<string | null>(null);

  useEffect(() => {
    if (!context) return;

    const id = context.register(a11yProps, isInteractive, displayName);
    idRef.current = id;

    return () => {
      context.unregister(id);
      idRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    if (!context || !idRef.current) return;
    context.updateA11yProps(idRef.current, a11yProps);
  }, [context, a11yProps]);

  const onLayout = useCallback(
    async (_event: LayoutChangeEvent) => {
      if (!context || !idRef.current) return;
      const layout = await measureElement(ref);
      if (layout && idRef.current) {
        context.updateLayout(idRef.current, layout);
      }
    },
    [context]
  );

  return {
    ref,
    onLayout,
    isActive: context !== undefined,
  };
}
