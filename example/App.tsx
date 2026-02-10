import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { A11yDevOverlay, A11yCheck } from 'react-native-a11y-highlighter';

function MyApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>A11y Highlighter Demo</Text>

      {/* GREEN: Fully accessible button */}
      <A11yCheck interactive name="Good Button">
        <TouchableOpacity
          style={styles.goodButton}
          accessibilityLabel="Submit form"
          accessibilityRole="button"
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Submit (Accessible)</Text>
        </TouchableOpacity>
      </A11yCheck>

      {/* RED: Touch target too small (30x30) */}
      <A11yCheck interactive name="Small Button">
        <Pressable
          style={styles.smallButton}
          accessibilityLabel="Close"
          accessibilityRole="button"
          onPress={() => {}}
        >
          <Text style={styles.smallButtonText}>X</Text>
        </Pressable>
      </A11yCheck>

      {/* ORANGE: Missing accessibilityLabel */}
      <A11yCheck interactive name="Unlabeled Button">
        <TouchableOpacity
          style={styles.goodButton}
          accessibilityRole="button"
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>No Label</Text>
        </TouchableOpacity>
      </A11yCheck>

      {/* ORANGE: Missing accessibilityRole */}
      <A11yCheck interactive name="No Role Button">
        <Pressable
          style={styles.goodButton}
          accessibilityLabel="Do something"
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>No Role</Text>
        </Pressable>
      </A11yCheck>

      {/* RED + ORANGE: Small AND missing label + role */}
      <A11yCheck interactive name="Worst Case">
        <TouchableOpacity style={styles.tinyButton} onPress={() => {}}>
          <Text style={styles.smallButtonText}>!</Text>
        </TouchableOpacity>
      </A11yCheck>
    </View>
  );
}

export default function App() {
  return (
    <A11yDevOverlay config={{ showPassingElements: true }}>
      <MyApp />
    </A11yDevOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    gap: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  goodButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  smallButton: {
    backgroundColor: '#FF3B30',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyButton: {
    backgroundColor: '#FF9500',
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  smallButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
