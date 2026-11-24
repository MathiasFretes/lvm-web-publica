import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { BackBtn } from './BackBtn';
import SecLabel from './SecLabel';
import Divider from './Divider';

interface DarkHeaderProps {
  label?: string;
  title: string;
  accent: string;
  sub?: string;
  onBack: () => void;
  style?: ViewStyle;
}

export const DarkHeader: React.FC<DarkHeaderProps> = ({
  label,
  title,
  accent,
  sub,
  onBack,
  style,
}) => (
  <LinearGradient
    colors={[COLORS.deep, '#243b55']}
    style={[
      {
        paddingTop: isDesktop ? 110 : 80,
        paddingBottom: 44,
        paddingHorizontal: 24,
      },
      style,
    ]}
  >
    <BackBtn onPress={onBack} />
    {label && <SecLabel light>{label}</SecLabel>}
    <Text
      style={{
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 42 : 34,
        fontWeight: '700',
        color: COLORS.white,
        lineHeight: isDesktop ? 48 : 40,
      }}
    >
      {title}{' '}
      <Text style={{ color: COLORS.goldLt, fontStyle: 'italic' }}>
        {accent}
      </Text>
    </Text>
    {sub && (
      <Text
        style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.65)',
          marginTop: 10,
          lineHeight: 24,
        }}
      >
        {sub}
      </Text>
    )}
    <Divider style={{ marginTop: 16 }} />
  </LinearGradient>
);
