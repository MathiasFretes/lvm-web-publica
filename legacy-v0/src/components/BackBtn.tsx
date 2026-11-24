import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';

interface BackBtnProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const BackBtn: React.FC<BackBtnProps> = ({ onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'flex-start',
        paddingVertical: 9,
        paddingHorizontal: 14,
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.rSm,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.sh1,
      },
      style,
    ]}
  >
    <Text style={{ color: COLORS.deep, fontSize: 13, fontWeight: '600' }}>
      ← Volver
    </Text>
  </TouchableOpacity>
);
