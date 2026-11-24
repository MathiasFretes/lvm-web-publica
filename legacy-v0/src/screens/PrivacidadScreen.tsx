import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';

interface PrivacidadScreenProps {
  onBack: () => void;
}

export default function PrivacidadScreen({ onBack }: PrivacidadScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.date}>Última actualización: Abril 2026</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Recopilación de Información</Text>
          <Text style={styles.text}>
            La Voz Misionera recopila información personal únicamente cuando
            usted la proporciona voluntariamente a través de formularios de
            contacto, suscripción al boletín o registro para eventos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Uso de la Información</Text>
          <Text style={styles.text}>
            Utilizamos su información para: enviar boletines, communicate sobre
            eventos, responder consultas, y mejorar nuestros servicios.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Protección de Datos</Text>
          <Text style={styles.text}>
            Implementamos medidas de seguridad para proteger su información
            personal contra accesos no autorizados, modificación o destrucción.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Cookies y Tecnologías Similares</Text>
          <Text style={styles.text}>
            Nuestro sitio utiliza cookies para mejorar la experiencia del usuario
            y analizar el tráfico del sitio. Puede desactivar las cookies en su
            navegador.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Contacto</Text>
          <Text style={styles.text}>
            Para ejercer sus derechos de acceso, rectificación o supresión de
            datos, contactenos a: admin@lavozmisionera.org
          </Text>
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
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.deep,
    fontFamily: TYPOGRAPHY.serif,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: COLORS.warmGray,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: SPACING.sm,
  },
  text: {
    fontSize: 15,
    color: COLORS.warmGray,
    lineHeight: 24,
  },
});