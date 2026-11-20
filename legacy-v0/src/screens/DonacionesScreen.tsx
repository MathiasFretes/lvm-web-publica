import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { DarkHeader } from '../components/DarkHeader';
import Card from '../components/Card';
import SecLabel from '../components/SecLabel';
import SecSub from '../components/SecSub';
import BtnPrimary from '../components/BtnPrimary';
import Toast from '../components/Toast';

interface DonacionesScreenProps {
  onBack: () => void;
}

export const DonacionesScreen: React.FC<DonacionesScreenProps> = ({ onBack }) => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="GENEROSIDAD"
        title="Dar con"
        accent="Propósito"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 60 }}>
          <View style={{ flex: 1 }}>
            <SecSub style={{ marginBottom: 28 }}>
              Tu ofrenda es un acto de adoración. Cada aporte hace posible que
              continuemos predicando el Gospel y bendiciendo familias en
              Paraguay.
            </SecSub>

            <SecLabel>MONTO RÁPIDO</SecLabel>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 16,
              }}
            >
              {[
                'Gs 50.000',
                'Gs 100.000',
                'Gs 200.000',
                'Gs 500.000',
                'Otro',
              ].map((amt, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAmount(index)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderWidth: 1.5,
                    borderColor:
                      selectedAmount === index ? COLORS.gold : COLORS.border,
                    borderRadius: SPACING.rSm,
                    backgroundColor:
                      selectedAmount === index ? COLORS.gold : COLORS.surface,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: selectedAmount === index ? '700' : '500',
                      color:
                        selectedAmount === index
                          ? COLORS.white
                          : COLORS.warmGray,
                    }}
                  >
                    {amt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: COLORS.deep,
                  marginBottom: 7,
                }}
              >
                Propósito del aporte
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.bg,
                  borderWidth: 1.5,
                  borderColor: COLORS.border,
                  borderRadius: SPACING.rSm,
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 14, color: COLORS.warmGray }}>
                  Diezmo general
                </Text>
              </View>
            </View>

            <BtnPrimary
              label="DONAR AHORA"
              full
              onPress={() => showToast('Los medios de donación estarán disponibles cuando la iglesia publique sus datos verificados.')}
            />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 12,
              }}
            >
              {[
                'Tarjeta',
                'Transferencia',
                'Tigo Money',
                'Personal Pay',
                'QR',
              ].map((met, index) => (
                <View
                  key={index}
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 14,
                    backgroundColor: COLORS.bg,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ fontSize: 11, color: COLORS.warmGray }}>
                    {met}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <SecLabel>DATOS BANCARIOS</SecLabel>
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Razón Social
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  La Voz Misionera Church Py
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  RUC
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Banco
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Cuenta Gs
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Cuenta USD
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
            </Card>

            <Card style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Tigo Money
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Personal Pay
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  0971 654 321
                </Text>
              </View>
            </Card>

            <Text
              style={{
                fontSize: 12,
                color: COLORS.warmGray,
                marginTop: 12,
                lineHeight: 19,
              }}
            >
              Todas las donaciones son auditadas. Recibes comprobante por email.
            </Text>
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
