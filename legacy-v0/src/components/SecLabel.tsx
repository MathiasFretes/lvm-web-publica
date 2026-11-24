import React from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/design';

interface SecLabelProps {
  children: React.ReactNode;
  light?: boolean;
  style?: TextStyle;
}

const SecLabel: React.FC<SecLabelProps> = ({ children, light = false, style }) => (
  <Text
    style={[
      {
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: light ? COLORS.goldLt : COLORS.gold,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily: TYPOGRAPHY.sans,
      },
      style,
    ]}
  >
    {children}
  </Text>
);

export default SecLabel;
