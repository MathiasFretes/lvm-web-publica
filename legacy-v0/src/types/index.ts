/**
 * Shared Type Definitions — La Voz Misionera
 * Single source of truth for all domain types.
 *
 * These types reflect the Firestore document shapes used
 * by firebaseService.ts and the admin screens.
 */

// Re-export admin-specific types
export type { AdminRole, AdminPermission, AdminFeatureFlags, AdminUser } from './admin';
export { DEFAULT_ADMIN_FLAGS } from './admin';

// Re-export page types
export type { PageId } from './pages';

// ============================================
// Domain Types
// ============================================

export interface Evento {
  id?: string;
  date: string;
  day: string;
  name: string;
  time: string;
  cat: string;
  color: string;
  type?: 'conferencia' | 'retiro' | 'culto_especial' | 'reunion';
  capacity?: number;
  registrationUrl?: string | null;
  imageUrl?: string | null;
  isRecurring?: boolean;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
  /** UI compatibility field (added by transformation) */
  icon?: string;
  /** UI compatibility field (added by transformation) */
  location?: string;
}

export interface Predica {
  id?: string;
  title: string;
  pastor: string;
  serie: string;
  dur: string;
  date: string;
  url?: string | null;
  audioUrl?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  tags?: string[];
  views?: number;
  isFeatured?: boolean;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Pastor {
  id?: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
  photoUrl?: string | null;
  bio?: string | null;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Ministerio {
  id?: string;
  emoji: string;
  name: string;
  lead: string;
  desc: string;
  color: string;
  order?: number;
  createdAt?: any;
  createdBy?: string;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Sede {
  id?: string;
  name: string;
  address: string;
  pastor: string;
  phone?: string | null;
  email?: string | null;
  horarios?: { day: string; time: string }[];
  isCentral?: boolean;
  order?: number;
  createdAt?: any;
  createdBy?: string;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Radio {
  id?: string;
  name: string;
  url?: string | null;
  order?: number;
  createdAt?: any;
  createdBy?: string;
  updatedAt?: any;
  updatedBy?: string;
}

export interface EstudioBiblico {
  id?: string;
  cat: string;
  title: string;
  min: string;
  contenido?: string;
  order?: number;
  createdAt?: any;
  createdBy?: string;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Devocional {
  id?: string;
  date: string;
  verse: string;
  reference: string;
  title: string;
  content: string;
  application: string;
  prayer: string;
}

export interface Testimonio {
  id?: string;
  author: string;
  role: string;
  initials: string;
  text: string;
  photoUrl?: string | null;
  approved: boolean;
  date: string;
}

export interface RedSocial {
  id?: string;
  icon: string;
  name: string;
  handle: string;
  url?: string | null;
  color: string;
  order?: number;
  createdAt?: any;
  createdBy?: string;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Celula {
  id?: string;
  name: string;
  schedule: string;
  leader: string;
  status: 'Abierto' | 'Completo';
  day?: string;
  zone?: string;
  count?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

export interface ServiceTime {
  id?: string;
  day: string;
  time: string;
  name: string;
  description?: string;
  location?: string;
  isActive?: boolean;
  order?: number;
  recurrence?: {
    type: 'weekly' | 'biweekly' | 'monthly';
    weekOfMonth?: number;
  };
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

export interface Stat {
  id?: string;
  value: string;
  label: string;
  icon?: string;
  color?: string;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

export interface ContactoInfo {
  id?: string;
  label: string;
  value: string;
  icon?: string;
  type?: 'address' | 'phone' | 'email' | 'social';
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

// ============================================
// Contenido — Single-document collections
// ============================================

export interface ContenidoGeneral {
  devocionalTitulo: string;
  devocionalFecha: string;
  devocionalLectura: string;
  devocionalTexto: string;
  heroBienvenida: string;
  versiculoDia: string;
  versiculoRef: string;
  updatedAt?: any;
}

export interface ContenidoHome {
  liveTitle: string;
  liveSubtitle: string;
  liveDefaultMessage: string;
  liveDefaultPastor: string;
  isLive: boolean;
  livePlatform: string;
  liveVideoUrl: string;
  ctaTitle: string;
  ctaMessage: string;
  ctaButtonText: string;
  ctaIcon: string;
  donacionesTitle: string;
  donacionesMessage: string;
  donacionesDescription: string;
  donacionesButtonText: string;
  donacionesAmounts: string[];
  donacionesCurrency: string;
  newsletterTitle: string;
  newsletterMessage: string;
  newsletterButtonText: string;
  newsletterPlaceholder: string;
  newsletterEnabled: boolean;
  updatedAt?: any;
}

export interface ContenidoNosotros {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  historyTitle: string;
  historySubtitle: string;
  historyContent: string;
  statYears: string;
  statAnexos: string;
  statPaises: string;
  updatedAt?: any;
}

export interface ContenidoMedia {
  heroTitle: string;
  heroSubtitle: string;
  liveBannerTitle: string;
  liveBannerTime: string;
  liveBannerPlatforms: string;
  updatedAt?: any;
}

export interface ContenidoSedes {
  heroTitle: string;
  heroSubtitle: string;
  centralName: string;
  centralAddress: string;
  centralPhone: string;
  centralEmail: string;
  centralPastor: string;
  centralMapsUrl: string;
  updatedAt?: any;
}

export interface ContenidoOracion {
  heroTitle: string;
  heroSubtitle: string;
  heroMessage: string;
  labelName: string;
  labelPrayer: string;
  labelAnonymous: string;
  placeholderName: string;
  placeholderPrayer: string;
  buttonText: string;
  successTitle: string;
  successMessage: string;
  updatedAt?: any;
}

export interface ContenidoBoletin {
  heroTitle: string;
  heroSubtitle: string;
  currentMonth: string;
  currentTitle: string;
  currentDescription: string;
  currentButtonText: string;
  subscriptionTitle: string;
  subscriptionMessage: string;
  subscriptionPlaceholder: string;
  subscriptionButtonText: string;
  updatedAt?: any;
}

export interface ContenidoContacto {
  heroTitle: string;
  heroSubtitle: string;
  addressTitle: string;
  addressStreet: string;
  addressCity: string;
  addressPostal: string;
  mapsUrl: string;
  updatedAt?: any;
}

export interface ContenidoImagenes {
  heroBg?: string;
  logoUrl?: string;
  pastorPrincipal?: string;
  boletinPortada?: string;
  updatedAt?: any;
}

// ============================================
// Hero Slides
// ============================================

export interface HeroSlide {
  id?: string;
  eyebrow: string;
  title: string;
  accent: string;
  sub: string;
  cta1Label: string;
  cta1Page: string;
  cta2Label: string;
  cta2Page: string;
  bgImage?: string;
  bgVideo?: string;
  isVideo?: boolean;
  isActive?: boolean;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

// ============================================
// Valores (Church Values)
// ============================================

export interface Valor {
  id?: string;
  number: string;
  title: string;
  desc: string;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}

// ============================================
// Sermones (Sermons for Biblioteca)
// ============================================

export interface Sermone {
  id?: string;
  title: string;
  preacher: string;
  series: string;
  date: string;
  duration: string;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  updatedBy?: string;
}
