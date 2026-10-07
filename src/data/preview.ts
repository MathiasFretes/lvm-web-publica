// M7.9A fixtures: these records are examples, not published Service data.
export type Event = {
  id: string
  title: string
  date: string
  time: string
  venue: string
  kind: 'culto' | 'encuentro'
  description: string
}

export type Sermon = {
  id: string
  title: string
  series: string
  speaker: string
  date: string
  duration: string
  summary: string
}

export type Venue = {
  id: string
  name: string
  zone: string
  address: string
  hours: string
  isMain: boolean
}

export const events: Event[] = [
  {
    id: 'culto-general',
    title: 'Culto general',
    date: '2026-10-11',
    time: '19:00',
    venue: 'Sede Central · ejemplo',
    kind: 'culto',
    description: 'Un espacio de adoración, enseñanza y comunidad.',
  },
  {
    id: 'encuentro-jovenes',
    title: 'Encuentro de jóvenes',
    date: '2026-10-17',
    time: '18:00',
    venue: 'Sede Central · ejemplo',
    kind: 'encuentro',
    description: 'Una tarde para compartir, aprender y construir amistad.',
  },
  {
    id: 'oracion',
    title: 'Reunión de oración',
    date: '2026-10-21',
    time: '19:30',
    venue: 'Sede Central · ejemplo',
    kind: 'culto',
    description: 'Nos encontramos para orar juntos.',
  },
]

export const sermons: Sermon[] = [
  {
    id: 'esperanza',
    title: 'Esperanza para el camino',
    series: 'Fe y propósito',
    speaker: 'Equipo pastoral · ejemplo',
    date: '2026-09-27',
    duration: '32 min',
    summary: 'Una reflexión sobre encontrar dirección y acompañamiento en cada etapa.',
  },
  {
    id: 'comunidad',
    title: 'Una comunidad que acompaña',
    series: 'Familias fuertes',
    speaker: 'Equipo pastoral · ejemplo',
    date: '2026-09-20',
    duration: '28 min',
    summary: 'La importancia de cultivar vínculos de cuidado y servicio.',
  },
  {
    id: 'renovar',
    title: 'Renovar la mirada',
    series: 'Fe y propósito',
    speaker: 'Equipo pastoral · ejemplo',
    date: '2026-09-13',
    duration: '35 min',
    summary: 'Una invitación a mirar el futuro con esperanza.',
  },
]

export const venues: Venue[] = [
  {
    id: 'central',
    name: 'La Voz Misionera Central',
    zone: 'Área Central · ejemplo',
    address: 'Dirección pendiente de publicación',
    hours: 'Horarios pendientes de publicación',
    isMain: true,
  },
  {
    id: 'san-antonio',
    name: 'San Antonio',
    zone: 'Zona Sur · ejemplo',
    address: 'Dirección pendiente de publicación',
    hours: 'Horarios pendientes de publicación',
    isMain: false,
  },
  {
    id: 'lambare',
    name: 'Lambaré',
    zone: 'Zona Metropolitana · ejemplo',
    address: 'Dirección pendiente de publicación',
    hours: 'Horarios pendientes de publicación',
    isMain: false,
  },
]
