import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { useCelulas } from '../useFirestore';

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

const Card = ({ children, onPress, style, padding = true }: any) => {
  const Component = onPress ? TouchableOpacity : View;
  return (
    <Component
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        {
          backgroundColor: COLORS.surface,
          borderRadius: SPACING.r,
          ...SHADOWS.sh2,
          overflow: 'hidden',
          ...(padding ? { padding: 20 } : {}),
        },
        style,
      ]}
    >
      {children}
    </Component>
  );
};

const BtnPrimary = ({
  label,
  onPress,
  full = false,
  small = false,
  style,
}: any) => (
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

const BtnChurch = ({ label, onPress, small = false, style }: any) => (
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

const SecSub = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => (
  <Text
    style={[
      {
        fontSize: 16,
        color: COLORS.warmGray,
        lineHeight: 27,
        maxWidth: 500,
      },
      style,
    ]}
  >
    {children}
  </Text>
);

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

const CelulasScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const { celulas, loading } = useCelulas();

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="GRUPOS PEQUEÑOS"
        title="Grupos y"
        accent="Células"
        onBack={onBack}
      />
      <View style={{ padding: 24 }}>
        <SecSub style={{ marginBottom: 24 }}>
          La iglesia no es un edificio, es una comunidad. Los grupos de célula
          son el corazón de nuestra vida comunitaria.
        </SecSub>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
          <BtnPrimary
            label="UNIRME A UN GRUPO"
            onPress={() => showToast('Formulario de registro...')}
          />
          <BtnChurch
            label="LIDERAR UN GRUPO"
            onPress={() => showToast('Formulario para liderar...')}
          />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
          {loading ? (
            <View style={{ padding: 40, width: '100%', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={COLORS.gold} />
            </View>
          ) : celulas.length === 0 ? (
            <View style={{ padding: 40, width: '100%', alignItems: 'center' }}>
              <Text style={{ color: COLORS.warmGray, fontSize: 14 }}>
                No hay células activas en este momento
              </Text>
            </View>
          ) : (
            celulas.map((item) => (
            <Card key={item.id} style={{ width: isDesktop ? '31%' : '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 12,
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
                <Tag
                  text={item.status}
                  variant={item.status === 'Abierto' ? 'open' : 'full'}
                />
              </View>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.warmGray,
                  marginBottom: 3,
                }}
              >
                {item.day}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.warmGray,
                  marginBottom: 3,
                }}
              >
                {item.zone}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.warmGray,
                  marginBottom: 12,
                }}
              >
                {item.count}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingTop: 12,
                  borderTopWidth: 1,
                  borderTopColor: COLORS.border,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(62,107,165,0.1)',
                    borderWidth: 1.5,
                    borderColor: 'rgba(62,107,165,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: COLORS.church,
                    }}
                  >
                    {item.leader
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: COLORS.deep,
                    }}
                  >
                    {item.leader}
                  </Text>
                  <Text style={{ fontSize: 11, color: COLORS.warmGray }}>
                    Líder de célula
                  </Text>
                </View>
              </View>
            </Card>
           )))}

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

export default CelulasScreen;
