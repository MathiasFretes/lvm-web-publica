/**
 * FooterSection Component
 * Extracted from HomeScreen.tsx (lines 2042-2270)
 * Footer with church info, links, and social media
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';
import { isDesktop } from '../../constants/platform';
import { PageId } from '../../types/pages';

interface FooterSectionProps {
  onNavigate: (page: PageId) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.deep,
        paddingHorizontal: 24,
        paddingTop: 64,
        paddingBottom: 28,
      }}
    >
      <View
        style={{
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 44,
          marginBottom: 52,
          maxWidth: SPACING.max,
          alignSelf: 'center',
        }}
      >
        <View style={{ flex: 2 }}>
          <Image source={{ uri: '/brand/lvm-circle.svg' }} style={{ width: 64, height: 64, marginBottom: 14 }} accessibilityLabel="Emblema de La Voz Misionera" />
          <Text
            style={{
              fontFamily: TYPOGRAPHY.serif,
              fontSize: 22,
              fontWeight: '700',
              color: COLORS.white,
              marginBottom: 14,
            }}
          >
            La Voz <Text style={{ color: COLORS.goldLt }}>Misionera</Text>
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 22,
              maxWidth: 260,
              marginBottom: 18,
            }}
          >
            Una iglesia para toda persona. Predicando el Evangelio de
            Jesucristo con amor, integridad y poder en Asunción, Paraguay
            desde 2014.
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['YT', 'FB', 'IG', 'WA'].map((soc, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.12)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                    fontWeight: '700',
                  }}
                >
                  {soc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              color: COLORS.gold,
              fontWeight: '700',
              marginBottom: 14,
            }}
          >
            IGLESIA
          </Text>
          {['Visión y Valores', 'Pastores', 'Sedes', 'Contacto'].map(
            (link, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  onNavigate(
                    link === 'Visión y Valores'
                      ? 'nosotros'
                      : link === 'Pastores'
                        ? 'pastores'
                        : link === 'Sedes'
                          ? 'sedes'
                          : 'contacto',
                  )
                }
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 9,
                  }}
                >
                  {link}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              color: COLORS.gold,
              fontWeight: '700',
              marginBottom: 14,
            }}
          >
            MEDIA
          </Text>
          {['En Vivo', 'Prédicas', 'Biblioteca', 'Devocional'].map(
            (link, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  onNavigate(
                    link === 'En Vivo'
                      ? 'envivo'
                      : link === 'Prédicas'
                        ? 'predicas'
                        : link === 'Biblioteca'
                          ? 'biblioteca'
                          : 'devocional',
                  )
                }
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 9,
                  }}
                >
                  {link}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              color: COLORS.gold,
              fontWeight: '700',
              marginBottom: 14,
            }}
          >
            COMUNIDAD
          </Text>
          {[
            'Ministerios',
            'Grupos / Células',
            'Oración',
            'Donaciones',
            'Boletín',
            'Soy Nuevo',
          ].map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                onNavigate(
                  link === 'Ministerios'
                    ? 'ministerios'
                    : link === 'Grupos / Células'
                      ? 'celulas'
                      : link === 'Oración'
                        ? 'oracion'
                        : link === 'Donaciones'
                          ? 'donaciones'
                          : link === 'Boletín'
                            ? 'boletin'
                            : 'nuevo',
                )
              }
            >
              <Text
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 9,
                }}
              >
                {link}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.08)',
          paddingTop: 22,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          maxWidth: SPACING.max,
          alignSelf: 'center',
        }}
      >
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          © 2026 La Voz Misionera Church — Asunción, Paraguay
        </Text>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          Hecho con fe y propósito
        </Text>
      </View>
    </View>
  );
};

export default FooterSection;
