import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definimos los tipos de tema
type ThemeMode = 'light' | 'dark';

// Paleta clara (la que ya tienes)
export const lightTheme = {
  background: "#FFFFFF",
  section:    "#F8FAFC",
  card:       "#FFFFFF",
  primary:    "#2563EB",
  primaryHover:"#1D4ED8",
  accent:     "#D4A017",
  accentHover:"#B58900",
  text:       "#0F172A",
  textSoft:   "#475569",
  textMuted:  "#94A3B8",
  live:       "#EF4444",
  success:    "#22C55E",
  border:     "rgba(15,23,42,0.08)",
};

// Paleta oscura (puedes ajustarla a tu gusto)
export const darkTheme = {
  background: "#0B0F19",
  section:    "#111827",
  card:       "#161F2E",
  primary:    "#4C6EF5",
  primaryHover:"#3B5BDB",
  accent:     "#E8B84B",
  accentHover:"#C99830",
  text:       "#FFFFFF",
  textSoft:   "#9CA3AF",
  textMuted:  "#6B7280",
  live:       "#FF4D4D",
  success:    "#22C55E",
  border:     "rgba(255,255,255,0.08)",
};

interface ThemeContextType {
  theme: typeof lightTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  fontSizeScale: number;
  setFontSizeScale: (scale: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [fontSizeScale, setFontSizeScale] = useState(1); // 1 = tamaño normal

  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      mode,
      toggleTheme,
      setMode,
      fontSizeScale,
      setFontSizeScale,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};