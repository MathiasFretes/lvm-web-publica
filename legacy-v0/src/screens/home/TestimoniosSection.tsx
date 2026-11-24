/**
 * TestimoniosSection Component
 * Extracted from HomeScreen.tsx (lines 1467-1582)
 * Testimonials display section
 */

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';
import { isDesktop } from '../../constants/platform';
import SecLabel from '../../components/SecLabel';
import SecTitle from '../../components/SecTitle';
import Card from '../../components/Card';

interface Testimonio {
  id?: string;
  text: string;
  author: string;
  role: string;
  initials: string;
}

interface TestimoniosSectionProps {
  testimonios: Testimonio[];
  loading: boolean;
}

export const TestimoniosSection: React.FC<TestimoniosSectionProps> = ({
  testimonios,
  loading,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.surface,
        paddingHorizontal: 24,
        paddingVertical: 60,
      }}
    >
      <SecLabel>HISTORIAS REALES</SecLabel>
      <SecTitle accent="transformadas">Vidas</SecTitle>

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
        ) : testimonios.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: COLORS.warmGray, fontSize: 14 }}>
              No hay testimonios aún
            </Text>
          </View>
        ) : (
          testimonios.slice(0, 3).map((item) => (
            <Card key={item.id} style={{ flex: 1 }}>
              <Text
                style={{
                  color: COLORS.gold,
                  fontSize: 14,
                  letterSpacing: 2,
                  marginBottom: 14,
                }}
              >
                ★★★★★
              </Text>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 40,
                  color: COLORS.gold,
                  opacity: 0.3,
                  marginBottom: 10,
                }}
              >
                &quot;
              </Text>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 16,
                  fontStyle: 'italic',
                  lineHeight: 28,
                  color: COLORS.deep,
                  marginBottom: 18,
                }}
              >
                {item.text}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopColor: COLORS.border,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(62,107,165,0.1)',
                    borderWidth: 2,
                    borderColor: 'rgba(62,107,165,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: TYPOGRAPHY.serif,
                      fontSize: 16,
                      fontWeight: '700',
                      color: COLORS.church,
                    }}
                  >
                    {item.initials}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: COLORS.deep,
                    }}
                  >
                    {item.author}
                  </Text>
                  <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                    {item.role}
                  </Text>
                </View>
              </View>
            </Card>
          ))
        )}
      </View>
    </View>
  );
};

export default TestimoniosSection;
