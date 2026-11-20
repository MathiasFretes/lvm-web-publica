import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';

interface NotFoundScreenProps {
  onBack: () => void;
}

export default function NotFoundScreen({ onBack }: NotFoundScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.title}>Página No Encontrada</Text>
        <Text style={styles.description}>
          La página que buscas no existe o ha sido movida.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  errorCode: {
    fontSize: 120,
    fontWeight: '900',
    color: COLORS.gold,
    lineHeight: 130,
    ...SHADOWS.sh1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.deep,
    marginTop: SPACING.md,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.serif,
  },
  description: {
    fontSize: 16,
    color: COLORS.warmGray,
    marginTop: SPACING.sm,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    ...SHADOWS.sh2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});