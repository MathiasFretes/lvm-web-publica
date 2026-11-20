import React from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS } from '../constants/design';

interface SecSubProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const SecSub: React.FC<SecSubProps> = ({ children, style }) => (
  <Text
    style={[
      {
        fontSize: 16,
        color: COLORS.warmGray,
        lineHeight: 27,
        maxWidth: 500,
      },
      style,
    ]}
  >
    {children}
  </Text>
);

export default SecSub;
