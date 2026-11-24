/**
 * Page Router Component
 * Extracted from App.tsx to reduce complexity and line count.
 * Handles page routing based on activePage state.
 *
 * OPTIMIZED: Uses React.lazy() for code splitting and performance.
 */

import React, { lazy, Suspense, ComponentType } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PageId } from '../types/pages';
import { COLORS } from '../constants/design';

// ─────────────────────────────────────────────────────────────────────────────
// LAZY LOADED SCREENS - Code Splitting for Performance
// ─────────────────────────────────────────────────────────────────────────────

// Admin is always needed, keep it eager for faster admin access
import { AdminLayout } from '../admin';

// Helper to wrap lazy imports - handles both default and named exports
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoad = <T extends ComponentType<any>>(importFn: () => Promise<{ default: T } | any>): React.LazyExoticComponent<T> =>
  lazy(async () => {
    const module = await importFn();
    // Return default export if exists, otherwise wrap the first named export
    return { default: module.default || module[Object.keys(module)[0]] };
  }) as React.LazyExoticComponent<T>;

// Lazy load all public screens
const HomeScreen = lazyLoad(() => import('./HomeScreen'));
const PredicasScreen = lazyLoad(() => import('./PredicasScreen'));
const BibliotecaScreen = lazyLoad(() => import('./BibliotecaScreen'));
const EnVivoScreen = lazyLoad(() => import('./EnVivoScreen'));
const DevocionalScreen = lazyLoad(() => import('./DevocionalScreen'));
const NosotrosScreen = lazyLoad(() => import('./NosotrosScreen'));
const PastoresScreen = lazyLoad(() => import('./PastoresScreen'));
const MinisteriosScreen = lazyLoad(() => import('./MinisteriosScreen'));
const CelulasScreen = lazyLoad(() => import('./CelulasScreen'));
const OracionScreen = lazyLoad(() => import('./OracionScreen'));
const NuevoScreen = lazyLoad(() => import('./NuevoScreen'));
const SedesScreen = lazyLoad(() => import('./SedesScreen'));
const CalendarioScreen = lazyLoad(() => import('./CalendarioScreen'));
const DonacionesScreen = lazyLoad(() => import('./DonacionesScreen'));
const BoletinScreen = lazyLoad(() => import('./BoletinScreen'));
const RedesScreen = lazyLoad(() => import('./RedesScreen'));
const NotFoundScreen = lazyLoad(() => import('./NotFoundScreen'));
const PrivacidadScreen = lazyLoad(() => import('./PrivacidadScreen'));
const ContactoScreen = lazyLoad(() => import('./ContactoScreen'));

// ─────────────────────────────────────────────────────────────────────────────
// LOADING FALLBACK COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const LoadingFallback = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={COLORS.gold} />
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface PageRouterProps {
  activePage: PageId;
  navigate: (page: PageId) => void;
  goBack: () => void;
  handleSecretTap: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROUTER
// ─────────────────────────────────────────────────────────────────────────────

export default function PageRouter({
  activePage,
  navigate,
  goBack,
  handleSecretTap,
}: PageRouterProps) {
  const renderPage = () => {
    switch (activePage) {
      case 'inicio':
        return <HomeScreen onNavigate={navigate} onSecretTap={handleSecretTap} />;
      case 'predicas':
        return <PredicasScreen onBack={goBack} />;
      case 'biblioteca':
        return <BibliotecaScreen onBack={goBack} />;
      case 'envivo':
        return <EnVivoScreen onBack={goBack} />;
      case 'devocional':
        return <DevocionalScreen onBack={goBack} />;
      case 'nosotros':
        return <NosotrosScreen onBack={goBack} />;
      case 'pastores':
        return <PastoresScreen onBack={goBack} />;
      case 'ministerios':
        return <MinisteriosScreen onBack={goBack} />;
      case 'celulas':
        return <CelulasScreen onBack={goBack} />;
      case 'oracion':
        return <OracionScreen onBack={goBack} />;
      case 'nuevo':
        return <NuevoScreen onBack={goBack} />;
      case 'sedes':
        return <SedesScreen onBack={goBack} />;
      case 'calendario':
        return <CalendarioScreen onBack={goBack} />;
      case 'donaciones':
        return <DonacionesScreen onBack={goBack} />;
      case 'boletin':
        return <BoletinScreen onBack={goBack} />;
      case 'redes':
        return <RedesScreen onBack={goBack} />;
      case 'notfound':
        return <NotFoundScreen onBack={goBack} />;
      case 'privacidad':
        return <PrivacidadScreen onBack={goBack} />;
      case 'contacto':
        return <ContactoScreen onBack={goBack} />;
      case 'admin':
        return <AdminLayout />;
      default:
        return <HomeScreen onNavigate={navigate} onSecretTap={handleSecretTap} />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderPage()}
    </Suspense>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    minHeight: 200,
  },
});
