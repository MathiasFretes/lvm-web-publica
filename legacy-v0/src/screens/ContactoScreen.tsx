import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { submitPublicForm } from '../utils/publicForms';

interface ContactoScreenProps {
  onBack: () => void;
}

export default function ContactoScreen({ onBack }: ContactoScreenProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      setFeedback('Por favor complete todos los campos');
      return;
    }
    if (!email.includes('@')) {
      setFeedback('Por favor ingrese un email válido');
      return;
    }

    setEnviando(true);
    try {
      await submitPublicForm('contacto', {nombre,email,mensaje});
      setFeedback('Mensaje recibido. Gracias por contactarnos.');
      setNombre('');
      setEmail('');
      setMensaje('');
    } catch(error) { setFeedback(error instanceof Error ? error.message : 'No se pudo guardar el mensaje.'); }
    finally { setEnviando(false); }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Contacto</Text>
        <Text style={styles.subtitle}>
          ¿Tienes alguna pregunta o necesitas más información? ¡Escríbenos!
        </Text>

        <View style={styles.form}>
          {feedback ? <Text accessibilityRole="alert">{feedback}</Text> : null}
          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Tu nombre completo"
              placeholderTextColor={COLORS.warmGray}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              placeholderTextColor={COLORS.warmGray}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mensaje</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={mensaje}
              onChangeText={setMensaje}
              placeholder="¿En qué podemos ayudarte?"
              placeholderTextColor={COLORS.warmGray}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, enviando && styles.buttonDisabled]}
            onPress={handleSubmit}
            accessibilityRole="button"
            disabled={enviando}
          >
            <Text style={styles.buttonText}>
              {enviando ? 'Enviando...' : 'Enviar Mensaje'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>Otras formas de contacto</Text>
          <Text style={styles.infoText}>📧 admin@lavozmisionera.org</Text>
          <Text style={styles.infoText}>📞 +595 981 123 456</Text>
          <Text style={styles.infoText}>📍 Calle Principal, Ciudad del Este, Paraguay</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: SPACING.lg,
    maxWidth: 600,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.deep,
    fontFamily: TYPOGRAPHY.serif,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.warmGray,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  form: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 12,
    ...SHADOWS.sh1,
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.deep,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.deep,
  },
  textarea: {
    minHeight: 120,
    paddingTop: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.sm,
    ...SHADOWS.sh2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    marginTop: SPACING.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    ...SHADOWS.sh1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.deep,
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.warmGray,
    marginBottom: SPACING.sm,
  },
});
