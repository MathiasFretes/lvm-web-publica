import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/design';
import { DarkHeader } from '../components/DarkHeader';
import Card from '../components/Card';
import SecLabel from '../components/SecLabel';
import Tag from '../components/Tag';
import Toast from '../components/Toast';
import { BackBtn } from '../components/BackBtn';
import Divider from '../components/Divider';
import { useEventos } from '../useFirestore';

interface CalendarioScreenProps {
  onBack: () => void;
}

export const CalendarioScreen: React.FC<CalendarioScreenProps> = ({ onBack }) => {
  const { eventos, loading: eventosLoading } = useEventos();
  const [month, setMonth] = useState(2);
  const [year, setYear] = useState(2026);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const changeMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const getDaysInMonth = () => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDay = () => {
    return new Date(year, month, 1).getDay();
  };

  const today = new Date();

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <DarkHeader
        label="AGENDA"
        title="Calendario"
        accent="Mensual"
        onBack={onBack}
      />

      <View style={{ padding: 24 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <LinearGradient
            colors={[COLORS.deep, '#2a4060']}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <Text
              style={{
                fontFamily: TYPOGRAPHY.serif,
                fontSize: 22,
                fontWeight: '700',
                color: COLORS.white,
              }}
            >
              {months[month]} {year}
            </Text>
            <View style={{ flexDirection: 'row', gap: 7 }}>
              <TouchableOpacity
                onPress={() => changeMonth(-1)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: SPACING.rSm,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: 16 }}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeMonth(1)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: SPACING.rSm,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: 16 }}>›</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.bg,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.border,
            }}
          >
            {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map((day) => (
              <View
                key={day}
                style={{ flex: 1, paddingVertical: 12, alignItems: 'center' }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '600',
                    color: COLORS.warmGray,
                  }}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {Array.from({ length: getFirstDay() }).map((_, i) => (
              <View
                key={`empty-${i}`}
                style={{
                  width: `${100 / 7}%`,
                  padding: 8,
                  alignItems: 'center',
                }}
              />
            ))}

            {Array.from({ length: getDaysInMonth() }).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              const hasEvent = [15, 22, 29, 30].includes(day);

              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => showToast(`${months[month]} ${day}, ${year}`)}
                  style={{
                    width: `${100 / 7}%`,
                    padding: 8,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={
                      isToday
                        ? {
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: COLORS.gold,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }
                        : {}
                    }
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: isToday ? COLORS.white : COLORS.warmGray,
                        fontWeight: isToday ? '700' : '400',
                      }}
                    >
                      {day}
                    </Text>
                  </View>
                  {hasEvent && !isToday && (
                    <View
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: COLORS.gold,
                        marginTop: 2,
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: 'row',
              padding: 14,
              borderTopWidth: 1,
              borderTopColor: COLORS.border,
              gap: 14,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: COLORS.gold,
                }}
              />
              <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                Evento especial
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: COLORS.success,
                }}
              />
              <Text style={{ fontSize: 12, color: COLORS.warmGray }}>
                Servicio regular
              </Text>
            </View>
          </View>
        </Card>

        <View style={{ marginTop: 36 }}>
          <SecLabel>PRÓXIMOS EVENTOS</SecLabel>
          <View style={{ gap: 10, marginTop: 14 }}>
            {eventosLoading ? (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.gold} />
              </View>
            ) : eventos.length === 0 ? (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <Text style={{ color: COLORS.warmGray, fontSize: 14 }}>
                  No hay eventos próximos
                </Text>
              </View>
            ) : (
              eventos.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => showToast(item.name)}
                  style={{
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
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: COLORS.deep,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Tag text={item.date} variant="gold" />
                  </View>
                  <Text style={{ fontSize: 13, color: COLORS.warmGray }}>
                    {item.time} — {item.location || 'Sede Central'}
                  </Text>
                </TouchableOpacity>
              ))
            )}
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
