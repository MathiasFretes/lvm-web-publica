import React, { useState } from 'react';
import { submitPublicForm } from '../utils/publicForms';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';

const Card = ({ children, onPress, style, padding = true }: any) => {
  const Component = onPress ? TouchableOpacity : View;
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

const BtnPrimary = ({
  label,
  onPress,
  full = false,
  small = false,
  style,
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        backgroundColor: COLORS.gold,
        paddingVertical: small ? 9 : 14,
        paddingHorizontal: small ? 18 : 26,
        borderRadius: SPACING.rSm,
        ...(full ? { width: '100%' } : {}),
        ...SHADOWS.sh1,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.white,
        fontSize: small ? 13 : 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const BtnChurch = ({ label, onPress, small = false, style }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      {
        borderWidth: 2,
        borderColor: COLORS.church,
        paddingVertical: small ? 8 : 13,
        paddingHorizontal: small ? 16 : 24,
        borderRadius: SPACING.rSm,
      },
      style,
    ]}
  >
    <Text
      style={{
        color: COLORS.church,
        fontSize: small ? 12 : 14,
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

interface DarkHeaderProps {
  label?: string;
  title: string;
  accent?: string;
  sub?: string;
  onBack: () => void;
}

const DarkHeader: React.FC<DarkHeaderProps> = ({ label, title, accent, sub, onBack }) => (
  <View
    style={{
      backgroundColor: COLORS.deep,
      paddingTop: isDesktop ? 110 : 80,
      paddingBottom: 44,
      paddingHorizontal: 24,
    }}
  >
    <TouchableOpacity
      onPress={onBack}
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
    </TouchableOpacity>
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
  </View>
);

const SecLabel = ({
  children,
  light = false,
  style,
}: {
  children: React.ReactNode;
  light?: boolean;
  style?: any;
}) => (
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

const SecTitle = ({
  children,
  accent,
  style,
}: {
  children: React.ReactNode;
  accent?: string;
  style?: any;
}) => (
  <Text
    style={[
      {
        fontFamily: TYPOGRAPHY.serif,
        fontSize: isDesktop ? 40 : 32,
        fontWeight: '700',
        color: COLORS.deep,
        lineHeight: isDesktop ? 44 : 36,
        marginBottom: 16,
      },
      style,
    ]}
  >
    {children}
    {accent ? <Text style={{ color: COLORS.church }}> {accent}</Text> : null}
  </Text>
);

const Toast = ({
  message,
  visible,
  onHide,
}: {
  message: string;
  visible: boolean;
  onHide: () => void;
}) => {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2800);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 90,
          right: 22,
          zIndex: 3000,
          backgroundColor: COLORS.deep,
          borderRadius: SPACING.r,
          padding: 13,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          maxWidth: 290,
          borderLeftWidth: 3,
          borderLeftColor: COLORS.gold,
        },
        SHADOWS.sh3,
      ]}
    >
      <Text style={{ color: COLORS.gold, fontSize: 16 }}>✓</Text>
      <Text style={{ color: COLORS.white, fontSize: 13 }}>{message}</Text>
    </View>
  );
};

const NuevoScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [fields,setFields] = useState({nombre:'',telefono:'',mensaje:''});
  const [sending,setSending] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="BIENVENIDA"
        title="Sos"
        accent="Nuevo Aquí"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 60 }}>
          <View style={{ flex: 1 }}>
            <SecLabel>BIENVENIDA</SecLabel>
            <SecTitle accent="Aquí">Sos Nuevo</SecTitle>
            <Text
              style={{
                fontSize: 15,
                color: COLORS.warmGray,
                lineHeight: 27,
                marginBottom: 28,
              }}
            >
              No importa tu historia. La Voz Misionera es un lugar donde todos
              son bienvenidos con amor genuino y sin condiciones.
            </Text>

            <View style={{ gap: 14 }}>
              {[1, 2, 3, 4].map((num) => (
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
                          : num === 3
                            ? 'Grupo de nuevos'
                            : 'Encuentra tu ministerio'}
                    </Text>
                    <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                      {num === 1
                        ? 'Domingos 09:00 o 18:00 hs. Llega 15 min antes y nuestro equipo te recibe.'
                        : num === 2
                          ? 'Busca las remeras amarillas. Recibirás información y un regalo especial.'
                          : num === 3
                            ? 'Curso de 4 semanas para conocer los valores y encontrar tu lugar.'
                            : 'Te ayudamos a descubrir tus dones y cómo contribuir a la familia.'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Card>
              <Text
                style={{
                  fontFamily: TYPOGRAPHY.serif,
                  fontSize: 28,
                  fontWeight: '700',
                  color: COLORS.deep,
                  marginBottom: 8,
                }}
              >
                Registra tu{' '}
                <Text style={{ color: COLORS.church }}>primera visita</Text>
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS.warmGray,
                  marginBottom: 22,
                }}
              >
                Sin compromisos. Solo amor y bienvenida.
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
                  Nombre completo
                </Text>
                <TextInput
                  placeholder="¿Cómo te llamas?"
                  value={fields.nombre} onChangeText={nombre=>setFields({...fields,nombre})}
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
                  value={fields.telefono} onChangeText={telefono=>setFields({...fields,telefono})}
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

              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: COLORS.deep,
                    marginBottom: 7,
                  }}
                >
                  Algo que quieras contarnos (opcional)
                </Text>
                <TextInput
                  placeholder="Preguntas, expectativas..."
                  value={fields.mensaje} onChangeText={mensaje=>setFields({...fields,mensaje})}
                  placeholderTextColor={COLORS.warmGray}
                  multiline
                  numberOfLines={3}
                  style={[
                    {
                      backgroundColor: COLORS.bg,
                      borderWidth: 1.5,
                      borderColor: COLORS.border,
                      borderRadius: SPACING.rSm,
                      padding: 12,
                      fontSize: 14,
                      color: COLORS.deep,
                      height: 80,
                      textAlignVertical: 'top',
                    },
                  ]}
                />
              </View>

              <BtnPrimary
                label="REGISTRAR MI VISITA"
                full
                onPress={async () => {
                  if(sending) return;
                  setSending(true);
                  try { await submitPublicForm('visita',fields); showToast('Solicitud de visita recibida.'); }
                  catch(error) { showToast(error instanceof Error ? error.message : 'No se pudo guardar tu solicitud.'); }
                  finally { setSending(false); }
                }}
              />
            </Card>

            <BtnChurch
              label="ESCRÍBENOS POR WHATSAPP"
              full
              onPress={() => showToast('Abriendo WhatsApp...')}
              style={{ marginTop: 12 }}
            />
          </View>
        </View>
      </View>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </ScrollView>
  );
};

export default NuevoScreen;
