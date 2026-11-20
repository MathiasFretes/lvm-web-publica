/**
 * Validation Entity — Entity-Specific Validators
 * Validation functions for specific entity types in the admin panel
 */

import type {
  AdminUser,
  Evento,
  Predica,
  Pastor,
  Ministerio,
  Sede,
  Radio,
  EstudioBiblico,
  RedSocial,
  Devocional,
  Testimonio,
} from '../../types';

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Sanitize string input to prevent XSS
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim();
};

/**
 * Validate email format (returns boolean)
 * Note: Different from email() in core.ts which returns error string
 */
export const validateEmail = (email: string | undefined | null): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format (returns boolean)
 * Note: Different from url() in core.ts which returns error string
 */
export const validateUrl = (url: string | undefined | null): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate phone number format
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]{7,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate required field (returns boolean)
 * Note: Different from required() in core.ts which returns error string
 */
export const validateRequired = (
  value: string | undefined | null
): boolean => {
  return value !== undefined && value !== null && value.trim().length > 0;
};

/**
 * Validate string length (returns boolean)
 */
export const validateLength = (
  value: string | undefined | null,
  min: number,
  max: number
): boolean => {
  if (!value) return false;
  const length = value.trim().length;
  return length >= min && length <= max;
};

/**
 * Validate Evento data
 */
export const validateEvento = (data: Partial<Evento>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.name)) {
    errors.push('El nombre del evento es requerido');
  } else if (!validateLength(data.name, 2, 100)) {
    errors.push('El nombre debe tener entre 2 y 100 caracteres');
  }

  if (!validateRequired(data.date)) {
    errors.push('La fecha del evento es requerida');
  }

  if (!validateRequired(data.time)) {
    errors.push('La hora del evento es requerida');
  }

  return errors;
};

/**
 * Validate Predica data
 */
export const validatePredica = (data: Partial<Predica>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.title)) {
    errors.push('El título de la prédica es requerido');
  } else if (!validateLength(data.title, 2, 200)) {
    errors.push('El título debe tener entre 2 y 200 caracteres');
  }

  if (!validateRequired(data.pastor)) {
    errors.push('El nombre del pastor es requerido');
  }

  return errors;
};

/**
 * Validate Pastor data
 */
export const validatePastor = (data: Partial<Pastor>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.name)) {
    errors.push('El nombre del pastor es requerido');
  } else if (!validateLength(data.name, 2, 100)) {
    errors.push('El nombre debe tener entre 2 y 100 caracteres');
  }

  if (!validateRequired(data.role)) {
    errors.push('El rol del pastor es requerido');
  }

  return errors;
};

/**
 * Validate Ministerio data
 */
export const validateMinisterio = (data: Partial<Ministerio>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.name)) {
    errors.push('El nombre del ministerio es requerido');
  } else if (!validateLength(data.name, 2, 100)) {
    errors.push('El nombre debe tener entre 2 y 100 caracteres');
  }

  if (!validateRequired(data.desc)) {
    errors.push('La descripción es requerida');
  } else if (!validateLength(data.desc, 10, 500)) {
    errors.push('La descripción debe tener entre 10 y 500 caracteres');
  }

  return errors;
};

/**
 * Validate Sede data
 */
export const validateSede = (data: Partial<Sede>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.name)) {
    errors.push('El nombre de la sede es requerido');
  } else if (!validateLength(data.name, 2, 100)) {
    errors.push('El nombre debe tener entre 2 y 100 caracteres');
  }

  if (!validateRequired(data.address)) {
    errors.push('La dirección es requerida');
  }

  return errors;
};

/**
 * Validate Radio data
 */
export const validateRadio = (data: Partial<Radio>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.name)) {
    errors.push('El nombre de la radio es requerido');
  } else if (!validateLength(data.name, 2, 100)) {
    errors.push('El nombre debe tener entre 2 y 100 caracteres');
  }

  if (data.url && !validateUrl(data.url)) {
    errors.push('La URL de la radio no es válida');
  }

  return errors;
};

/**
 * Validate EstudioBiblico data
 */
export const validateEstudioBiblico = (
  data: Partial<EstudioBiblico>
): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.title)) {
    errors.push('El título del estudio es requerido');
  } else if (!validateLength(data.title, 2, 200)) {
    errors.push('El título debe tener entre 2 y 200 caracteres');
  }

  if (!validateRequired(data.cat)) {
    errors.push('La categoría es requerida');
  }

  return errors;
};

/**
 * Validate RedSocial data
 */
export const validateRedSocial = (data: Partial<RedSocial>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.name)) {
    errors.push('El nombre de la red social es requerido');
  }

  if (!validateRequired(data.url)) {
    errors.push('La URL es requerida');
  } else if (!validateUrl(data.url)) {
    errors.push('La URL no es válida');
  }

  return errors;
};

/**
 * Validate Devocional data
 */
export const validateDevocional = (data: Partial<Devocional>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.title)) {
    errors.push('El título del devocional es requerido');
  } else if (!validateLength(data.title, 2, 200)) {
    errors.push('El título debe tener entre 2 y 200 caracteres');
  }

  if (!validateRequired(data.content)) {
    errors.push('El contenido es requerido');
  } else if (!validateLength(data.content, 50, 5000)) {
    errors.push('El contenido debe tener entre 50 y 5000 caracteres');
  }

  return errors;
};

/**
 * Validate Testimonio data
 */
export const validateTestimonio = (data: Partial<Testimonio>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.text)) {
    errors.push('El contenido del testimonio es requerido');
  } else if (!validateLength(data.text, 50, 2000)) {
    errors.push('El contenido debe tener entre 50 y 2000 caracteres');
  }

  if (!validateRequired(data.author)) {
    errors.push('El nombre es requerido');
  }

  return errors;
};

/**
 * Validate AdminUser data
 */
export const validateAdminUser = (data: Partial<AdminUser>): string[] => {
  const errors: string[] = [];

  if (!validateRequired(data.email)) {
    errors.push('El email es requerido');
  } else if (!validateEmail(data.email)) {
    errors.push('El email no es válido');
  }

  if (!validateRequired(data.name)) {
    errors.push('El nombre es requerido');
  }

  if (data.role && !['superadmin', 'editor'].includes(data.role)) {
    errors.push('El rol debe ser superadmin o editor');
  }

  return errors;
};

/**
 * Sanitize all string fields in an object (entity-specific version)
 * Note: Uses sanitizeString instead of sanitize from core
 */
export const sanitizeObjectEntity = <T extends Record<string, any>>(
  obj: T
): T => {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObjectEntity(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};
