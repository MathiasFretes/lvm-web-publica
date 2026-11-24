import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { usePredicas } from '../useFirestore';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { isDesktop } from '../constants/platform';
import { DarkHeader } from '../components/DarkHeader';
import Toast from '../components/Toast';
import VideoModal from '../components/VideoModal';
import Card from '../components/Card';
import Tag from '../components/Tag';

interface BibliotecaScreenProps {
  onBack: () => void;
}

export const BibliotecaScreen: React.FC<BibliotecaScreenProps> = ({ onBack }) => {
  const { predicas, loading: predicasLoading } = usePredicas();
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('*');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSub, setModalSub] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const showModal = (title: string, sub: string) => {
    setModalTitle(title);
    setModalSub(sub);
    setModalVisible(true);
  };

  const filteredPredicas = predicas.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.pastor.toLowerCase().includes(search.toLowerCase()) ||
      s.serie.toLowerCase().includes(search.toLowerCase());
    const matchesYear = yearFilter === '*' || s.date.includes(yearFilter);
    return matchesSearch && matchesYear;
  });

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="ARCHIVO COMPLETO"
        title="Biblioteca de"
        accent="Sermones"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        {predicasLoading ? (
          <View style={{ padding: 60, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.gold} />
            <Text style={{ marginTop: 16, color: COLORS.warmGray }}>
              Cargando prédicas...
            </Text>
          </View>
        ) : (
          <>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.warmGray,
                lineHeight: 24,
                marginBottom: 28,
              }}
            >
              Explora nuestra colección completa. Busca por título, predicador o
              serie.
            </Text>

            <View
              style={{
                flexDirection: isDesktop ? 'row' : 'column',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <TextInput
                placeholder="Buscar por título, predicador o serie..."
                placeholderTextColor={COLORS.warmGray}
                value={search}
                onChangeText={setSearch}
                style={{
                  flex: 1,
                  backgroundColor: COLORS.surface,
                  borderWidth: 1.5,
                  borderColor: COLORS.border,
                  borderRadius: SPACING.rSm,
                  padding: 12,
                  fontSize: 14,
                  color: COLORS.deep,
                  ...SHADOWS.sh1,
                }}
              />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {['*', '2026', '2025'].map((year) => (
                  <TouchableOpacity
                    key={year}
                    onPress={() => setYearFilter(year)}
                    style={{
                      paddingVertical: 7,
                      paddingHorizontal: 16,
                      borderWidth: 1.5,
                      borderColor:
                        yearFilter === year ? COLORS.gold : COLORS.border,
                      borderRadius: 20,
                      backgroundColor:
                        yearFilter === year
                          ? 'rgba(198,161,91,0.07)'
                          : COLORS.transparent,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: yearFilter === year ? '600' : '500',
                        color:
                          yearFilter === year ? COLORS.gold : COLORS.warmGray,
                      }}
                    >
                      {year === '*' ? 'TODOS' : year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: COLORS.bg,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.border,
                    }}
                  >
                    <View style={{ width: 50, padding: 14 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: COLORS.warmGray,
                        }}
                      ></Text>
                    </View>
                    <View style={{ width: 200, padding: 14 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: COLORS.warmGray,
                        }}
                      >
                        TÍTULO
                      </Text>
                    </View>
                    <View style={{ width: 150, padding: 14 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: COLORS.warmGray,
                        }}
                      >
                        SERIE
                      </Text>
                    </View>
                    <View style={{ width: 150, padding: 14 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: COLORS.warmGray,
                        }}
                      >
                        PREDICADOR
                      </Text>
                    </View>
                    <View style={{ width: 100, padding: 14 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: COLORS.warmGray,
                        }}
                      >
                        FECHA
                      </Text>
                    </View>
                    <View style={{ width: 80, padding: 14 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: COLORS.warmGray,
                        }}
                      >
                        DURACIÓN
                      </Text>
                    </View>
                  </View>

                  {filteredPredicas.map((item, idx) => (
                    <View
                      key={item.id || idx}
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.border,
                      }}
                    >
                      <View style={{ width: 50, padding: 14 }}>
                        <TouchableOpacity
                          onPress={() =>
                            showModal(
                              item.title,
                              `${item.pastor} — ${item.date} — ${item.serie}`,
                            )
                          }
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            borderWidth: 1.5,
                            borderColor: 'rgba(198,161,91,0.35)',
                            backgroundColor: 'rgba(198,161,91,0.07)',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.gold,
                              fontSize: 10,
                              marginLeft: 2,
                            }}
                          >
                            ▶
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: 200,
                          padding: 14,
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '600',
                            color: COLORS.deep,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 150,
                          padding: 14,
                          justifyContent: 'center',
                        }}
                      >
                        <Tag text={item.serie} variant="series" />
                      </View>
                      <View
                        style={{
                          width: 150,
                          padding: 14,
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                          {item.pastor}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 100,
                          padding: 14,
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                          {item.date}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 80,
                          padding: 14,
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                          {item.dur}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card>
          </>
        )}
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
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default BibliotecaScreen;
