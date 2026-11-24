import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { COLORS } from '../constants/design';
import { useNativeDriver } from '../constants/platform';

interface LiveDotProps {
  size?: number;
}

const LiveDot: React.FC<LiveDotProps> = ({ size = 6 }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 600,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: COLORS.live,
        opacity,
      }}
    />
  );
};

export default LiveDot;
