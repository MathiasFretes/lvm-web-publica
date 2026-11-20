/**
 * Validation Utilities — Legacy Re-export
 *
 * DEPRECATED: This file exists for backwards compatibility.
 * The validation module has been moved to src/utils/_validation_new/
 *
 * New imports should use:
 * - Core validators: import { sanitize, required, email, ... } from './utils/_validation_new'
 * - Entity validators: import { validateEvento, validatePredica, ... } from './utils/_validation_new'
 * - All validators: import * as validation from './utils/_validation_new'
 */

export * from './_validation_new';
