/**
 * PredicasSection Component
 * Extracted from HomeScreen.tsx (lines 995-1129)
 * Sermons/media section
 */

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/design';
import { isDesktop } from '../../constants/platform';
import { PageId } from '../../types/pages';
import SecLabel from '../../components/SecLabel';
import SecTitle from '../../components/SecTitle';
import BtnPrimary from '../../components/BtnPrimary';
import BtnChurch from '../../components/BtnChurch';

interface Predica {
  id?: string;
  title: string;
  pastor: string;
  date: string;
  serie: string;
}

interface PredicasSectionProps {
  predicas: Predica[];
  loading: boolean;
  onNavigate: (page: PageId) => void;
  showModal: (title: string, subtitle: string) => void;
}

export const PredicasSection: React.FC<PredicasSectionProps> = ({
  predicas,
  loading,
  onNavigate,
  showModal,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.bg,
        paddingHorizontal: 24,
        paddingVertical: 60,
      }}
    >
      <SecLabel>MULTIMEDIA</SecLabel>
      <SecTitle accent="prédicas">Últimas</SecTitle>

      <View
        style={{
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 20,
          marginTop: 28,
        }}
      >
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.gold} />
          </View>
        ) : (
          <>
            {predicas.slice(0, 3).map((item, index) => (
              <TouchableOpacity
                key={item.id || index}
                onPress={() =>
                  showModal(
                    item.title,
                    `${item.pastor} — ${item.date} — ${item.serie}`,
                  )
                }
                style={{
                  flex: 1,
                  borderRadius: SPACING.r,
                  overflow: 'hidden',
                  ...SHADOWS.sh2,
                }}
              >
                <LinearGradient
                  colors={[COLORS.deep, '#2a4060']}
                  style={{
                    height: 172,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: COLORS.white,
                        letterSpacing: 1,
                        fontWeight: '600',
                      }}
                    >
                      {item.serie}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 27,
                      borderWidth: 2,
                      borderColor: 'rgba(255,255,255,0.5)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontSize: 14 }}>
                      ▶
                    </Text>
                  </View>
                </LinearGradient>
                <View
                  style={{ backgroundColor: COLORS.surface, padding: 18 }}
                >
                  <Text
                    style={{
                      fontFamily: TYPOGRAPHY.serif,
                      fontSize: 18,
                      fontWeight: '700',
                      color: COLORS.deep,
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                      {item.pastor}
                    </Text>
                    <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                      {item.date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 22 }}>
        <BtnPrimary
          label="VER TODAS LAS PRÉDICAS"
          onPress={() => onNavigate('predicas')}
        />
        <BtnChurch
          label="BIBLIOTECA DE SERMONES"
          onPress={() => onNavigate('biblioteca')}
        />
      </View>
    </View>
  );
};

export default PredicasSection;
