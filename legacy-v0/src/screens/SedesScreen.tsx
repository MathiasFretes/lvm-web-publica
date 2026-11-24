import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { useSedes } from '../useFirestore';

const Tag = ({
  text,
  variant = 'gold',
}: {
  text: string;
  variant?: 'gold' | 'open' | 'full' | 'series';
}) => {
  const variants = {
    gold: {
      bg: 'rgba(198,161,91,0.1)',
      color: COLORS.gold,
      border: 'rgba(198,161,91,0.25)',
    },
    open: { bg: '#e6f4ea', color: COLORS.success, border: '#c8e6c9' },
    full: { bg: '#fff4e5', color: COLORS.warning, border: '#ffe0b2' },
    series: { bg: '#eef3ff', color: COLORS.church, border: '#dde8ff' },
  };
  const cfg = variants[variant];
  return (
    <View
      style={{
        backgroundColor: cfg.bg,
        borderWidth: 1,
        borderColor: cfg.border,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: '600',
          color: cfg.color,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

interface DarkHeaderProps {
  label?: string;
  title: string;
  accent?: string;
  sub?: string;
  onBack: () => void;
}

const DarkHeader: React.FC<DarkHeaderProps> = ({ label, title, accent, sub, onBack }) => (
  <View
    style={{
      backgroundColor: COLORS.deep,
      paddingTop: isDesktop ? 110 : 80,
      paddingBottom: 44,
      paddingHorizontal: 24,
    }}
  >
    <TouchableOpacity
      onPress={onBack}
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
    {label && (
      <Text
        style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: COLORS.goldLt,
          fontWeight: '600',
          marginBottom: 10,
          fontFamily: TYPOGRAPHY.sans,
        }}
      >
        {label}
      </Text>
    )}
    <Text
      style={{
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 42 : 34,
        fontWeight: '700',
        color: COLORS.white,
        lineHeight: isDesktop ? 48 : 40,
      }}
    >
      {title}{' '}
      <Text style={{ color: COLORS.goldLt, fontStyle: 'italic' }}>
        {accent}
      </Text>
    </Text>
    {sub && (
      <Text
        style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.65)',
          marginTop: 10,
          lineHeight: 24,
        }}
      >
        {sub}
      </Text>
    )}
    <View
      style={{
        width: 40,
        height: 3,
        backgroundColor: COLORS.gold,
        borderRadius: 2,
        marginTop: 16,
      }}
    />
  </View>
);

const Toast = ({
  message,
  visible,
  onHide,
}: {
  message: string;
  visible: boolean;
  onHide: () => void;
}) => {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2800);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={[
        {
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
        },
        SHADOWS.sh3,
      ]}
    >
      <Text style={{ color: COLORS.gold, fontSize: 16 }}>✓</Text>
      <Text style={{ color: COLORS.white, fontSize: 13 }}>{message}</Text>
    </View>
  );
};

const SedesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedSede, setSelectedSede] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { sedes, loading } = useSedes();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const formatSchedule = (horarios?: { day: string; time: string }[]) => {
    if (!horarios || horarios.length === 0) return 'Consultar horarios';
    return horarios.map(h => `${h.day} ${h.time}`).join(' | ');
  };

  if (loading) {
    return (
      <ScrollView style={{ backgroundColor: COLORS.bg }}>
        <DarkHeader label="UBICACIONES" title="Nuestras" accent="Sedes" onBack={onBack} />
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.gold} />
        </View>
      </ScrollView>
    );
  }

  const displaySedes = sedes.length > 0 ? sedes : [];

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="UBICACIONES"
        title="Nuestras"
        accent="Sedes"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 40 }}>
          <View style={{ flex: 1 }}>
            {displaySedes.map((sede, index) => (
              <TouchableOpacity
                key={sede.id || index}
                onPress={() => setSelectedSede(index)}
                style={{
                  backgroundColor: COLORS.surface,
                  borderWidth: 1.5,
                  borderColor:
                    selectedSede === index ? COLORS.gold : COLORS.border,
                  borderRadius: SPACING.r,
                  padding: 18,
                  marginBottom: 10,
                  ...SHADOWS.sh1,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 7,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: COLORS.deep,
                    }}
                  >
                    {sede.name}
                  </Text>
                  <Tag
                    text={sede.isCentral ? 'Principal' : 'Anexo'}
                    variant={sede.isCentral ? 'gold' : 'series'}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.warmGray,
                    marginBottom: 5,
                  }}
                >
                  {sede.address}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                  {sede.pastor}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flex: 1,
              height: 420,
              borderRadius: SPACING.r,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <TouchableOpacity
              onPress={() => showToast('Abriendo Google Maps...')}
              style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.warmGray,
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                📍 {displaySedes[selectedSede]?.name}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                Ver en Google Maps →
              </Text>
            </TouchableOpacity>
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

export default SedesScreen;
