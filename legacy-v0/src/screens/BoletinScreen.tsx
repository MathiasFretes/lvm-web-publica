import React, { useState } from 'react';
import { submitPublicForm } from '../utils/publicForms';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { DarkHeader } from '../components/DarkHeader';
import Card from '../components/Card';
import SecLabel from '../components/SecLabel';
import BtnPrimary from '../components/BtnPrimary';
import Tag from '../components/Tag';
import Toast from '../components/Toast';

interface BoletinScreenProps {
  onBack: () => void;
}

export const BoletinScreen: React.FC<BoletinScreenProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="COMUNICACIÓN"
        title="Boletín"
        accent="Semanal"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <Card style={{ alignItems: 'center', padding: 40 }}>
          <SecLabel style={{ textAlign: 'center' }}>
            MANTENTE CONECTADO
          </SecLabel>
          <Text
            style={{
              fontFamily: TYPOGRAPHY.serif,
              fontSize: 32,
              fontWeight: '700',
              color: COLORS.deep,
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            Noticias de la iglesia{'\n'}
            <Text style={{ color: COLORS.church }}>cada semana</Text>
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.warmGray,
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            Prédicas nuevas, eventos, devocionales. Sin spam.
          </Text>

          <View
            style={{
              flexDirection: isDesktop ? 'row' : 'column',
              gap: 10,
              width: '100%',
              maxWidth: 420,
            }}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Tu correo electrónico"
              placeholderTextColor={COLORS.warmGray}
              style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                borderWidth: 1.5,
                borderColor: COLORS.border,
                borderRadius: SPACING.rSm,
                padding: 12,
                fontSize: 14,
                color: COLORS.deep,
              }}
            />
            <BtnPrimary
              label="SUSCRIBIRME"
              small
              onPress={async () => {
                try { await submitPublicForm('boletin',{email}); showToast('Solicitud de suscripción recibida.'); }
                catch(error) { showToast(error instanceof Error ? error.message : 'No se pudo guardar la suscripción.'); }
              }}
            />
          </View>
        </Card>

        <View style={{ marginTop: 36 }}>
          <SecLabel>ÚLTIMAS EDICIONES</SecLabel>
          <View style={{ gap: 10, marginTop: 14 }}>
            {[
              {
                name: 'Boletín #48 — Marzo 2026',
                desc: 'Conferencia Familiar, nuevas prédicas, retiro de jóvenes',
                current: true,
              },
              {
                name: 'Boletín #47 — Feb 2026',
                desc: 'Aniversario, bautismos, novedades de misiones',
                current: false,
              },
              {
                name: 'Boletín #46 — Ene 2026',
                desc: 'Inicio de año, nueva serie, estudios bíblicos',
                current: false,
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => showToast(`Abriendo ${item.name}`)}
                style={{
                  backgroundColor: COLORS.surface,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: SPACING.r,
                  padding: 18,
                  ...SHADOWS.sh1,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: COLORS.deep,
                    }}
                  >
                    {item.name}
                  </Text>
                  {item.current && <Tag text="ESTA SEMANA" variant="open" />}
                </View>
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
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
