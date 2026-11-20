import React, { useEffect } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/design';
import { isWeb } from '../constants/platform';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2800);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={[
        {
          position: isWeb ? 'fixed' : 'absolute',
          bottom: 90,
          right: 22,
          zIndex: 3000,
          backgroundColor: COLORS.deep,
          borderRadius: SPACING.r,
          padding: 13,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          maxWidth: 290,
          borderLeftWidth: 3,
          borderLeftColor: COLORS.gold,
        },
        SHADOWS.sh3,
      ] as ViewStyle[]}
    >
      <Text style={{ color: COLORS.gold, fontSize: 16 }}>✓</Text>
      <Text style={{ color: COLORS.white, fontSize: 13 }}>{message}</Text>
    </View>
  );
};

export default Toast;
