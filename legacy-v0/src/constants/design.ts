/**
 * Design Tokens
 * Exact colors, typography, spacing, and shadows from the original CSS design
 */

import { isWeb } from './platform';

export const COLORS = {
  deep: '#1c2a39',
  navyTop: '#304965',
  navyDeep: '#0d1624',
  pearl: '#f5f3fa',
  church: '#3e6ba5',
  gold: '#c6a15b',
  goldLt: '#e2c58a',
  goldDk: '#b48f4a',
  bg: '#f6f7f9',
  surface: '#ffffff',
  softBlue: '#6b8dba',
  warmGray: '#8b9096',
  border: '#e4e7ec',
  success: '#2e8b57',
  warning: '#f0a500',
  error: '#d64545',
  live: '#e74c3c',
  text: '#2d3748',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export const TYPOGRAPHY = {
  serif: isWeb ? "'Poppins', sans-serif" : 'Poppins',
  sans: isWeb ? "'Poppins', sans-serif" : 'Poppins',
};

export const SPACING = {
  navH: 72,
  max: 1200,
  r: 14,
  rSm: 8,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  sh1: {
    shadowColor: COLORS.deep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 2,
  },
  sh2: {
    shadowColor: COLORS.deep,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
  },
  sh3: {
    shadowColor: COLORS.deep,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 50,
    elevation: 8,
  },
};
