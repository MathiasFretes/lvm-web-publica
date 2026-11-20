/**
 * BtnChurch Component
 * Extracted from App.tsx (lines 399-425)
 */

import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../constants/design';

interface BtnChurchProps {
  label: string;
  onPress: () => void;
  small?: boolean;
  full?: boolean;
  style?: ViewStyle;
}

const BtnChurch: React.FC<BtnChurchProps> = ({ label, onPress, small = false, full = false, style }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        borderWidth: 2,
        borderColor: COLORS.church,
        paddingVertical: small ? 8 : 13,
        paddingHorizontal: small ? 16 : 24,
        borderRadius: SPACING.rSm,
        ...(full ? { width: '100%' } : {}),
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.church,
        fontSize: small ? 12 : 14,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default BtnChurch;