/**
 * Platform Constants
 * Platform detection and device dimensions
 */

import { Dimensions, Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const useNativeDriver = !isWeb;

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export { WIDTH, HEIGHT };

export const isDesktop = WIDTH >= 1024;
export const isMobile = WIDTH <= 768;
