import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePredicas } from '../useFirestore';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { DarkHeader } from '../components/DarkHeader';
import Toast from '../components/Toast';
import VideoModal from '../components/VideoModal';
import BtnChurch from '../components/BtnChurch';

interface PredicasScreenProps {
  onBack: () => void;
}

export const PredicasScreen: React.FC<PredicasScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState('*');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSub, setModalSub] = useState('');
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const { predicas, loading: predicasLoading } = usePredicas();

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

  const filters = [
    { id: '*', label: 'Todas' },
    { id: 'fe', label: 'Fe y Propósito' },
    { id: 'familia', label: 'Familias Fuertes' },
    { id: 'espiritu', label: 'El Espíritu Santo' },
    { id: 'salmos', label: 'Salmos' },
  ];

  const getSeriesId = (series: string) => {
    if (series === 'Fe y Propósito') return 'fe';
    if (series === 'Familias Fuertes') return 'familia';
    if (series === 'El Espíritu Santo') return 'espiritu';
    if (series === 'Salmos') return 'salmos';
    return '*';
  };

  const filteredPredicas =
    filter === '*'
      ? predicas
      : predicas.filter((p) => getSeriesId(p.serie) === filter);

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="ARCHIVO"
        title="Prédicas y"
        accent="Series"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        {predicasLoading && (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator color={COLORS.gold} size="large" />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 24,
          }}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={{
                paddingVertical: 7,
                paddingHorizontal: 16,
                borderWidth: 1.5,
                borderColor: filter === f.id ? COLORS.gold : COLORS.border,
                borderRadius: 20,
                backgroundColor:
                  filter === f.id
                    ? 'rgba(198,161,91,0.07)'
                    : COLORS.transparent,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: filter === f.id ? '600' : '500',
                  color: filter === f.id ? COLORS.gold : COLORS.warmGray,
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          {filteredPredicas.map((item, idx) => (
            <TouchableOpacity
              key={item.id || idx}
              onPress={() =>
                showModal(
                  item.title,
                  `${item.pastor} — ${item.date} — ${item.serie}`,
                    item.videoUrl || item.audioUrl || item.url,
                )
              }
              style={{
                width: isDesktop ? '31%' : '100%',
                borderRadius: SPACING.r,
                overflow: 'hidden',
                ...SHADOWS.sh2,
              }}
            >
              <LinearGradient
                colors={[COLORS.deep, '#2a4060']}
                style={{
                  height: 172,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.white,
                      letterSpacing: 1,
                      fontWeight: '600',
                    }}
                  >
                    {item.serie}
                  </Text>
                </View>
                <View
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 27,
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: COLORS.white, fontSize: 14, marginLeft: 3 }}
                  >
                    ▶
                  </Text>
                </View>
              </LinearGradient>
              <View style={{ backgroundColor: COLORS.surface, padding: 18 }}>
                <Text
                  style={{
                    fontFamily: TYPOGRAPHY.serif,
                    fontSize: 18,
                    fontWeight: '700',
                    color: COLORS.deep,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                    {item.pastor}
                  </Text>
                  <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 28 }}>
          <BtnChurch label="VER BIBLIOTECA COMPLETA" onPress={() => {}} />
        </View>
      </View>

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

export default PredicasScreen;
