import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, SHADOWS, TYPOGRAPHY } from '../constants/design';
import { isWeb } from '../constants/platform';
import BtnPrimary from './BtnPrimary';

const baseOverlayStyle: ViewStyle = {
  position: isWeb ? ('fixed' as any) : 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2000,
  backgroundColor: 'rgba(28,42,57,0.88)',
  justifyContent: 'center',
  alignItems: 'center',
};

interface VideoModalProps {
  visible: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  title,
  subtitle,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={baseOverlayStyle}
      activeOpacity={1}
      onPress={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: COLORS.surface,
          borderRadius: 20,
          ...SHADOWS.sh3,
          padding: 32,
          maxWidth: 660,
          width: '92%',
          position: 'relative',
        }}
        onPress={(e) => e.stopPropagation()}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: COLORS.bg,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: COLORS.warmGray }}>✕</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: TYPOGRAPHY.serif,
            fontSize: 26,
            fontWeight: '700',
            color: COLORS.deep,
            marginBottom: 6,
            paddingRight: 36,
          }}
        >
          {title}
        </Text>
        <Text
          style={{ fontSize: 13, color: COLORS.warmGray, marginBottom: 22 }}
        >
          {subtitle}
        </Text>

        <LinearGradient
          colors={[COLORS.deep, '#2a4060']}
          style={{
            height: 240,
            borderRadius: SPACING.r,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <View
            style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 14 }}>▶</Text>
          </View>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            Video disponible en YouTube
          </Text>
          <BtnPrimary
            label="Ver en YouTube"
            small
            onPress={() => {
              Alert.alert('YouTube', 'Abriendo YouTube...');
              onClose();
            }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VideoModal;
