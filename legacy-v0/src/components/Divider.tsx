import React from 'react';
import { View, ViewStyle } from 'react-native';
import { COLORS } from '../constants/design';

interface DividerProps {
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({ style }) => (
  <View
    style={[
      {
        width: 40,
        height: 3,
        backgroundColor: COLORS.gold,
        borderRadius: 2,
        marginVertical: 16,
      },
      style,
    ]}
  />
);

export default Divider;
