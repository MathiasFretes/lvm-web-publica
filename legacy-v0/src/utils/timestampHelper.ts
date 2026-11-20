/**
 * timestampHelper.ts
 * Funciones para convertir Firestore Timestamps a formatos seguros para React
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Convierte un Firestore Timestamp a Date
 * @param timestamp Firestore Timestamp o valor que puede ser timestamp
 * @returns Date o null si no es válido
 */
export const timestampToDate = (timestamp: any): Date | null => {
  if (!timestamp) return null;

  // Si ya es una Date, retornarlo
  if (timestamp instanceof Date) return timestamp;

  // Si es un Timestamp de Firestore
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }

  // Si es un objeto con estructura de Timestamp {seconds, nanoseconds}
  if (typeof timestamp === 'object' && 'seconds' in timestamp) {
    try {
      return new Date(timestamp.seconds * 1000);
    } catch {
      return null;
    }
  }

  return null;
};

/**
 * Convierte un Firestore Timestamp a string con formato legible
 * @param timestamp Firestore Timestamp o valor que puede ser timestamp
 * @param format 'short' | 'long' | 'time' (default: 'short')
 * @returns String formateado o string vacío si no es válido
 */
export const timestampToString = (
  timestamp: any,
  format: 'short' | 'long' | 'time' = 'short'
): string => {
  const date = timestampToDate(timestamp);
  if (!date) return '';

  switch (format) {
    case 'short':
      // Ej: "12 Mar 2026"
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    case 'long':
      // Ej: "12 de Marzo de 2026"
      return date.toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    case 'time':
      // Ej: "14:30"
      return date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return date.toISOString();
  }
};

/**
 * Convierte cualquier objeto recursivamente, reemplazando Timestamps por Dates
 * Útil para convertir documentos Firestore completos
 * @param obj Objeto que puede contener Timestamps
 * @returns Objeto con Timestamps convertidos a Dates
 */
export const convertTimestampsInObject = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;

  // Si es Timestamp, convertir a string ISO
  if (obj instanceof Timestamp) {
    return obj.toDate().toISOString();
  }
  if (typeof obj === 'object' && 'seconds' in obj && 'nanoseconds' in obj) {
    try {
      return new Date(obj.seconds * 1000).toISOString();
    } catch {
      return obj;
    }
  }

  // Si es Array, procesar cada elemento
  if (Array.isArray(obj)) {
    return obj.map(item => convertTimestampsInObject(item));
  }

  // Si es objeto, procesar cada propiedad
  if (typeof obj === 'object' && obj.constructor === Object) {
    const converted: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        converted[key] = convertTimestampsInObject(obj[key]);
      }
    }
    return converted;
  }

  // Si es valor primitivo, retornarlo tal cual
  return obj;
};

/**
 * Verifica si un valor es un Firestore Timestamp (o su estructura)
 * @param value Valor a verificar
 * @returns true si es un timestamp
 */
export const isTimestamp = (value: any): boolean => {
  if (value instanceof Timestamp) return true;
  if (typeof value === 'object' && value !== null && 'seconds' in value && 'nanoseconds' in value) {
    return typeof value.seconds === 'number' && typeof value.nanoseconds === 'number';
  }
  return false;
};
