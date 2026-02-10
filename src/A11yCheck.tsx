import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { View } from 'react-native';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { A11yRegistryContext } from './context/A11yRegistryContext';
import { measureElement } from './utils/measureElement';
import { isInteractiveElement } from './utils/isInteractiveElement';
import type { ElementA11yProps } from './types';

interface A11yCheckProps {
  children: React.ReactElement;
  interactive?: boolean;
  name?: string;
}

export function A11yCheck({ children, interactive, name }: A11yCheckProps) {
  const context = useContext(A11yRegistryContext);
  const viewRef = useRef<View>(null);
  const idRef = useRef<string | null>(null);

  const childProps = children.props as ViewProps & ElementA11yProps;
  const a11yProps: ElementA11yProps = {
    accessibilityLabel: childProps.accessibilityLabel,
    accessibilityRole: childProps.accessibilityRole as string | undefined,
    accessibilityHint: childProps.accessibilityHint,
    accessibilityState: childProps.accessibilityState as Record<string, unknown> | undefined,
    accessibilityLabelledBy: childProps.accessibilityLabelledBy,
    accessible: childProps.accessible,
    'aria-label': childProps['aria-label'],
    'aria-labelledby': childProps['aria-labelledby'],
  };

  const isInteractive = isInteractiveElement(a11yProps, interactive);

  useEffect(() => {
    if (!context) return;

    const id = context.register(a11yProps, isInteractive, name);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    a11yProps.accessibilityLabel,
    a11yProps.accessibilityRole,
    a11yProps.accessibilityHint,
    a11yProps.accessible,
    a11yProps['aria-label'],
  ]);

  const handleLayout = useCallback(
    async (_event: LayoutChangeEvent) => {
      if (!context || !idRef.current || !viewRef.current) return;

      const layout = await measureElement(viewRef);
      if (layout && idRef.current) {
        context.updateLayout(idRef.current, layout);
      }
    },
    [context]
  );

  if (!context) {
    return children;
  }

  return (
    <View
      ref={viewRef}
      onLayout={handleLayout}
      collapsable={false}
      style={{ alignSelf: 'stretch' }}
      importantForAccessibility="no"
      accessibilityElementsHidden={true}
      pointerEvents="box-none"
    >
      {children}
    </View>
  );
}
