/**
 * Card Component
 * Extracted from App.tsx (lines 262-282)
 */

import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/design';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, onPress, style, padding = true }) => {
  const Component = onPress ? TouchableOpacity : View;
  return (
    <Component
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        {
          backgroundColor: COLORS.surface,
          borderRadius: SPACING.r,
          ...SHADOWS.sh2,
          overflow: 'hidden',
          ...(padding ? { padding: 20 } : {}),
        },
        style,
      ]}
    >
      {children}
    </Component>
  );
};

export default Card;