/**
 * Validation Core — Composable Validators
 * Generic validation utilities used across the app
 */

/**
 * Sanitiza un string eliminando HTML tags y espacios extras
 */
export const sanitize = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/<[^>]*>/g, '');
};

/**
 * Sanitiza un objeto completo (recursivo básico)
 */
export const sanitizeObject = (obj: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitize(obj[key]);
    } else if (Array.isArray(obj[key])) {
      sanitized[key] = obj[key].map((item: any) =>
        typeof item === 'string' ? sanitize(item) : item
      );
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
};

/**
 * Validador: campo requerido
 */
export const required = (value: string): string | null => {
  return value.trim().length > 0 ? null : 'Este campo es requerido';
};

/**
 * Validador: longitud máxima
 */
export const maxLength = (max: number) => (value: string): string | null => {
  return value.length <= max ? null : `Máximo ${max} caracteres`;
};

/**
 * Validador: longitud mínima
 */
export const minLength = (min: number) => (value: string): string | null => {
  return value.length >= min ? null : `Mínimo ${min} caracteres`;
};

/**
 * Validador: URL válida
 */
export const url = (value: string): string | null => {
  if (!value) return null; // URL opcional
  try {
    new URL(value);
    return null;
  } catch {
    return 'URL inválida';
  }
};

/**
 * Validador: email válido (retorna mensaje de error)
 */
export const email = (value: string): string | null => {
  if (!value) return null; // email opcional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : 'Email inválido';
};

/**
 * Validador: número entero positivo
 */
export const positiveInteger = (value: string): string | null => {
  if (!value) return null;
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? null : 'Debe ser un número entero positivo';
};

/**
 * Validador: número dentro de rango
 */
export const range = (min: number, max: number) => (value: string): string | null => {
  if (!value) return null;
  const num = Number(value);
  return num >= min && num <= max ? null : `Debe estar entre ${min} y ${max}`;
};

/**
 * Ejecuta múltiples validadores y devuelve el primer error
 */
export const validate = (
  value: string,
  validators: Array<(v: string) => string | null>
): string | null => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

/**
 * Valida un objeto con reglas por campo
 */
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: {
    [K in keyof T]?: Array<(v: string) => string | null>;
  }
): { errors: Record<string, string>; isValid: boolean } => {
  const errors: Record<string, string> = {};

  for (const field in rules) {
    if (data[field] !== undefined) {
      const value = String(data[field]);
      const fieldRules = rules[field];
      if (fieldRules) {
        const error = validate(value, fieldRules);
        if (error) {
          errors[field as string] = error;
        }
      }
    }
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

/**
 * Recursively removes `undefined` values from an object, preserving `null`.
 * @param obj Any JavaScript object
 * @returns Clean object with no `undefined` values
 */
export const stripUndefined = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(stripUndefined);
  const clean: any = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      clean[key] = stripUndefined(val);
    }
  }
  return clean;
};
