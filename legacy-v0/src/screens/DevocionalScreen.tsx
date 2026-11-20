import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';

interface VerseBlockProps {
  verse: string;
  reference: string;
}

const VerseBlock: React.FC<VerseBlockProps> = ({ verse, reference }) => (
  <View style={{ marginVertical: 24 }}>
    <Text
      style={{
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 24 : 20,
        fontStyle: 'italic',
        color: COLORS.deep,
        lineHeight: isDesktop ? 38 : 32,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.gold,
        paddingLeft: 24,
      }}
    >
      {verse}
    </Text>
    <Text
      style={{
        fontSize: 13,
        color: COLORS.gold,
        letterSpacing: 1,
        fontWeight: '700',
        marginTop: 8,
        paddingLeft: 24,
      }}
    >
      {reference}
    </Text>
  </View>
);

interface SecLabelProps {
  children: React.ReactNode;
  light?: boolean;
  style?: any;
}

const SecLabel: React.FC<SecLabelProps> = ({ children, light = false, style }) => (
  <Text
    style={[
      {
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: light ? COLORS.goldLt : COLORS.gold,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily: TYPOGRAPHY.sans,
      },
      style,
    ]}
  >
    {children}
  </Text>
);

interface SecTitleProps {
  children: React.ReactNode;
  accent?: string;
  style?: any;
}

const SecTitle: React.FC<SecTitleProps> = ({ children, accent, style }) => (
  <Text
    style={[
      {
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 40 : 32,
        fontWeight: '700',
        color: COLORS.deep,
        lineHeight: isDesktop ? 44 : 36,
        marginBottom: 16,
      },
      style,
    ]}
  >
    {children}
    {accent ? <Text style={{ color: COLORS.church }}> {accent}</Text> : null}
  </Text>
);

interface BtnPrimaryProps {
  label: string;
  onPress: () => void;
  full?: boolean;
  small?: boolean;
  style?: any;
}

const BtnPrimary: React.FC<BtnPrimaryProps> = ({ label, onPress, full = false, small = false, style }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        backgroundColor: COLORS.gold,
        paddingVertical: small ? 9 : 14,
        paddingHorizontal: small ? 18 : 26,
        borderRadius: SPACING.rSm,
        ...(full ? { width: '100%' } : {}),
        ...SHADOWS.sh1,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.white,
        fontSize: small ? 13 : 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

interface BtnChurchProps {
  label: string;
  onPress: () => void;
  small?: boolean;
  style?: any;
}

const BtnChurch: React.FC<BtnChurchProps> = ({ label, onPress, small = false, style }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        borderWidth: 2,
        borderColor: COLORS.church,
        paddingVertical: small ? 8 : 13,
        paddingHorizontal: small ? 16 : 24,
        borderRadius: SPACING.rSm,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.church,
        fontSize: small ? 12 : 14,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

interface BackBtnProps {
  onPress: () => void;
}

const BackBtn: React.FC<BackBtnProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      alignSelf: 'flex-start',
      paddingVertical: 9,
      paddingHorizontal: 14,
      backgroundColor: COLORS.surface,
      borderRadius: SPACING.rSm,
      borderWidth: 1,
      borderColor: COLORS.border,
      ...SHADOWS.sh1,
    }}
  >
    <Text style={{ color: COLORS.deep, fontSize: 13, fontWeight: '600' }}>
      ← Volver
    </Text>
  </TouchableOpacity>
);

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onHide }) => {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2800);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
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
        ...SHADOWS.sh3,
      }}
    >
      <Text style={{ color: COLORS.gold, fontSize: 16 }}>✓</Text>
      <Text style={{ color: COLORS.white, fontSize: 13 }}>{message}</Text>
    </View>
  );
};

interface DevocionalScreenProps {
  onBack: () => void;
}

const DevocionalScreen: React.FC<DevocionalScreenProps> = ({ onBack }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <View
        style={{
          backgroundColor: COLORS.surface,
          paddingTop: isDesktop ? 110 : 80,
          paddingBottom: 28,
          paddingHorizontal: 24,
        }}
      >
        <BackBtn onPress={onBack} />
        <View
          style={{
            backgroundColor: 'rgba(198,161,91,0.1)',
            borderWidth: 1,
            borderColor: 'rgba(198,161,91,0.25)',
            borderRadius: 40,
            paddingHorizontal: 14,
            paddingVertical: 6,
            alignSelf: 'flex-start',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: COLORS.gold,
              fontWeight: '600',
              letterSpacing: 1.5,
            }}
          >
            SÁBADO, 7 DE MARZO 2026
          </Text>
        </View>
        <SecLabel>DEVOCIONAL DIARIO</SecLabel>
        <SecTitle accent="Palabra">Firmeza en la</SecTitle>
      </View>

      <View style={{ padding: 24 }}>
        <VerseBlock
          verse='"Toda la Escritura es inspirada por Dios y útil para enseñanza, para redención, para corrección, para instrucción en justicia..."'
          reference="2 Timoteo 3:16-17"
        />

        <Text
          style={{
            fontSize: 15,
            color: COLORS.text,
            lineHeight: 27,
            marginBottom: 18,
          }}
        >
          Vivimos en tiempos donde la información abunda y las voces son muchas.
          En medio de este ruido, la Palabra de Dios permanece como un ancla
          sólida e inamovible. El apóstol Pablo, escribiendo desde la prisión,
          exhorta a Timoteo a mantenerse firme en las Escrituras.
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: COLORS.text,
            lineHeight: 27,
            marginBottom: 18,
          }}
        >
          La palabra griega{' '}
          <Text style={{ fontStyle: 'italic' }}>theopneustos</Text> ("inspirada
          por Dios") significa literalmente "soplada por Dios". Así como Dios
          sopló vida en Adán, sopló Su verdad en cada página de la Biblia. No es
          un libro humano; es la revelación viviente del Dios eterno.
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: COLORS.text,
            lineHeight: 27,
            marginBottom: 18,
          }}
        >
          Pablo menciona cuatro usos prácticos:{' '}
          <Text style={{ fontWeight: '700' }}>enseñanza</Text> (qué es verdad),{' '}
          <Text style={{ fontWeight: '700' }}>redención</Text> (cuando nos
          desviamos), <Text style={{ fontWeight: '700' }}>corrección</Text>{' '}
          (para restaurarnos), e{' '}
          <Text style={{ fontWeight: '700' }}>instrucción en justicia</Text>{' '}
          (para formarnos). El propósito: que el creyente sea completamente
          equipado para toda buena obra.
        </Text>

        <View
          style={{
            backgroundColor: 'rgba(198,161,91,0.08)',
            borderLeftWidth: 3,
            borderLeftColor: COLORS.gold,
            borderRadius: 10,
            padding: 24,
            marginVertical: 28,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 1.5,
              color: COLORS.gold,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            APLICACIÓN PERSONAL
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.text, lineHeight: 25 }}>
            Comienza una disciplina de lectura bíblica regular hoy. No necesitas
            horas; 15 minutos cada mañana pueden transformar tu perspectiva.
            Elige un libro y comprométete a leerlo este mes.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: COLORS.bg,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: SPACING.r,
            padding: 24,
            marginBottom: 28,
          }}
        >
          <Text
            style={{
              fontFamily: TYPOGRAPHY.serif,
              fontSize: 14,
              fontStyle: 'italic',
              color: COLORS.warmGray,
              lineHeight: 27,
            }}
          >
            "Señor, gracias por Tu Palabra como guía fiel. Ayúdame a no solo
            leerla, sino a dejar que ella me lea a mí. Que cada promesa sea mi
            esperanza y cada mandamiento mi obediencia. En el nombre de Jesús,
            Amén."
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <BtnPrimary
            label="DESCARGAR PDF"
            onPress={() => showToast('Descargando PDF...')}
          />
          <BtnChurch
            label="COMPARTIR"
            onPress={() => showToast('Compartiendo...')}
          />
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

export default DevocionalScreen;