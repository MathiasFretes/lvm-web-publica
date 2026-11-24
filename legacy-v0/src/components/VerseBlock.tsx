import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/design';
import { isDesktop } from '../constants/platform';

interface VerseBlockProps {
  verse: string;
  reference: string;
  style?: ViewStyle;
}

export const VerseBlock: React.FC<VerseBlockProps> = ({ verse, reference, style }) => (
  <View style={[{ marginVertical: 24 }, style]}>
    <Text
      style={{
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 24 : 20,
        fontStyle: 'italic',
        color: COLORS.deep,
        lineHeight: isDesktop ? 38 : 32,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.gold,
        paddingLeft: 24,
      }}
    >
      {verse}
    </Text>
    <Text
      style={{
        fontSize: 13,
        color: COLORS.gold,
        letterSpacing: 1,
        fontWeight: '700',
        marginTop: 8,
        paddingLeft: 24,
      }}
    >
      {reference}
    </Text>
  </View>
);
