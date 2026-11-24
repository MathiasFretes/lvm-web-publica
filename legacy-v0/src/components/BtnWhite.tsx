/**
 * BtnWhite Component
 * Extracted from App.tsx (lines 427-453)
 */

import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../constants/design';

interface BtnWhiteProps {
  label: string;
  onPress: () => void;
  small?: boolean;
  style?: ViewStyle;
}

const BtnWhite: React.FC<BtnWhiteProps> = ({ label, onPress, small = false, style }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.6)',
        paddingVertical: small ? 8 : 14,
        paddingHorizontal: small ? 16 : 26,
        borderRadius: SPACING.rSm,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.white,
        fontSize: small ? 12 : 14,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default BtnWhite;