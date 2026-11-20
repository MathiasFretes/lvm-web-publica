import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/design';
import { isDesktop } from '../constants/platform';

interface StatProps {
  value: string;
  label: string;
  style?: ViewStyle;
}

export const Stat: React.FC<StatProps> = ({ value, label, style }) => (
  <View style={[{ alignItems: 'center' }, style]}>
    <Text
      style={{
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 52 : 42,
        fontWeight: '700',
        color: COLORS.goldLt,
        lineHeight: isDesktop ? 58 : 48,
      }}
    >
      {value}
    </Text>
    <Text
      style={{
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '500',
        marginTop: 8,
      }}
    >
      {label}
    </Text>
  </View>
);
