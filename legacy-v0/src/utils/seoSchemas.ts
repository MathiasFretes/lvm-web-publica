/**
 * SEO Schema Utilities
 * Generate JSON-LD structured data for church entities
 */

export const CHURCH_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: 'La Voz Misionera',
  description: 'Iglesia evangélica en Ciudad del Este, Paraguay. Predicaciones, devocionales, eventos y transmisiones en vivo.',
  url: 'https://lavozmisionera-5a24b.web.app',
  telephone: '+595981123456',
  email: 'admin@lavozmisionera.org',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Principal',
    addressLocality: 'Ciudad del Este',
    addressRegion: 'Alto Paraná',
    addressCountry: 'PY',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -25.4697,
    longitude: -54.6116,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '09:00',
      closes: '12:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday'],
      opens: '19:00',
      closes: '21:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/lavozmisionera',
    'https://www.instagram.com/lavozmisionera',
    'https://www.youtube.com/@lavozmisionera',
  ],
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ReligiousOrganization',
  name: 'La Voz Misionera',
  url: 'https://lavozmisionera-5a24b.web.app',
  logo: 'https://lavozmisionera-5a24b.web.app/assets/icon.png',
  description: 'Iglesia cristiana evangélica comprometida con la difusión del mensaje bíblico.',
};

export function createEventSchema(event: {
  name: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location ? {
      '@type': 'Place',
      name: event.location,
    } : undefined,
    image: event.image,
    description: event.description,
    organizer: {
      '@type': 'Organization',
      name: 'La Voz Misionera',
      url: 'https://lavozmisionera-5a24b.web.app',
    },
  };
}

export function createArticleSchema(article: {
  headline: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  description?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: article.author ? {
      '@type': 'Person',
      name: article.author,
    } : {
      '@type': 'Organization',
      name: 'La Voz Misionera',
    },
    image: article.image,
    description: article.description,
    url: article.url || 'https://lavozmisionera-5a24b.web.app',
  };
}