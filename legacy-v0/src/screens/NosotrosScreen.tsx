import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { useValores } from '../useFirestore';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, onPress, style, padding = true }) => {
  const Component = onPress ? require('react-native').TouchableOpacity : require('react-native').View;
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

interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => (
  <View style={{ alignItems: 'center' }}>
    <Text
      style={{
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 52 : 42,
        fontWeight: '700',
        color: COLORS.goldLt,
        lineHeight: isDesktop ? 58 : 48,
      }}
    >
      {value}
    </Text>
    <Text
      style={{
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '500',
        marginTop: 8,
      }}
    >
      {label}
    </Text>
  </View>
);

interface DarkHeaderProps {
  label?: string;
  title: string;
  accent?: string;
  sub?: string;
  onBack: () => void;
}

const DarkHeader: React.FC<DarkHeaderProps> = ({ label, title, accent, sub, onBack }) => (
  <LinearGradient
    colors={[COLORS.deep, '#243b55']}
    style={{
      paddingTop: isDesktop ? 110 : 80,
      paddingBottom: 44,
      paddingHorizontal: 24,
    }}
  >
    <View
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
    </View>
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
  </LinearGradient>
);

interface NosotrosScreenProps {
  onBack: () => void;
}

const NosotrosScreen: React.FC<NosotrosScreenProps> = ({ onBack }) => {
  const { valores, loading } = useValores();

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="QUIÉNES SOMOS"
        title="Visión y"
        accent="Valores"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 60,
            marginBottom: 60,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: COLORS.church,
                fontWeight: '600',
                marginBottom: 10,
            }}
          >
            VISIÓN
          </Text>
          <Text
            style={{
              fontFamily: TYPOGRAPHY.serif,
              fontSize: isDesktop ? 36 : 28,
              fontWeight: '700',
              color: COLORS.deep,
              marginBottom: 14,
            }}
          >
            Ser una iglesia que impacte cada barrio de Paraguay
          </Text>
          <Text
            style={{ fontSize: 15, color: COLORS.warmGray, lineHeight: 27 }}
          >
            Cada creyente es un ministerio y cada hogar una iglesia. Trabajamos
            para que cada familia de Paraguay tenga la oportunidad de conocer el
            amor de Jesucristo.
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: COLORS.church,
              fontWeight: '600',
              marginBottom: 10,
            }}
          >
            MISIÓN
          </Text>
          <Text
            style={{
              fontFamily: TYPOGRAPHY.serif,
              fontSize: isDesktop ? 36 : 28,
              fontWeight: '700',
              color: COLORS.deep,
              marginBottom: 14,
            }}
          >
            Existimos para ayudar a las personas a conocer a Dios
          </Text>
          <Text
            style={{ fontSize: 15, color: COLORS.warmGray, lineHeight: 27 }}
          >
            Lo hacemos a través de prédica genuina, comunidad auténtica,
            adoración de corazón, discipulado intencional y misión que
            trasciende las paredes de la iglesia.
          </Text>
        </View>
      </View>

      <SecLabel>NUESTROS VALORES</SecLabel>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center', width: '100%' }}>
            <ActivityIndicator size="large" color={COLORS.gold} />
          </View>
        ) : valores.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center', width: '100%' }}>
            <Text style={{ color: COLORS.warmGray, fontSize: 14 }}>
              No hay valores disponibles
            </Text>
          </View>
        ) : (
          valores.map((item) => (
          <Card key={item.id} style={{ width: isDesktop ? '31%' : '100%' }}>
            <Text
              style={{
                position: 'absolute',
                top: -6,
                right: 14,
                fontFamily: TYPOGRAPHY.serif,
                fontSize: 72,
                fontWeight: '700',
                color: 'rgba(62,107,165,0.05)',
              }}
            >
              {item.number}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: COLORS.church,
                marginBottom: 10,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{ fontSize: 13, color: COLORS.warmGray, lineHeight: 22 }}
            >
              {item.desc}
            </Text>
          </Card>
        ))
        )}
      </View>

      <LinearGradient
        colors={[COLORS.deep, '#243b55']}
        style={{
          marginTop: 48,
          padding: 60,
          borderRadius: 0,
          marginHorizontal: -24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 30,
          }}
        >
          <Stat value="1979" label="Fundación" />
          <Stat value="1.200+" label="Miembros" />
          <Stat value="49" label="Sedes" />
          <Stat value="12+" label="Células" />
        </View>
      </LinearGradient>
    </View>
  </ScrollView>
  );
};

export default NosotrosScreen;