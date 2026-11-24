/**
 * NavbarDesktop Component
 * Desktop navigation bar with dropdown menus
 * Extracted from App.tsx inline definition
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop, isWeb } from '../constants/platform';
import { PageId } from '../types/pages';
import { LiveDot } from '../components';

interface NavbarDesktopProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onSecretTap: () => void;
  isScrolled: boolean;
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
  activePage,
  onNavigate,
  onSecretTap,
  isScrolled,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const isInicio = activePage === 'inicio';
  // En inicio: texto blanco si NO hay scroll (scrollY <= 10)
  // En otras páginas: siempre texto oscuro
  const textColor = isInicio && !isScrolled ? COLORS.white : COLORS.deep;
  const textColorSecondary =
    isInicio && !isScrolled ? 'rgba(255,255,255,0.85)' : 'rgba(28,42,57,0.7)';
  // El fondo hover también debe adaptarse
  const bgHover =
    isInicio && !isScrolled ? 'rgba(255,255,255,0.12)' : 'rgba(28,42,57,0.07)';

  return (
    <View
      style={[
        {
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: SPACING.navH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: isDesktop ? 60 : 24,
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        },
        isScrolled ? SHADOWS.sh1 : {},
      ]}
    >
      {/* Brand */}
      <TouchableOpacity
        onPress={onSecretTap}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 11 }}
      >
        <Image
          source={{ uri: '/brand/lvm-circle.svg' }}
          style={{ width: 40, height: 40 }}
          accessibilityLabel="Emblema de La Voz Misionera"
        />
        <Text
          style={{
            fontFamily: TYPOGRAPHY.serif,
            fontSize: 20,
            fontWeight: '700',
            color: textColor,
          }}
        >
          La Voz{' '}
          <Text
            style={{
              color: isInicio && !isScrolled ? COLORS.goldLt : COLORS.gold,
            }}
          >
            Misionera
          </Text>
        </Text>
      </TouchableOpacity>

      {/* Menú central */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        {/* Inicio */}
        <TouchableOpacity
          onPress={() => onNavigate('inicio')}
          style={{
            paddingHorizontal: 13,
            paddingVertical: 7,
            borderRadius: 7,
            backgroundColor:
              activePage === 'inicio'
                ? isScrolled
                  ? 'rgba(28,42,57,0.07)'
                  : 'rgba(255,255,255,0.12)'
                : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: activePage === 'inicio' ? '700' : '500',
              color:
                activePage === 'inicio'
                  ? isScrolled
                    ? COLORS.deep
                    : COLORS.white
                  : textColorSecondary,
            }}
          >
            Inicio
          </Text>
        </TouchableOpacity>

        {/* Nosotros con dropdown */}
        <View
          style={{ position: 'relative' }}
          {...(isWeb ? {
            onMouseEnter: () => setHoveredMenu('nosotros'),
            onMouseLeave: () => setHoveredMenu(null),
          } : {})}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingHorizontal: 13,
              paddingVertical: 7,
              borderRadius: 7,
              backgroundColor:
                hoveredMenu === 'nosotros' ? bgHover : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: hoveredMenu === 'nosotros' ? '700' : '500',
                color:
                  hoveredMenu === 'nosotros'
                    ? isScrolled
                      ? COLORS.deep
                      : COLORS.white
                    : textColorSecondary,
              }}
            >
              Nosotros
            </Text>
            <Text style={{ color: textColorSecondary, fontSize: 10 }}>▼</Text>
          </TouchableOpacity>

          {hoveredMenu === 'nosotros' && (
            <View
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: [{ translateX: -100 }],
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: COLORS.surface,
                borderRadius: SPACING.r,
                ...SHADOWS.sh3,
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: 8,
                minWidth: 200,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onNavigate('nosotros');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Visión y Valores
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('pastores');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Pastores
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('nosotros');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Historia
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('sedes');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Sedes
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Media con dropdown */}
        <View
          style={{ position: 'relative' }}
          {...(isWeb ? {
            onMouseEnter: () => setHoveredMenu('media'),
            onMouseLeave: () => setHoveredMenu(null),
          } : {})}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingHorizontal: 13,
              paddingVertical: 7,
              borderRadius: 7,
              backgroundColor:
                hoveredMenu === 'media' ? bgHover : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: hoveredMenu === 'media' ? '700' : '500',
                color:
                  hoveredMenu === 'media'
                    ? isScrolled
                      ? COLORS.deep
                      : COLORS.white
                    : textColorSecondary,
              }}
            >
              Media
            </Text>
            <Text style={{ color: textColorSecondary, fontSize: 10 }}>▼</Text>
          </TouchableOpacity>

          {hoveredMenu === 'media' && (
            <View
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: [{ translateX: -100 }],
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: COLORS.surface,
                borderRadius: SPACING.r,
                ...SHADOWS.sh3,
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: 8,
                minWidth: 200,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onNavigate('envivo');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  En Vivo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('predicas');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Prédicas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('biblioteca');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Biblioteca Sermones
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('devocional');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Devocional Diario
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Sedes (sin dropdown) */}
        <TouchableOpacity
          onPress={() => onNavigate('sedes')}
          style={{
            paddingHorizontal: 13,
            paddingVertical: 7,
            borderRadius: 7,
            backgroundColor:
              activePage === 'sedes'
                ? isScrolled
                  ? 'rgba(28,42,57,0.07)'
                  : 'rgba(255,255,255,0.12)'
                : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: activePage === 'sedes' ? '700' : '500',
              color:
                activePage === 'sedes'
                  ? isScrolled
                    ? COLORS.deep
                    : COLORS.white
                  : textColorSecondary,
            }}
          >
            Sedes
          </Text>
        </TouchableOpacity>

        {/* Comunidad con dropdown */}
        <View
          style={{ position: 'relative' }}
          {...(isWeb ? {
            onMouseEnter: () => setHoveredMenu('comunidad'),
            onMouseLeave: () => setHoveredMenu(null),
          } : {})}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingHorizontal: 13,
              paddingVertical: 7,
              borderRadius: 7,
              backgroundColor:
                hoveredMenu === 'comunidad' ? bgHover : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: hoveredMenu === 'comunidad' ? '700' : '500',
                color:
                  hoveredMenu === 'comunidad'
                    ? isScrolled
                      ? COLORS.deep
                      : COLORS.white
                    : textColorSecondary,
              }}
            >
              Comunidad
            </Text>
            <Text style={{ color: textColorSecondary, fontSize: 10 }}>▼</Text>
          </TouchableOpacity>

          {hoveredMenu === 'comunidad' && (
            <View
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: [{ translateX: -100 }],
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: COLORS.surface,
                borderRadius: SPACING.r,
                ...SHADOWS.sh3,
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: 8,
                minWidth: 200,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onNavigate('ministerios');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Ministerios
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('celulas');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Grupos / Células
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('oracion');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Oración
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('boletin');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Boletín
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('calendario');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Calendario
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('redes');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Redes Sociales
                </Text>
              </TouchableOpacity>
              <View style={{ borderTopWidth: 1, borderTopColor: COLORS.border, marginVertical: 4 }} />
              <TouchableOpacity
                onPress={() => {
                  onNavigate('contacto');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Contacto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onNavigate('privacidad');
                  setHoveredMenu(null);
                }}
                style={{ padding: 9, borderRadius: 8 }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Privacidad
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Right section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TouchableOpacity
          onPress={() => onNavigate('envivo')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: isScrolled
              ? 'rgba(214,69,69,0.08)'
              : 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            borderColor: isScrolled
              ? 'rgba(214,69,69,0.3)'
              : 'rgba(255,255,255,0.3)',
            borderRadius: 40,
            paddingHorizontal: 14,
            paddingVertical: 7,
          }}
        >
          <LiveDot />
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: isScrolled ? COLORS.error : COLORS.white,
            }}
          >
            EN VIVO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigate('donaciones')}
          style={{
            paddingVertical: 9,
            paddingHorizontal: 20,
            backgroundColor: COLORS.gold,
            borderRadius: SPACING.rSm,
          }}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 13, fontWeight: '700' }}
          >
            Donar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigate('nuevo')}
          style={{
            paddingVertical: 9,
            paddingHorizontal: 18,
            borderWidth: 2,
            borderColor: COLORS.gold,
            borderRadius: SPACING.rSm,
          }}
        >
          <Text
            style={{
              color: isInicio && !isScrolled ? COLORS.white : COLORS.gold,
              fontSize: 13,
              fontWeight: '700',
            }}
          >
            Soy Nuevo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarDesktop;
