/**
 * StatsSection Component
 * Extracted from HomeScreen.tsx (lines 681-700)
 * Statistics counters with gradient background
 */

import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING } from '../../constants/design';
import { Stat } from '../../components/Stat';

interface Stat {
  value: number | string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <LinearGradient
      colors={[COLORS.deep, '#243b55']}
      style={{ paddingVertical: 60, paddingHorizontal: 24, marginTop: 40 }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: 30,
          maxWidth: 900,
          alignSelf: 'center',
        }}
      >
        {stats.map((stat, index) => (
          <Stat key={index} value={String(stat.value)} label={stat.label} />
        ))}
      </View>
    </LinearGradient>
  );
};

export default StatsSection;
