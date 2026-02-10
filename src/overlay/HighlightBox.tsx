import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { A11ySeverity, ElementLayout, A11yOverlayConfig } from '../types';

interface HighlightBoxProps {
  layout: ElementLayout;
  severity: A11ySeverity;
  config: A11yOverlayConfig;
}

export const HighlightBox = memo(function HighlightBox({
  layout,
  severity,
  config,
}: HighlightBoxProps) {
  const color = config.colors[severity];

  return (
    <View
      pointerEvents="none"
      style={[
        styles.box,
        {
          left: layout.x,
          top: layout.y,
          width: layout.width,
          height: layout.height,
          borderColor: color,
          borderWidth: config.borderWidth,
        },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
});
