import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNativeDriver } from '../constants/platform';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
};

export default FadeIn;
