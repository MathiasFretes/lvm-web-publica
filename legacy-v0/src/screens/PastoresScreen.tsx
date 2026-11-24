import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { usePastores } from '../useFirestore';

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

interface PastoresScreenProps {
  onBack: () => void;
}

const PastoresScreen: React.FC<PastoresScreenProps> = ({ onBack }) => {
  const { pastores, loading } = usePastores();

  const getInitials = (name: string) => {
    const parts = name.replace('Pastor ', '').replace('Pastora ', '').split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <ScrollView style={{ backgroundColor: COLORS.bg }}>
        <DarkHeader label="LIDERAZGO" title="Nuestros" accent="Pastores" onBack={onBack} />
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.gold} />
        </View>
      </ScrollView>
    );
  }

  const displayPastores = pastores.length > 0 ? pastores : [];

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="LIDERAZGO"
        title="Nuestros"
        accent="Pastores"
        onBack={onBack}
      />
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 22 }}>
          {displayPastores.map((item) => (
            <Card key={item.id} style={{ width: isDesktop ? '23%' : '100%' }}>
              <LinearGradient
                colors={[COLORS.deep, '#2a4060']}
                style={{ height: 100 }}
              />
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginTop: -40,
                  alignSelf: 'center',
                  backgroundColor: COLORS.church,
                  borderWidth: 3,
                  borderColor: COLORS.surface,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: TYPOGRAPHY.serif,
                    fontSize: 22,
                    fontWeight: '700',
                    color: COLORS.white,
                  }}
                >
                  {getInitials(item.name)}
                </Text>
              </View>
              <View style={{ padding: 18 }}>
                <Text
                  style={{
                    fontFamily: TYPOGRAPHY.serif,
                    fontSize: 18,
                    fontWeight: '700',
                    color: COLORS.deep,
                    textAlign: 'center',
                    marginBottom: 4,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    letterSpacing: 1.5,
                    color: COLORS.gold,
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: 12,
                  }}
                >
                  {item.role.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.warmGray,
                    lineHeight: 19,
                    textAlign: 'center',
                  }}
                >
                  {item.bio}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PastoresScreen;