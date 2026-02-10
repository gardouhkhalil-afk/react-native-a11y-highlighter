import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import type { RegisteredElement, A11yOverlayConfig } from '../types';

interface IssueDetailModalProps {
  visible: boolean;
  elements: Map<string, RegisteredElement>;
  config: A11yOverlayConfig;
  onClose: () => void;
}

export const IssueDetailModal = memo(function IssueDetailModal({
  visible,
  elements,
  config,
  onClose,
}: IssueDetailModalProps) {
  const issues: Array<{
    element: RegisteredElement;
    severity: 'error' | 'warning';
    message: string;
  }> = [];

  elements.forEach((el) => {
    el.checkResults.forEach((result) => {
      if (result.severity === 'error' || result.severity === 'warning') {
        issues.push({
          element: el,
          severity: result.severity,
          message: result.message,
        });
      }
    });
  });

  issues.sort((a, b) => {
    if (a.severity === 'error' && b.severity !== 'error') return -1;
    if (a.severity !== 'error' && b.severity === 'error') return 1;
    return 0;
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Accessibility Issues ({issues.length})
            </Text>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.body}>
            {issues.length === 0 ? (
              <Text style={styles.noIssues}>
                No accessibility issues found.
              </Text>
            ) : (
              issues.map((issue, index) => (
                <View
                  key={`${issue.element.id}-${index}`}
                  style={styles.issueRow}
                >
                  <View
                    style={[
                      styles.severityDot,
                      {
                        backgroundColor:
                          issue.severity === 'error'
                            ? config.colors.error
                            : config.colors.warning,
                      },
                    ]}
                  />
                  <View style={styles.issueContent}>
                    <Text style={styles.issueName}>
                      {issue.element.displayName ||
                        `Element #${issue.element.id}`}
                    </Text>
                    <Text style={styles.issueMessage}>{issue.message}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#38383A',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    color: '#0A84FF',
    fontSize: 16,
  },
  body: {
    padding: 16,
  },
  noIssues: {
    color: '#8E8E93',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
  issueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#38383A',
  },
  severityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    marginRight: 10,
  },
  issueContent: {
    flex: 1,
  },
  issueName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  issueMessage: {
    color: '#AEAEB2',
    fontSize: 12,
    lineHeight: 16,
  },
});
