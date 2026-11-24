import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/design';
import { DarkHeader } from '../components/DarkHeader';
import BtnPrimary from '../components/BtnPrimary';
import BtnChurch from '../components/BtnChurch';
import Toast from '../components/Toast';
import { useContenidoGeneral } from '../useFirestore';

export default function DevocionalScreen({ onBack }: { onBack: () => void }) {
  const { contenido, loading, error } = useContenidoGeneral();
  const [message, setMessage] = useState('');
  const date = contenido?.devocionalFecha;
  const formattedDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T12:00:00`).toLocaleDateString('es', { dateStyle: 'long' }) : date;
  async function share() {
    if (!contenido) return;
    const title = contenido.devocionalTitulo;
    const text = [title, contenido.versiculoDia, contenido.versiculoRef, contenido.devocionalTexto].filter(Boolean).join('\n\n');
    try {
      if (navigator.share) await navigator.share({ title, text, url: window.location.href });
      else { await navigator.clipboard.writeText(`${text}\n\n${window.location.href}`); setMessage('Devocional copiado para compartir.'); }
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) setMessage('No pudimos compartir el devocional.');
    }
  }
  return <ScrollView nativeID="public-devotional" style={{ backgroundColor: COLORS.bg }}>
    <DarkHeader label="DEVOCIONAL" title={contenido?.devocionalTitulo || 'Devocional'} onBack={onBack} />
    <View style={{ padding: 24, maxWidth: 1000, width: '100%', alignSelf: 'center', gap: 24 }}>
      {loading ? <Text accessibilityRole="text">Cargando devocional…</Text> : error ? <View><Text accessibilityRole="alert">No pudimos cargar el devocional.</Text><BtnChurch label="REINTENTAR" onPress={() => window.location.reload()} /></View> : !contenido ? <Text style={{ color: COLORS.warmGray }}>Todavía no hay un devocional publicado.</Text> : <>
        <Text style={{ color: COLORS.warmGray }}>{formattedDate}</Text>
        <View style={{ borderLeftWidth: 3, borderLeftColor: COLORS.gold, paddingLeft: 24, gap: 12 }}>
          <Text style={{ fontFamily: TYPOGRAPHY.serif, fontSize: 24, lineHeight: 36, color: COLORS.deep }}>{contenido.versiculoDia}</Text>
          <Text style={{ color: COLORS.church, fontWeight: '700' }}>{contenido.versiculoRef}</Text>
        </View>
        <Text style={{ fontSize: 16, lineHeight: 28, color: COLORS.text }}>{contenido.devocionalTexto}</Text>
        {contenido.devocionalAplicacion ? <View style={{ padding: 24, backgroundColor: COLORS.surface, gap: 12 }}><Text style={{ fontWeight: '700', color: COLORS.deep }}>Aplicación personal</Text><Text style={{ fontSize: 16, lineHeight: 28, color: COLORS.text }}>{contenido.devocionalAplicacion}</Text></View> : null}
        {contenido.devocionalOracion ? <Text style={{ fontStyle: 'italic', lineHeight: 28, color: COLORS.text }}>{contenido.devocionalOracion}</Text> : null}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <BtnPrimary label="IMPRIMIR / GUARDAR PDF" onPress={() => window.print()} />
          <BtnChurch label="COMPARTIR" onPress={() => void share()} />
        </View>
      </>}
    </View>
    <Toast message={message} visible={!!message} onHide={() => setMessage('')} />
  </ScrollView>;
}
