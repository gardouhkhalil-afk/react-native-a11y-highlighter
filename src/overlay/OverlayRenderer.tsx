import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { A11yRegistryContext } from '../context/A11yRegistryContext';
import { HighlightBox } from './HighlightBox';
import { SummaryPanel } from './SummaryPanel';
import { IssueDetailModal } from './IssueDetailModal';
import type { A11ySeverity } from '../types';

export function OverlayRenderer() {
  const context = useContext(A11yRegistryContext);
  const [modalVisible, setModalVisible] = useState(false);

  if (!context) return null;

  const { elements, config } = context;

  const highlights: Array<{
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    severity: A11ySeverity;
  }> = [];

  elements.forEach((el) => {
    if (!el.layout) return;

    let worstSeverity: A11ySeverity = 'pass';
    for (const result of el.checkResults) {
      if (result.severity === 'error') {
        worstSeverity = 'error';
        break;
      }
      if (result.severity === 'warning') {
        worstSeverity = 'warning';
      }
    }

    if (worstSeverity === 'pass' && !config.showPassingElements) return;

    highlights.push({
      id: el.id,
      ...el.layout,
      severity: worstSeverity,
    });
  });

  return (
    <>
      <View style={styles.overlayContainer} pointerEvents="box-none">
        {highlights.map((h) => (
          <HighlightBox
            key={h.id}
            layout={{ x: h.x, y: h.y, width: h.width, height: h.height }}
            severity={h.severity}
            config={config}
          />
        ))}
      </View>
      {config.showSummaryPanel && (
        <SummaryPanel
          elements={elements}
          config={config}
          onPressDetails={() => setModalVisible(true)}
        />
      )}
      <IssueDetailModal
        visible={modalVisible}
        elements={elements}
        config={config}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999999,
    elevation: 999999,
  },
});
