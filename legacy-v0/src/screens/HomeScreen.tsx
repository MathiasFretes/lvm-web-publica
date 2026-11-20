/**
 * HomeScreen — La Voz Misionera
 *
 * Refactored: Extracted sections into modular components for better maintainability
 * Original: 2,287 lines → Target: ~400-500 lines (orchestrator pattern)
 */

import React, { useState, useRef, useCallback } from 'react';
import { submitPublicForm } from '../utils/publicForms';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useMinisterios,
  useEventos,
  usePredicas,
  useContenidoHome,
  useContenidoNosotros,
  useTestimoniosAprobados,
  useRedes,
  useServiceTimes,
  useStats,
} from '../useFirestore';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop, isWeb } from '../constants/platform';
import { PageId } from '../types/pages';
import Toast from '../components/Toast';
import VideoModal from '../components/VideoModal';
import FadeIn from '../components/FadeIn';
import SecLabel from '../components/SecLabel';
import SecTitle from '../components/SecTitle';
import SecSub from '../components/SecSub';
import Card from '../components/Card';
import BtnPrimary from '../components/BtnPrimary';
import BtnChurch from '../components/BtnChurch';
import { VerseBlock } from '../components/VerseBlock';

// Extracted Section Components
import {
  HeroSection,
  StatsSection,
  PredicasSection,
  EventosSection,
  TestimoniosSection,
  FooterSection,
} from './home';

interface HomeScreenProps {
  onNavigate: (page: PageId) => void;
  onSecretTap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSecretTap,
}) => {
  // ─── Firestore Hooks ─────────────────────────────────────
  const { ministerios, loading: ministeriosLoading } = useMinisterios();
  const { eventos, loading: eventosLoading } = useEventos();
  const { predicas, loading: predicasLoading } = usePredicas();
  const { contenido: contenidoHome, loading: contenidoHomeLoading } =
    useContenidoHome();
  const { contenido: contenidoNosotros, loading: nosotrosLoading } =
    useContenidoNosotros();
  const { testimonios: testimoniosAprobados, loading: testimoniosLoading } = useTestimoniosAprobados();
  const { redes, loading: redesLoading } = useRedes();
  const { serviceTimes, loading: serviceTimesLoading } = useServiceTimes();
  const { stats, loading: statsLoading } = useStats();

  // ─── Local State ──────────────────────────────────────────
  const [toastVisible, setToastVisible] = useState(false);
  const [visit,setVisit] = useState({nombre:'',telefono:''});
  const [newsletterEmail,setNewsletterEmail] = useState('');
  const [sending,setSending] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSub, setModalSub] = useState('');
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  // ─── Helpers ──────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const showModal = (title: string, sub: string, url?: string | null) => {
    setModalTitle(title);
    setModalSub(sub);
    setModalUrl(url || null);
    setModalVisible(true);
  };

  // Helper function to get day name in Spanish
  const getDayName = (date: Date): string => {
    const days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    return days[date.getDay()];
  };

  // Helper function to check if service is today
  const isServiceToday = (serviceDay: string): boolean => {
    const today = new Date();
    const todayName = getDayName(today);

    if (serviceDay === todayName) {
      return true;
    }

    if (serviceDay === 'VIERNES' && serviceDay === todayName) {
      const weekOfMonth = Math.floor((today.getDate() - 1) / 7) + 1;
      return weekOfMonth === 2 || weekOfMonth === 4;
    }

    return false;
  };

  // Helper function to get recurrence text
  const getRecurrenceText = (service: any): string => {
    if (!service.recurrence) return 'Semanal';

    switch (service.recurrence.type) {
      case 'weekly':
        return 'Semanal';
      case 'biweekly':
        return `2do y 4to ${service.day.toLowerCase()} del mes`;
      case 'monthly':
        return `Cada ${service.recurrence.weekOfMonth}° ${service.day.toLowerCase()} del mes`;
      default:
        return 'Semanal';
    }
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* HERO SLIDER */}
      <HeroSection onNavigate={onNavigate} />

      {/* SERVICE TIMES */}
      <FadeIn delay={100}>
        <View
          style={{
            backgroundColor: COLORS.surface,
            marginHorizontal: 20,
            marginTop: -22,
            borderRadius: SPACING.r,
            padding: 24,
            ...SHADOWS.sh2,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <View>
              <SecLabel>CUÁNDO VENIR</SecLabel>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 26,
                  fontWeight: '700',
                  color: COLORS.deep,
                }}
              >
                Servicios semanales
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <BtnChurch
                label="CÓMO LLEGAR"
                small
                onPress={() => showToast('Abriendo Google Maps...')}
              />
              <BtnPrimary
                label="VER EN VIVO"
                small
                onPress={() => onNavigate('envivo')}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
            }}
          >
            {serviceTimesLoading ? (
              <View style={{ padding: 40, alignItems: 'center', width: '100%' }}>
                <ActivityIndicator size="large" color={COLORS.gold} />
                <Text style={{ marginTop: 12, color: COLORS.warmGray, fontSize: 14 }}>
                  Cargando horarios de servicio...
                </Text>
              </View>
            ) : serviceTimes.length === 0 ? (
              <View style={{ padding: 40, alignItems: 'center', width: '100%' }}>
                <Text style={{ color: COLORS.error, fontSize: 14, fontWeight: '600' }}>
                  Próximamente publicaremos nuestros horarios
                </Text>
                <Text style={{ color: COLORS.warmGray, fontSize: 12, marginTop: 8, textAlign: 'center' }}>
                  Podrás consultar aquí los próximos encuentros de la comunidad.
                </Text>
              </View>
            ) : (
              serviceTimes
                .filter(service => service.isActive !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item, index) => {
                const isToday = isServiceToday(item.day);
                return (
                  <View
                    key={index}
                    style={{
                      width: isDesktop ? 180 : 160,
                      backgroundColor: isToday ? COLORS.gold + '15' : COLORS.surface,
                      borderWidth: 1,
                      borderColor: isToday ? COLORS.gold + '40' : COLORS.border,
                      borderRadius: SPACING.r,
                      padding: 16,
                      alignItems: 'center',
                      ...SHADOWS.sh1,
                    }}
                  >
                    {isToday && (
                      <View
                        style={{
                          position: 'absolute',
                          top: -8,
                          backgroundColor: COLORS.gold,
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          borderRadius: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '700',
                            color: COLORS.white,
                            letterSpacing: 1,
                          }}
                        >
                          HOY
                        </Text>
                      </View>
                    )}
                    <Text
                      style={{
                        fontSize: 10,
                        letterSpacing: 2,
                        color: isToday ? COLORS.gold : COLORS.warmGray,
                        fontWeight: '700',
                        marginBottom: 8,
                      }}
                    >
                      {item.day}
                    </Text>
                    <Text
                      style={{
                        fontFamily: TYPOGRAPHY.serif,
                        fontSize: 28,
                        fontWeight: '700',
                        color: COLORS.deep,
                        lineHeight: 32,
                        textAlign: 'center',
                      }}
                    >
                      {item.time}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: COLORS.deep,
                        marginTop: 4,
                        textAlign: 'center',
                      }}
                    >
                      {item.name}
                    </Text>
                    {item.description && (
                      <Text
                        style={{
                          fontSize: 11,
                          color: COLORS.warmGray,
                          marginTop: 6,
                          textAlign: 'center',
                          lineHeight: 14,
                        }}
                      >
                        {item.description}
                      </Text>
                    )}
                    <View
                      style={{
                        marginTop: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor: COLORS.bg,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 9,
                          color: COLORS.gold,
                          fontWeight: '600',
                        }}
                      >
                        {getRecurrenceText(item)}
                      </Text>
                    </View>
                  </View>
                );
               })
            )}
           </View>
        </View>
      </FadeIn>

      {/* STATS — Extracted */}
      <StatsSection stats={stats} />

      {/* VISIÓN */}
      <View
        style={{
          backgroundColor: COLORS.surface,
          paddingHorizontal: 24,
          paddingVertical: 60,
        }}
      >
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 60,
            maxWidth: SPACING.max,
            alignSelf: 'center',
          }}
        >
          <FadeIn delay={100} style={{ flex: 1 }}>
            <View
              style={{
                height: 460,
                borderRadius: 20,
                backgroundColor: COLORS.deep,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 90,
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    width: 3,
                    height: 90,
                    backgroundColor: 'rgba(198,161,91,0.25)',
                    left: 43,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: 90,
                    height: 3,
                    backgroundColor: 'rgba(198,161,91,0.25)',
                    top: 43,
                  }}
                />
              </View>
            </View>
          </FadeIn>

          <FadeIn delay={200} style={{ flex: 1 }}>
            <SecLabel>NUESTRA MISIÓN</SecLabel>
            <SecTitle accent="Dios">
              Existimos para ayudar a las personas a conocer a
            </SecTitle>
            <VerseBlock
              verse='"Porque yo sé los planes que tengo para vosotros... planes de bienestar y no de mal."'
              reference="Jeremías 29:11"
            />
            <SecSub style={{ marginBottom: 28 }}>
              Creemos que cada persona tiene un propósito eterno. Nuestra
              comunidad existe para que puedas crecer en fe, encontrar tu lugar
              y vivir la vida que Dios soñó para ti.
            </SecSub>
            <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
              <BtnPrimary
                label="CONOCE NUESTRA HISTORIA"
                onPress={() => onNavigate('nosotros')}
              />
              <BtnChurch
                label="NUESTROS PASTORES"
                onPress={() => onNavigate('pastores')}
              />
            </View>
          </FadeIn>
        </View>
      </View>

      {/* DEVOCIONAL PREVIEW */}
      <View
        style={{
          backgroundColor: COLORS.bg,
          paddingHorizontal: 24,
          paddingVertical: 60,
        }}
      >
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 64,
            maxWidth: SPACING.max,
            alignSelf: 'center',
          }}
        >
          <FadeIn delay={100} style={{ flex: 1 }}>
            <SecLabel>DEVOCIONAL DE HOY</SecLabel>
            <Text style={{ fontSize: 12, color: COLORS.warmGray, marginBottom: 14 }}>
              Para reflexionar
            </Text>
            <Text
              style={{
                fontFamily: TYPOGRAPHY.serif,
                fontSize: isDesktop ? 28 : 24,
                fontStyle: 'italic',
                color: COLORS.deep,
                lineHeight: isDesktop ? 40 : 36,
                borderLeftWidth: 3,
                borderLeftColor: COLORS.gold,
                paddingLeft: 24,
                marginBottom: 8,
              }}
            >
              "Toda la Escritura es inspirada por Dios y útil para enseñanza..."
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.gold,
                letterSpacing: 1,
                fontWeight: '700',
                paddingLeft: 24,
                marginBottom: 24,
              }}
            >
              2 Timoteo 3:16-17
            </Text>
            <SecSub style={{ marginBottom: 24 }}>
              La Palabra de Dios es el ancla de nuestra fe. Hoy te invitamos a
              sumergirte en su verdad y dejar que ella transforme tu perspectiva
              del día.
            </SecSub>
            <BtnPrimary
              label="LEER DEVOCIONAL COMPLETO"
              onPress={() => onNavigate('devocional')}
            />
          </FadeIn>

          <FadeIn delay={200} style={{ flex: 1 }}>
            <Card>
              <SecLabel>REFLEXIÓN</SecLabel>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 26,
                  fontWeight: '700',
                  color: COLORS.deep,
                  marginBottom: 14,
                }}
              >
                Firmeza en la{' '}
                <Text style={{ color: COLORS.church }}>Palabra</Text>
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.warmGray,
                  lineHeight: 25,
                  marginBottom: 16,
                }}
              >
                Cuando la vida se tambalea, la Escritura nos recuerda que Dios
                no cambia. Cada promesa en Su Palabra es un cimiento sólido
                donde construir nuestros días.
              </Text>
              <View
                style={{
                  backgroundColor: 'rgba(198,161,91,0.08)',
                  borderLeftWidth: 3,
                  borderLeftColor: COLORS.gold,
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.gold,
                    fontWeight: '600',
                    marginBottom: 6,
                  }}
                >
                  APLICACIÓN
                </Text>
                <Text style={{ fontSize: 13, color: COLORS.text, lineHeight: 22 }}>
                  Elige un versículo hoy y medita en él. Escribe cómo cambia tu
                  perspectiva al terminar el día.
                </Text>
              </View>
            </Card>
          </FadeIn>
        </View>
      </View>

      {/* MINISTERIOS */}
      <View
        style={{
          backgroundColor: COLORS.surface,
          paddingHorizontal: 24,
          paddingVertical: 60,
        }}
      >
        <SecLabel>COMUNIDAD</SecLabel>
        <SecTitle accent="el ministry">Encuentra tu lugar en</SecTitle>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 18,
            marginTop: 48,
          }}
        >
          {ministeriosLoading ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <ActivityIndicator size="large" color={COLORS.gold} />
            </View>
          ) : (
            ministerios.map((item, index) => (
              <TouchableOpacity
                key={item.id || index}
                onPress={() => onNavigate('ministerios')}
                style={{
                  flex: 1,
                  minWidth: isDesktop ? 220 : '100%',
                  backgroundColor: COLORS.surface,
                  borderRadius: SPACING.r,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  padding: 28,
                  ...SHADOWS.sh1,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: 'rgba(62,107,165,0.08)',
                    borderWidth: 1,
                    borderColor: 'rgba(62,107,165,0.15)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.church,
                      fontWeight: '600',
                    }}
                  >
                    {item.emoji || item.name.charAt(0)}
                  </Text>
                </View>
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
                  style={{
                    fontSize: 13,
                    color: COLORS.warmGray,
                    lineHeight: 21,
                  }}
                >
                  {item.desc}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={{ marginTop: 28 }}>
          <BtnChurch
            label="VER TODOS LOS MINISTERIOS"
            onPress={() => onNavigate('ministerios')}
          />
        </View>
      </View>

      {/* PRÉDICAS — Extracted */}
      <PredicasSection
        predicas={predicas}
        loading={predicasLoading}
        onNavigate={onNavigate}
        showModal={showModal}
      />

      {/* EVENTOS — Extracted */}
      <EventosSection
        eventos={eventos}
        loading={eventosLoading}
        onNavigate={onNavigate}
        showToast={showToast}
      />

      {/* NUEVO AQUÍ */}
      <View
        style={{
          backgroundColor: COLORS.bg,
          paddingHorizontal: 24,
          paddingVertical: 60,
        }}
      >
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 64,
            maxWidth: SPACING.max,
            alignSelf: 'center',
          }}
        >
          <FadeIn delay={100} style={{ flex: 1 }}>
            <SecLabel>PRIMERA VEZ AQUÍ</SecLabel>
            <SecTitle accent="La Voz Misionera">¿Es tu primera vez en</SecTitle>
            <SecSub style={{ marginBottom: 24 }}>
              No importa de dónde vengas ni qué hayas vivido. Esta es una
              comunidad de puertas abiertas donde encontrarás amor genuino.
            </SecSub>

            <View style={{ gap: 14 }}>
              {[1, 2, 3].map((num) => (
                <View
                  key={num}
                  style={{
                    flexDirection: 'row',
                    gap: 16,
                    backgroundColor: COLORS.surface,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.r,
                    padding: 18,
                    ...SHADOWS.sh1,
                  }}
                >
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 17,
                      backgroundColor: COLORS.gold,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: '700',
                        fontSize: 14,
                      }}
                    >
                      {num}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: COLORS.deep,
                        marginBottom: 4,
                      }}
                    >
                      {num === 1
                        ? 'Llega temprano'
                        : num === 2
                          ? 'Punto de bienvenida'
                          : 'Grupo de nuevos'}
                    </Text>
                    <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                      {num === 1
                        ? 'Domingos 09:00 o 18:00 hs. Llega 15 min antes y nuestro equipo te recibe.'
                        : num === 2
                          ? 'Busca las remeras amarillas. Recibirás información y un regalo especial.'
                          : 'Curso de 4 semanas para conocer los valores y encontrar tu lugar.'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 22 }}>
              <BtnPrimary
                label="PLANIFICAR MI VISITA"
                onPress={() => onNavigate('nuevo')}
              />
              <BtnChurch
                label="HABLAR CON UN PASTOR"
                onPress={() => showToast('Abriendo WhatsApp...')}
              />
            </View>
          </FadeIn>

          <FadeIn delay={200} style={{ flex: 1 }}>
            <Card>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 26,
                  fontWeight: '700',
                  color: COLORS.deep,
                  marginBottom: 6,
                }}
              >
                Registra tu{' '}
                <Text style={{ color: COLORS.church }}>primera visita</Text>
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.warmGray,
                  marginBottom: 20,
                }}
              >
                Sin compromisos. Solo queremos recibirte bien.
              </Text>

              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: COLORS.deep,
                    marginBottom: 7,
                  }}
                >
                  Tu nombre
                </Text>
                <TextInput
                  placeholder="¿Cómo te llamas?"
                  value={visit.nombre} onChangeText={nombre=>setVisit({...visit,nombre})}
                  placeholderTextColor={COLORS.warmGray}
                  style={{
                    backgroundColor: COLORS.bg,
                    borderWidth: 1.5,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.rSm,
                    padding: 12,
                    fontSize: 14,
                    color: COLORS.deep,
                  }}
                />
              </View>

              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: COLORS.deep,
                    marginBottom: 7,
                  }}
                >
                  WhatsApp
                </Text>
                <TextInput
                  placeholder="+595 9xx xxx xxx"
                  value={visit.telefono} onChangeText={telefono=>setVisit({...visit,telefono})}
                  placeholderTextColor={COLORS.warmGray}
                  style={{
                    backgroundColor: COLORS.bg,
                    borderWidth: 1.5,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.rSm,
                    padding: 12,
                    fontSize: 14,
                    color: COLORS.deep,
                  }}
                />
              </View>

              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: COLORS.deep,
                    marginBottom: 7,
                  }}
                >
                  Servicio preferido
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.bg,
                    borderWidth: 1.5,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.rSm,
                    padding: 12,
                  }}
                >
                  <Text style={{ fontSize: 14, color: COLORS.warmGray }}>
                    Domingo 09:00 hs
                  </Text>
                </View>
              </View>

              <BtnPrimary
                label="REGISTRAR MI VISITA"
                full
                onPress={async () => {
                  if(sending) return;
                  setSending(true);
                  try { await submitPublicForm('visita',visit); showToast('Solicitud de visita recibida.'); }
                  catch(error) { showToast(error instanceof Error ? error.message : 'No se pudo guardar tu solicitud.'); }
                  finally { setSending(false); }
                }}
              />
            </Card>
          </FadeIn>
        </View>
      </View>

      {/* TESTIMONIOS — Extracted */}
      <TestimoniosSection
        testimonios={testimoniosAprobados}
        loading={testimoniosLoading}
      />

      {/* DONACIONES */}
      <View
        style={{
          backgroundColor: COLORS.bg,
          paddingHorizontal: 24,
          paddingVertical: 60,
        }}
      >
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 60,
            maxWidth: SPACING.max,
            alignSelf: 'center',
          }}
        >
          <FadeIn delay={100} style={{ flex: 1 }}>
            <SecLabel>GENEROSIDAD</SecLabel>
            <SecTitle accent="propósito">Dar con</SecTitle>
            <SecSub style={{ marginBottom: 28 }}>
              Tu ofrenda es un acto de adoración. Cada aporte hace posible
              continuar predicando el Evangelio y bendiciendo familias en
              Paraguay.
            </SecSub>

            <SecLabel style={{ marginTop: 0 }}>MONTO RÁPIDO</SecLabel>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 16,
              }}
            >
              {['Gs 50.000', 'Gs 100.000', 'Gs 200.000', 'Otro'].map(
                (amt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderWidth: 1.5,
                      borderColor: index === 1 ? COLORS.gold : COLORS.border,
                      borderRadius: SPACING.rSm,
                      backgroundColor:
                        index === 1 ? COLORS.gold : COLORS.surface,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: index === 1 ? '700' : '500',
                        color: index === 1 ? COLORS.white : COLORS.warmGray,
                      }}
                    >
                      {amt}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: COLORS.deep,
                  marginBottom: 7,
                }}
              >
                Propósito
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.bg,
                  borderWidth: 1.5,
                  borderColor: COLORS.border,
                  borderRadius: SPACING.rSm,
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 14, color: COLORS.warmGray }}>
                  Diezmo general
                </Text>
              </View>
            </View>

            <BtnPrimary
              label="DONAR AHORA"
              full
              onPress={() =>
                onNavigate('donaciones')
              }
            />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 12,
              }}
            >
              {['Tarjeta', 'Transferencia', 'Tigo Money', 'QR'].map(
                (met, index) => (
                  <View
                    key={index}
                    style={{
                      paddingVertical: 7,
                      paddingHorizontal: 14,
                      backgroundColor: COLORS.bg,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ fontSize: 11, color: COLORS.warmGray }}>
                      {met}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </FadeIn>

          <FadeIn delay={200} style={{ flex: 1 }}>
            <SecLabel>DATOS BANCARIOS</SecLabel>
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Razón Social
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  La Voz Misionera Church Py
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  RUC
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Banco
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Cuenta Gs
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Cuenta USD
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
            </Card>

            <Card style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Tigo Money
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 9,
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                  Personal Pay
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: COLORS.deep,
                  }}
                >
                  Pendiente de publicación
                </Text>
              </View>
            </Card>

            <Text
              style={{
                fontSize: 12,
                color: COLORS.warmGray,
                marginTop: 12,
                lineHeight: 19,
              }}
            >
              Los medios de donación estarán disponibles cuando la iglesia publique sus datos.

            </Text>
          </FadeIn>
        </View>
      </View>

      {/* REDES + BOLETÍN */}
      <View
        style={{
          backgroundColor: COLORS.surface,
          paddingHorizontal: 24,
          paddingVertical: 60,
        }}
      >
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            gap: 64,
            maxWidth: SPACING.max,
            alignSelf: 'center',
          }}
        >
          <FadeIn delay={100} style={{ flex: 1 }}>
            <SecLabel>CONÉCTATE</SecLabel>
            <SecTitle accent="redes" style={{ fontSize: isDesktop ? 42 : 32 }}>
              Síguenos en
            </SecTitle>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 28,
              }}
            >
               {redesLoading ? (
                 <View style={{ padding: 20, alignItems: 'center' }}>
                   <ActivityIndicator size="small" color={COLORS.gold} />
                 </View>
               ) : redes.length === 0 ? (
                 <View style={{ padding: 20, alignItems: 'center' }}>
                   <Text style={{ color: COLORS.warmGray, fontSize: 12 }}>
                     No hay redes sociales configuradas
                   </Text>
                 </View>
                 ) : (
                   redes.slice(0, 4).map((item) => (
                   <TouchableOpacity
                  key={item.id}
                  onPress={() => showToast(item.name)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    minWidth: 170,
                    backgroundColor: COLORS.surface,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.r,
                    padding: 14,
                    ...SHADOWS.sh1,
                  }}
                >
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      backgroundColor: item.color,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 16,
                        fontWeight: '700',
                      }}
                    >
                      {item.name.charAt(0)}
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
                      {item.name}
                    </Text>
                     <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                       {item.handle}
                     </Text>
                   </View>
                 </TouchableOpacity>
               )))}
             </View>
          </FadeIn>

          <FadeIn delay={200} style={{ flex: 1, justifyContent: 'center' }}>
            <Card style={{ alignItems: 'center', padding: 40 }}>
              <SecLabel style={{ textAlign: 'center' }}>
                BOLETÍN SEMANAL
              </SecLabel>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 30,
                  fontWeight: '700',
                  color: COLORS.deep,
                  textAlign: 'center',
                  marginVertical: 10,
                }}
              >
                Recibe noticias{'\n'}de la{' '}
                <Text style={{ color: COLORS.church }}>iglesia</Text>
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.warmGray,
                  textAlign: 'center',
                  marginBottom: 24,
                }}
              >
                Prédicas, eventos y devocionales. Sin spam.
              </Text>

              <View
                style={{
                  flexDirection: isDesktop ? 'row' : 'column',
                  gap: 10,
                  width: '100%',
                  maxWidth: 420,
                }}
              >
                <TextInput
                  placeholder="Tu correo electrónico"
                  value={newsletterEmail} onChangeText={setNewsletterEmail}
                  placeholderTextColor={COLORS.warmGray}
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.bg,
                    borderWidth: 1.5,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.rSm,
                    padding: 12,
                    fontSize: 14,
                    color: COLORS.deep,
                  }}
                />
                <BtnPrimary
                  label="SUSCRIBIRME"
                  small
                  onPress={async () => {
                    if(sending) return;
                    setSending(true);
                    try { await submitPublicForm('boletin',{email:newsletterEmail}); showToast('Solicitud de suscripción recibida.'); }
                    catch(error) { showToast(error instanceof Error ? error.message : 'No se pudo guardar tu solicitud.'); }
                    finally { setSending(false); }
                  }}
                />
              </View>
            </Card>
          </FadeIn>
        </View>
      </View>

      {/* FOOTER — Extracted */}
      <FooterSection onNavigate={onNavigate} />

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
      <VideoModal
        visible={modalVisible}
        title={modalTitle}
        subtitle={modalSub}
          url={modalUrl}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default HomeScreen;
