/**
 * EventosSection Component
 * Extracted from HomeScreen.tsx (lines 1131-1255)
 * Events/agenda section
 */

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/design';
import { isDesktop } from '../../constants/platform';
import { PageId } from '../../types/pages';
import SecLabel from '../../components/SecLabel';
import SecTitle from '../../components/SecTitle';
import BtnChurch from '../../components/BtnChurch';

interface Evento {
  id?: string;
  name: string;
  date: string;
  time: string;
  location?: string;
  icon?: string;
}

interface EventosSectionProps {
  eventos: Evento[];
  loading: boolean;
  onNavigate: (page: PageId) => void;
  showToast: (message: string) => void;
}

export const EventosSection: React.FC<EventosSectionProps> = ({
  eventos,
  loading,
  onNavigate,
  showToast,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.surface,
        paddingHorizontal: 24,
        paddingVertical: 60,
      }}
    >
      <SecLabel>AGENDA</SecLabel>
      <SecTitle accent="eventos">Próximos</SecTitle>

      <View
        style={{
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 20,
          marginTop: 40,
        }}
      >
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.gold} />
          </View>
        ) : eventos.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: COLORS.warmGray, fontSize: 14 }}>
              No hay eventos próximos
            </Text>
          </View>
        ) : (
          eventos.slice(0, 3).map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => showToast(`Inscripción abierta — ${item.name}`)}
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
                  height: 190,
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    backgroundColor: COLORS.gold,
                    borderRadius: 10,
                    padding: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: TYPOGRAPHY.serif,
                      fontSize: 24,
                      fontWeight: '700',
                      color: COLORS.white,
                    }}
                  >
                    {item.date.split(' ')[0]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      letterSpacing: 1,
                      color: COLORS.white,
                      fontWeight: '700',
                    }}
                  >
                    {item.date.split(' ')[1]}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: TYPOGRAPHY.serif,
                    fontSize: 42,
                    color: 'rgba(255,255,255,0.06)',
                    fontWeight: '700',
                  }}
                >
                  {item.icon || '📅'}
                </Text>
              </LinearGradient>
              <View style={{ backgroundColor: COLORS.surface, padding: 18 }}>
                <Text
                  style={{
                    fontFamily: TYPOGRAPHY.serif,
                    fontSize: 18,
                    fontWeight: '700',
                    color: COLORS.deep,
                    marginBottom: 8,
                  }}
                >
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                    🕐 {item.time}
                  </Text>
                  <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                    📍 {item.location || 'Sede Central'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={{ marginTop: 22 }}>
        <BtnChurch
          label="VER CALENDARIO COMPLETO"
          onPress={() => onNavigate('calendario')}
        />
      </View>
    </View>
  );
};

export default EventosSection;
