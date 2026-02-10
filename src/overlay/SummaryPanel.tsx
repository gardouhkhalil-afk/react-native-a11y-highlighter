import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { RegisteredElement, A11yOverlayConfig } from '../types';

interface SummaryPanelProps {
  elements: Map<string, RegisteredElement>;
  config: A11yOverlayConfig;
  onPressDetails: () => void;
}

function getWorstSeverity(
  el: RegisteredElement
): 'error' | 'warning' | 'pass' | null {
  if (!el.checkResults.length) return null;
  if (el.checkResults.some((r) => r.severity === 'error')) return 'error';
  if (el.checkResults.some((r) => r.severity === 'warning')) return 'warning';
  return 'pass';
}

export const SummaryPanel = memo(function SummaryPanel({
  elements,
  config,
  onPressDetails,
}: SummaryPanelProps) {
  let errorCount = 0;
  let warningCount = 0;

  elements.forEach((el) => {
    const worst = getWorstSeverity(el);
    if (worst === 'error') errorCount++;
    else if (worst === 'warning') warningCount++;
  });

  const totalIssues = errorCount + warningCount;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.panel}
        onPress={onPressDetails}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Accessibility overlay: ${totalIssues} issues found`}
      >
        <Text style={styles.title}>A11y</Text>
        {errorCount > 0 && (
          <View style={[styles.badge, { backgroundColor: config.colors.error }]}>
            <Text style={styles.badgeText}>{errorCount}</Text>
          </View>
        )}
        {warningCount > 0 && (
          <View style={[styles.badge, { backgroundColor: config.colors.warning }]}>
            <Text style={styles.badgeText}>{warningCount}</Text>
          </View>
        )}
        {totalIssues === 0 && (
          <View style={[styles.badge, { backgroundColor: config.colors.pass }]}>
            <Text style={styles.badgeText}>OK</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 9999999,
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
