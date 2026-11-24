import React from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/design';
import { isDesktop } from '../constants/platform';

interface SecTitleProps {
  children: React.ReactNode;
  accent?: string;
  style?: TextStyle;
}

const SecTitle: React.FC<SecTitleProps> = ({ children, accent, style }) => (
  <Text
    style={[
      {
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 40 : 32,
        fontWeight: '700',
        color: COLORS.deep,
        lineHeight: isDesktop ? 44 : 36,
        marginBottom: 16,
      },
      style,
    ]}
  >
    {children}
    {accent ? <Text style={{ color: COLORS.church }}> {accent}</Text> : null}
  </Text>
);

export default SecTitle;
