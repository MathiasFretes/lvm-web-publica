import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRadios } from '../useFirestore';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { DarkHeader } from '../components/DarkHeader';
import Toast from '../components/Toast';

interface EnVivoScreenProps {
  onBack: () => void;
}

export const EnVivoScreen: React.FC<EnVivoScreenProps> = ({ onBack }) => {
  const { radios, loading: radiosLoading } = useRadios();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="TRANSMISIÓN EN VIVO"
        title="En"
        accent="Vivo"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <TouchableOpacity
          onPress={() => showToast('Abriendo YouTube...')}
          style={{
            height: 400,
            borderRadius: SPACING.r,
            backgroundColor: COLORS.deep,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 32,
            overflow: 'hidden',
            ...SHADOWS.sh3,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 20, marginLeft: 4 }}>
              ▶
            </Text>
          </View>
          <Text
            style={{
              fontFamily: TYPOGRAPHY.serif,
              fontSize: 30,
              fontWeight: '700',
              color: COLORS.white,
              marginBottom: 6,
            }}
          >
            Servicio Dominical
          </Text>
          <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
            Domingos 09:00, 11:00 y 18:00 hs · YouTube + Facebook
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 28,
          }}
        >
          <TouchableOpacity
            onPress={() => showToast('YouTube')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              minWidth: 170,
              backgroundColor: COLORS.surface,
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: SPACING.r,
              padding: 14,
              ...SHADOWS.sh1,
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                backgroundColor: '#ff0000',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: COLORS.white, fontSize: 16, fontWeight: '700' }}
              >
                YT
              </Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 14, fontWeight: '700', color: COLORS.deep }}
              >
                YouTube
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                @lavozmisionera
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showToast('Facebook')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              minWidth: 170,
              backgroundColor: COLORS.surface,
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: SPACING.r,
              padding: 14,
              ...SHADOWS.sh1,
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                backgroundColor: '#1877f2',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: COLORS.white, fontSize: 16, fontWeight: '700' }}
              >
                FB
              </Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 14, fontWeight: '700', color: COLORS.deep }}
              >
                Facebook
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                /lavozmisionera
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </ScrollView>
  );
};

export default EnVivoScreen;
