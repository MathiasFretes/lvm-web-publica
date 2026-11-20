/**
 * Jest type declarations for test files
 */

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeEnabled(): R;
      toBeDisabled(): R;
    }
  }
}

export {};
