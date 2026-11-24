import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { useMinisterios } from '../useFirestore';

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

interface MinisteriosScreenProps {
  onBack: () => void;
}

const MinisteriosScreen: React.FC<MinisteriosScreenProps> = ({ onBack }) => {
  const { ministerios, loading } = useMinisterios();

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="COMUNIDAD"
        title="Nuestros"
        accent="Ministerios"
        onBack={onBack}
      />
      <View style={{ padding: 24 }}>
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.gold} />
          </View>
        ) : ministerios.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: COLORS.warmGray, fontSize: 14 }}>
              No hay ministerios disponibles
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
            {ministerios.map((item) => (
              <Card key={item.id} style={{ width: isDesktop ? '23%' : '100%' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: COLORS.deep,
                    marginBottom: 8,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ fontSize: 13, color: COLORS.warmGray, lineHeight: 21 }}
                >
                  {item.desc}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MinisteriosScreen;