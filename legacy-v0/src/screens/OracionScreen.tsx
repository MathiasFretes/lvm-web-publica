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

const OracionScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fields,setFields] = useState({nombre:'',apellido:'',email:'',mensaje:''});
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
        label="INTERCESIÓN"
        title="Pedido de"
        accent="Oración"
        sub="No tienes que atravesar las cargas de la vida solo. Nuestro equipo orará por vos en las próximas 24 horas."
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        {!submitted ? (
          <Card>
            <View
              style={{
                flexDirection: isDesktop ? 'row' : 'column',
                gap: 14,
                marginBottom: 18,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: COLORS.deep,
                    marginBottom: 7,
                  }}
                >
                  Nombre
                </Text>
                <TextInput
                  placeholder="Tu nombre"
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
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: COLORS.deep,
                    marginBottom: 7,
                  }}
                >
                  Apellido
                </Text>
                <TextInput
                  placeholder="Tu apellido"
                  value={fields.apellido} onChangeText={apellido=>setFields({...fields,apellido})}
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
                Correo electrónico
              </Text>
              <TextInput
                placeholder="correo@ejemplo.com"
                value={fields.email} onChangeText={email=>setFields({...fields,email})}
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
                Tipo de petición
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
                  Salud y sanidad
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
                Tu petición de oración
              </Text>
              <TextInput
                placeholder="Cuéntanos lo que está en tu corazón. Todo es confidencial..."
                value={fields.mensaje} onChangeText={mensaje=>setFields({...fields,mensaje})}
                placeholderTextColor={COLORS.warmGray}
                multiline
                numberOfLines={5}
                style={[
                  {
                    backgroundColor: COLORS.bg,
                    borderWidth: 1.5,
                    borderColor: COLORS.border,
                    borderRadius: SPACING.rSm,
                    padding: 12,
                    fontSize: 14,
                    color: COLORS.deep,
                    height: 120,
                    textAlignVertical: 'top',
                  },
                ]}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 18 }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: COLORS.border,
                }}
              />
              <Text style={{ fontSize: 13, color: COLORS.warmGray, flex: 1 }}>
                Entiendo que mi petición será tratada con confidencialidad
                pastoral
              </Text>
            </View>

            <BtnPrimary
              label="ENVIAR PETICIÓN DE ORACIÓN"
              full
              onPress={async () => {
                if(sending) return;
                setSending(true);
                try { await submitPublicForm('oracion',fields); setSubmitted(true); showToast('Petición recibida. Dios te bendiga.'); }
                catch(error) { showToast(error instanceof Error ? error.message : 'No se pudo guardar tu petición.'); }
                finally { setSending(false); }
              }}
            />
          </Card>
        ) : (
          <Card style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ fontSize: 50, marginBottom: 16 }}>✓</Text>
            <Text
              style={{
                fontFamily: TYPOGRAPHY.serif,
                fontSize: 30,
                fontWeight: '700',
                color: COLORS.deep,
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              Petición <Text style={{ color: COLORS.church }}>recibida</Text>
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.warmGray,
                textAlign: 'center',
              }}
            >
              Nuestro equipo orará por vos hoy. Dios te bendiga.
            </Text>
          </Card>
        )}
      </View>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </ScrollView>
  );
};

export default OracionScreen;
