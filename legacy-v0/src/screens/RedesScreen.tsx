import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { useRedes, useContacto } from '../useFirestore';
import { DarkHeader } from '../components/DarkHeader';
import Card from '../components/Card';
import SecLabel from '../components/SecLabel';
import Toast from '../components/Toast';

interface RedesScreenProps {
  onBack: () => void;
}

export const RedesScreen: React.FC<RedesScreenProps> = ({ onBack }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { redes, loading } = useRedes();
  const { contacto, loading: contactoLoading } = useContacto();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  if (loading) {
    return (
      <ScrollView style={{ backgroundColor: COLORS.bg }}>
        <DarkHeader label="CONÉCTATE" title="Redes y" accent="Contacto" onBack={onBack} />
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.gold} />
        </View>
      </ScrollView>
    );
  }

  const displayRedes = redes.length > 0 ? redes : [];

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="CONÉCTATE"
        title="Redes y"
        accent="Contacto"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {displayRedes.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => showToast(item.name)}
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
                  backgroundColor: item.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: '700',
                  }}
                >
                  {item.name.charAt(0)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: COLORS.deep,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                  {item.handle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 48 }}>
          <SecLabel>INFORMACIÓN DE CONTACTO</SecLabel>
          <View
            style={{
              flexDirection: isDesktop ? 'row' : 'column',
              gap: 16,
              marginTop: 16,
            }}
          >
            {contacto.map((item, index) => (
              <Card key={index} style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    color: COLORS.gold,
                    fontWeight: '700',
                    marginBottom: 7,
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.warmGray }}>
                  {item.value}
                </Text>
              </Card>
            ))}
          </View>
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
