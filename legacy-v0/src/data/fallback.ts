import { PageId } from '../types/pages';
import { COLORS } from '../constants/design';

export const HERO_SLIDES_FALLBACK = [
  {
    id: 1,
    eyebrow: 'ASUNCION, PARAGUAY',
    title: 'Un lugar para encontrar',
    accent: 'esperanza y propósito',
    sub: 'Dios sigue transformando vidas hoy. Te invitamos a ser parte de nuestra comunidad.',
    cta1: { label: 'Planificar visita', page: 'nuevo' as PageId },
    cta2: { label: 'Ver transmisión', page: 'envivo' as PageId },
    bgImage:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    isVideo: false,
  },
  {
    id: 2,
    eyebrow: 'PRÉDICA SEMANAL',
    title: 'La Palabra que',
    accent: 'transforma tu vida',
    sub: 'Enseñanza bíblica práctica, profunda y relevante para la vida cotidiana.',
    cta1: { label: 'Escuchar prédicas', page: 'predicas' as PageId },
    cta2: { label: 'Biblioteca de sermones', page: 'biblioteca' as PageId },
    bgVideo: 'https://www.pexels.com/download/video/8041841/',
    isVideo: true,
  },
  {
    id: 3,
    eyebrow: 'GRUPOS Y CÉLULAS',
    title: 'Nadie camina',
    accent: 'solo',
    sub: 'Conectate a una célula y crece en comunidad con personas que creen lo mismo que vos.',
    cta1: { label: 'Encontrar mi grupo', page: 'celulas' as PageId },
    cta2: { label: 'Ver ministerios', page: 'ministerios' as PageId },
    bgImage:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    isVideo: false,
  },
  {
    id: 4,
    eyebrow: 'SERVICIO SOCIAL',
    title: 'Amamos servir',
    accent: 'a nuestra ciudad',
    sub: 'La fe se vive ayudando a otros. Nuestros ministerios impactan comunidades enteras.',
    cta1: { label: 'Conocer ministerios', page: 'ministerios' as PageId },
    cta2: { label: 'Apoyar la obra', page: 'donaciones' as PageId },
    bgImage:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    isVideo: false,
  },
];

export const HERO_SLIDES = HERO_SLIDES_FALLBACK;
