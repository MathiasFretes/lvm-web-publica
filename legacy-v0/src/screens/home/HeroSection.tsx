/**
 * HeroSection Component
 * Extracted from HomeScreen.tsx (lines 166-489)
 * Hero slider with slides, CTAs, and animations
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/design';
import { isDesktop, isWeb, useNativeDriver } from '../../constants/platform';
import { PageId } from '../../types/pages';
import LiveDot from '../../components/LiveDot';
import BtnPrimary from '../../components/BtnPrimary';
import BtnWhite from '../../components/BtnWhite';
import { HERO_SLIDES } from '../../data/fallback';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
  content?: { heroTitle?: string; heroAccent?: string; heroSubtitle?: string } | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, content }) => {
  const slides = useMemo(() => content?.heroTitle ? [{ ...HERO_SLIDES[0], title: content.heroTitle, accent: content.heroAccent || '', sub: content.heroSubtitle || '' }] : HERO_SLIDES, [content?.heroTitle, content?.heroAccent, content?.heroSubtitle]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(1)).current;
  const kenBurnsScale = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startKenBurns = useCallback(() => {
    kenBurnsScale.setValue(1);
    Animated.timing(kenBurnsScale, {
      toValue: 1.07,
      duration: 7000,
      useNativeDriver,
    }).start();
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    startKenBurns();
  }, [currentSlide, startKenBurns, slides.length]);

  const goToSlide = useCallback((index: number) => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver,
    }).start(() => {
      setCurrentSlide(index);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver,
      }).start();
    });
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  useEffect(() => {
    if (slides.length < 2) return;
    timerRef.current = setInterval(nextSlide, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, slides.length]);

  const heroHeight = isWeb ? '100vh' : '100%';

  return (
    <View
      style={[
        { height: heroHeight as any, minHeight: 640, position: 'relative' },
      ] as any[]}
    >
      {slides.map((slide, index) => (
        <Animated.View
          key={slide.id}
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: currentSlide === index ? 1 : 0,
              pointerEvents: currentSlide === index ? 'auto' : 'none',
              transform: [{ scale: kenBurnsScale }],
            },
          ]}
        >
          <View style={{ flex: 1, position: 'relative' }}>
            {/* VIDEO */}
            {slide.isVideo && isWeb && (
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
              >
                <source src={slide.bgVideo} type="video/mp4" />
              </video>
            )}

            {/* IMAGEN */}
            {!slide.isVideo && slide.bgImage && isWeb && (
              <img
                src={slide.bgImage}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
                alt="slide background"
              />
            )}

            {/* Capa oscura suave */}
            <View
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 1,
              }}
            />

            {/* Gradiente decorativo */}
            <LinearGradient
              colors={['rgba(28,42,57,0.4)', 'rgba(36,59,85,0.3)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', inset: 0, zIndex: 2 }}
            />

            {/* Contenido del slide */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  maxWidth: 860,
                  width: '100%',
                }}
              >
                {/* Eyebrow badge */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 40,
                    paddingHorizontal: 16,
                    paddingVertical: 7,
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: COLORS.goldLt,
                      fontWeight: '600',
                    }}
                  >
                    {slide.eyebrow}
                  </Text>
                </View>

                {/* Título */}
                <Text
                  style={{
                    fontFamily: TYPOGRAPHY.serif,
                    fontSize: isDesktop ? 72 : 48,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    lineHeight: isDesktop ? 70 : 50,
                    letterSpacing: -1,
                    marginBottom: 20,
                  }}
                >
                  {slide.title}
                  {'\n'}
                  <Text style={{ color: COLORS.goldLt, fontStyle: 'italic' }}>
                    {slide.accent}
                  </Text>
                </Text>

                {/* Subtítulo */}
                <Text
                  style={{
                    fontSize: isDesktop ? 22 : 16,
                    color: 'rgba(255,255,255,0.9)',
                    textAlign: 'center',
                    maxWidth: 520,
                    fontWeight: '300',
                    lineHeight: isDesktop ? 34 : 26,
                    marginBottom: 36,
                  }}
                >
                  {slide.sub}
                </Text>

                {/* Botones */}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <BtnPrimary
                    label={slide.cta1.label}
                    onPress={() => onNavigate(slide.cta1.page)}
                  />
                  <BtnWhite
                    label={slide.cta2.label}
                    onPress={() => onNavigate(slide.cta2.page)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      ))}

      {/* Live badge */}
      <TouchableOpacity
        onPress={() => onNavigate('envivo')}
        style={{
          position: 'absolute',
          top: 90,
          right: 24,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: 'rgba(255,255,255,0.14)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.28)',
          borderRadius: 40,
          paddingHorizontal: 16,
          paddingVertical: 9,
        }}
      >
        <LiveDot />
        <Text
          style={{ color: COLORS.white, fontSize: 11, fontWeight: '700' }}
        >
          LA VOZ MISIONERA · COMUNIDAD
        </Text>
      </TouchableOpacity>

      {/* Slider arrows */}
      {isDesktop && slides.length > 1 && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 32,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              goToSlide(
                (currentSlide - 1 + slides.length) % slides.length,
              )
            }
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 20 }}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => goToSlide((currentSlide + 1) % slides.length)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 20 }}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Indicators */}
      <View
        style={{
          position: 'absolute',
          bottom: 36,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {slides.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => goToSlide(index)}>
            <View
              style={{
                width: currentSlide === index ? 28 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  currentSlide === index
                    ? COLORS.gold
                    : 'rgba(255,255,255,0.3)',
              }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* SCROLL INDICATOR */}
      <View
        style={{
          position: 'absolute',
          bottom: 36,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 45,
        }}
      >
        <View
          style={{
            width: 1,
            height: 32,
            backgroundColor: COLORS.goldLt,
            opacity: 0.3,
            marginTop: 25,
          }}
        />
        <Text
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 10,
            letterSpacing: 2,
            marginTop: 5,
          }}
        >
          DESPLAZAR
        </Text>
      </View>
    </View>
  );
};

export default HeroSection;
