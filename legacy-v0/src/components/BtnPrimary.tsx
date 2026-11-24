/**
 * BtnPrimary Component
 * Extracted from App.tsx (lines 328-362)
 */

import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/design';

interface BtnPrimaryProps {
  label: string;
  onPress: () => void;
  full?: boolean;
  small?: boolean;
  style?: ViewStyle;
}

const BtnPrimary: React.FC<BtnPrimaryProps> = ({
  label,
  onPress,
  full = false,
  small = false,
  style,
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        backgroundColor: COLORS.gold,
        paddingVertical: small ? 9 : 14,
        paddingHorizontal: small ? 18 : 26,
        borderRadius: SPACING.rSm,
        ...(full ? { width: '100%' } : {}),
        ...SHADOWS.sh1,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.white,
        fontSize: small ? 13 : 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default BtnPrimary;
