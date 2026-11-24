// ─────────────────────────────────────────────
// useFirestore.ts — Hooks para todas las colecciones
// La Voz Misionera
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react';
import {
  eventosService,
  predicasService,
  pastoresService,
  ministeriosService,
  sedesService,
  radiosService,
  redesService,
  testimoniosService,
  contenidoService,
  celulasService,
  serviceTimesService,
  statsService,
  contactoService,
  heroSlidesService,
  valoresService,
  sermonesService,
  Evento,
  Predica,
  Pastor,
  Ministerio,
  Sede,
  Radio,
  RedSocial,
  Testimonio,
  Celula,
  ServiceTime,
  Stat,
  ContactoInfo,
  ContenidoHome,
  ContenidoNosotros,
  HeroSlide,
  Valor,
  Sermone,
} from './firebaseService';

// ── Eventos ─────────────────────────────────
export const useEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = eventosService.subscribe(data => {
      // Transform Firestore Evento to UI Evento format
      const transformed = data.map(evento => ({
        ...evento,
        // Map day to location for UI compatibility
        location: evento.day || 'Sede Central',
        // Map cat (category) to icon for UI compatibility
        icon: getIconFromCategory(evento.cat),
      }));
      setEventos(transformed);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { eventos, loading };
};

// ── Eventos with Limit (Paginated) ─────────
export const useEventosWithLimit = (maxResults: number = 10) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = eventosService.subscribeWithLimit(data => {
      const transformed = data.map(evento => ({
        ...evento,
        location: evento.day || 'Sede Central',
        icon: getIconFromCategory(evento.cat),
      }));
      setEventos(transformed);
      setLoading(false);
    }, maxResults);
    return unsub;
  }, [maxResults]);
  return { eventos, loading };
};

// Helper function to map category to icon
const getIconFromCategory = (cat: string | undefined): string => {
  if (!cat) return '📅';
  const iconMap: Record<string, string> = {
    'culto': '⛪',
    'estudio': '📖',
    'alabanza': '🎵',
    'jóvenes': '🔥',
    'bautismo': '💧',
    'conferencia': '🎤',
    'retiro': '⛺',
    'reunion': '👥',
  };
  return iconMap[cat] || '📅';
};

// ── Predicas (antes "Horarios") ─────────────────
export const usePredicas = () => {
  const [predicas, setPredicas] = useState<Predica[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = predicasService.subscribe(data => {
      setPredicas(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { predicas, loading };
};

// ── Predicas with Limit (Paginated) ────────
export const usePredicasWithLimit = (maxResults: number = 10) => {
  const [predicas, setPredicas] = useState<Predica[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = predicasService.subscribeWithLimit(data => {
      setPredicas(data);
      setLoading(false);
    }, maxResults);
    return unsub;
  }, [maxResults]);
  return { predicas, loading };
};

// ── Pastores ────────────────────────────────
export const usePastores = () => {
  const [pastores, setPastores] = useState<Pastor[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = pastoresService.subscribe(data => {
      setPastores(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { pastores, loading };
};

// ── Ministerios ─────────────────────────────
export const useMinisterios = () => {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = ministeriosService.subscribe(data => {
      setMinisterios(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { ministerios, loading };
};

// ── Sedes ────────────────────────────────────
export const useSedes = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = sedesService.subscribe(data => {
      setSedes(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { sedes, loading };
};

// ── Radios ───────────────────────────────────
export const useRadios = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = radiosService.subscribe(data => {
      setRadios(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { radios, loading };
};

// ── Redes Sociales ───────────────────────────
export const useRedes = () => {
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = redesService.subscribe(data => {
      setRedes(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { redes, loading };
};

// ── Contenido Home ───────────────────────────
export const useContenidoHome = () => {
  const [contenido, setContenido] = useState<ContenidoHome | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = contenidoService.subscribeHome((data, failure) => {
      setError(failure || null);
      setContenido(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { contenido, loading, error };
};

export const useContenidoGeneral = () => {
  const [contenido, setContenido] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = contenidoService.subscribeGeneral((data, failure) => { setError(failure || null); setContenido(data); setLoading(false); });
    return unsubscribe;
  }, []);
  return { contenido, loading, error };
};

// ── Contenido Nosotros ───────────────────────
export const useContenidoNosotros = () => {
  const [contenido, setContenido] = useState<ContenidoNosotros | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = contenidoService.subscribeNosotros(data => {
      setContenido(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { contenido, loading };
};

// ── Testimonios aprobados ─────────────────────
export const useTestimoniosAprobados = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = testimoniosService.subscribeApproved(data => {
      setTestimonios(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { testimonios, loading };
};

// ── Testimonios aprobados with Limit (Paginated) ──
export const useTestimoniosAprobadosWithLimit = (maxResults: number = 6) => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = testimoniosService.subscribeApprovedWithLimit(data => {
      setTestimonios(data);
      setLoading(false);
    }, maxResults);
    return unsub;
  }, [maxResults]);
  return { testimonios, loading };
};

// ── Células ──────────────────────────────────
export const useCelulas = () => {
  const [celulas, setCelulas] = useState<Celula[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = celulasService.subscribe(data => {
      setCelulas(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { celulas, loading };
};

// ── Service Times ──────────────────────────────
export const useServiceTimes = () => {
  const [serviceTimes, setServiceTimes] = useState<ServiceTime[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = serviceTimesService.subscribe(data => {
      setServiceTimes(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { serviceTimes, loading };
};

// ── Stats ──────────────────────────────────────
export const useStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = statsService.subscribe(data => {
      setStats(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { stats, loading };
};

// ── Contacto ───────────────────────────────────
export const useContacto = () => {
  const [contacto, setContacto] = useState<ContactoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = contactoService.subscribe(data => {
      setContacto(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { contacto, loading };
};

// ── Hero Slides ──────────────────────────────────
export const useHeroSlides = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = heroSlidesService.subscribe(data => {
      setHeroSlides(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { heroSlides, loading };
};

// ── Valores ──────────────────────────────────────
export const useValores = () => {
  const [valores, setValores] = useState<Valor[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = valoresService.subscribe(data => {
      setValores(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { valores, loading };
};

// ── Sermones ──────────────────────────────────────
export const useSermones = () => {
  const [sermones, setSermones] = useState<Sermone[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = sermonesService.subscribe(data => {
      setSermones(data);
      setLoading(false);
    });
    return unsub;
  }, []);
  return { sermones, loading };
};
