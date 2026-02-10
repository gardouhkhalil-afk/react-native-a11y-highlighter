import React from 'react';
import { View, StyleSheet } from 'react-native';
import { A11yRegistryProvider } from './context/A11yRegistryProvider';
import { OverlayRenderer } from './overlay/OverlayRenderer';
import type { A11yOverlayConfig } from './types';

interface A11yDevOverlayProps {
  children: React.ReactNode;
  config?: Partial<A11yOverlayConfig>;
  enabled?: boolean;
}

declare const __DEV__: boolean;

export function A11yDevOverlay({
  children,
  config,
  enabled,
}: A11yDevOverlayProps) {
  const isEnabled = enabled ?? (typeof __DEV__ !== 'undefined' && __DEV__);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <A11yRegistryProvider config={config}>
      <View style={styles.container}>
        {children}
        <OverlayRenderer />
      </View>
    </A11yRegistryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
