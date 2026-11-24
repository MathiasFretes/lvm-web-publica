/**
 * Tag Component
 * Extracted from App.tsx (lines 284-326)
 */

import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../constants/design';

type TagVariant = 'gold' | 'open' | 'full' | 'series';

interface TagProps {
  text: string;
  variant?: TagVariant;
}

const Tag: React.FC<TagProps> = ({ text, variant = 'gold' }) => {
  const variants: Record<TagVariant, { bg: string; color: string; border: string }> = {
    gold: {
      bg: 'rgba(198,161,91,0.1)',
      color: COLORS.gold,
      border: 'rgba(198,161,91,0.25)',
    },
    open: { bg: '#e6f4ea', color: COLORS.success, border: '#c8e6c9' },
    full: { bg: '#fff4e5', color: COLORS.warning, border: '#ffe0b2' },
    series: { bg: '#eef3ff', color: COLORS.church, border: '#dde8ff' },
  };
  const cfg = variants[variant];
  return (
    <View
      style={{
        backgroundColor: cfg.bg,
        borderWidth: 1,
        borderColor: cfg.border,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: '600',
          color: cfg.color,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Tag;