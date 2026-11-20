/**
 * Page Type Definitions
 * Types for navigation and page routing
 */

// ============================================
// Page Identifiers
// ============================================

export type PageId =
  | 'inicio'
  | 'nosotros'
  | 'pastores'
  | 'predicas'
  | 'biblioteca'
  | 'envivo'
  | 'devocional'
  | 'sedes'
  | 'ministerios'
  | 'celulas'
  | 'oracion'
  | 'calendario'
  | 'donaciones'
  | 'boletin'
  | 'redes'
  | 'nuevo'
  | 'admin'
  | 'notfound'
  | 'privacidad'
  | 'contacto';

// ============================================
// Page Navigation Groupings
// ============================================

export type PageGroup = 'main' | 'media' | 'community';

export interface PageInfo {
  id: PageId;
  label: string;
  group?: PageGroup;
}

export const PAGES: Record<PageId, PageInfo> = {
  inicio: { id: 'inicio', label: 'Inicio', group: 'main' },
  nosotros: { id: 'nosotros', label: 'Nosotros', group: 'main' },
  pastores: { id: 'pastores', label: 'Pastores', group: 'main' },
  predicas: { id: 'predicas', label: 'Prédicas', group: 'media' },
  biblioteca: { id: 'biblioteca', label: 'Biblioteca', group: 'media' },
  envivo: { id: 'envivo', label: 'En Vivo', group: 'media' },
  devocional: { id: 'devocional', label: 'Devocional', group: 'media' },
  sedes: { id: 'sedes', label: 'Sedes', group: 'main' },
  ministerios: { id: 'ministerios', label: 'Ministerios', group: 'community' },
  celulas: { id: 'celulas', label: 'Células', group: 'community' },
  oracion: { id: 'oracion', label: 'Oración', group: 'community' },
  calendario: { id: 'calendario', label: 'Calendario', group: 'community' },
  donaciones: { id: 'donaciones', label: 'Donaciones', group: 'main' },
  boletin: { id: 'boletin', label: 'Boletín', group: 'community' },
  redes: { id: 'redes', label: 'Redes', group: 'community' },
  nuevo: { id: 'nuevo', label: 'Soy Nuevo', group: 'main' },
  admin: { id: 'admin', label: 'Admin', group: 'main' },
  notfound: { id: 'notfound', label: 'No Encontrado', group: 'main' },
  privacidad: { id: 'privacidad', label: 'Privacidad', group: 'main' },
  contacto: { id: 'contacto', label: 'Contacto', group: 'community' },
};
