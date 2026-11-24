import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { DarkHeader } from '../components/DarkHeader';
import Toast from '../components/Toast';
import { useContenidoHome, useRadios, useRedes } from '../useFirestore';
import { safeWebUrl } from '../utils/safeWebUrl';

export default function EnVivoScreen({ onBack }: { onBack: () => void }) {
  const { contenido, loading, error } = useContenidoHome();
  const { radios } = useRadios();
  const { redes } = useRedes();
  const [message, setMessage] = useState('');
  const url = contenido?.isLive ? safeWebUrl(contenido.liveVideoUrl) : null;
  const links = [...redes, ...radios].filter(item => safeWebUrl(item.url));
  const open = (value: string) => { void Linking.openURL(value).catch(() => setMessage('No pudimos abrir el enlace publicado.')); };
  return <ScrollView style={{ backgroundColor: COLORS.bg }}>
    <DarkHeader label="TRANSMISIÓN" title="En" accent="Vivo" onBack={onBack} />
    <View style={{ padding: 24, gap: 24 }}>
      {error ? <View><Text accessibilityRole="alert">No pudimos cargar la transmisión.</Text><TouchableOpacity accessibilityRole="button" onPress={() => window.location.reload()} style={{ padding: 16 }}><Text>Reintentar</Text></TouchableOpacity></View> : null}
      <TouchableOpacity accessibilityRole="link" accessibilityLabel={url ? 'Abrir transmisión publicada' : 'Sin transmisión publicada'} disabled={!url} onPress={() => url && open(url)} style={{ minHeight: 320, borderRadius: SPACING.r, backgroundColor: COLORS.deep, padding: 32, justifyContent: 'center', alignItems: 'center', gap: 18, ...SHADOWS.sh3 }}>
        <Text style={{ fontFamily: TYPOGRAPHY.serif, fontSize: 30, color: COLORS.white, textAlign: 'center' }}>{url ? contenido?.liveTitle || 'Transmisión en vivo' : 'Transmisión en vivo'}</Text>
        <Text style={{ color: COLORS.white, fontSize: 16, lineHeight: 25, textAlign: 'center' }}>{loading ? 'Cargando transmisión…' : error ? 'La transmisión no está disponible en este momento.' : url ? contenido?.liveSubtitle || 'Abrí la transmisión desde el enlace publicado.' : 'No hay una transmisión en vivo publicada en este momento.'}</Text>
        {url ? <Text style={{ color: COLORS.goldLt, fontWeight: '700' }}>Abrir transmisión</Text> : null}
      </TouchableOpacity>
      {links.length ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>{links.map((item, index) => <TouchableOpacity key={`${item.id}-${index}`} accessibilityRole="link" onPress={() => open(safeWebUrl(item.url)!)} style={{ minHeight: 48, padding: 20, backgroundColor: COLORS.surface, borderRadius: SPACING.r, borderWidth: 1, borderColor: COLORS.border }}><Text style={{ color: COLORS.deep, fontWeight: '700' }}>{item.name}</Text></TouchableOpacity>)}</View> : null}
    </View>
    <Toast message={message} visible={!!message} onHide={() => setMessage('')} />
  </ScrollView>;
}
