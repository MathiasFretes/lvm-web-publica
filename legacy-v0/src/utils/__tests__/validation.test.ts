import { stripUndefined } from '../validation';
import { describe, it, expect } from 'vitest';

describe('stripUndefined', () => {
  describe('primitive values', () => {
    it('should return primitive values unchanged', () => {
      expect(stripUndefined('hello')).toBe('hello');
      expect(stripUndefined(123)).toBe(123);
      expect(stripUndefined(true)).toBe(true);
      expect(stripUndefined(null)).toBe(null);
    });

    it('should return undefined as-is (passed through)', () => {
      expect(stripUndefined(undefined)).toBeUndefined();
    });
  });

  describe('flat objects', () => {
    it('should remove undefined properties', () => {
      const input = { name: 'John', email: undefined, age: 30 };
      const result = stripUndefined(input);
      expect(result).toEqual({ name: 'John', age: 30 });
      expect('email' in result).toBe(false);
    });

    it('should preserve null values', () => {
      const input = { name: 'John', address: null, age: 30 };
      const result = stripUndefined(input);
      expect(result).toEqual({ name: 'John', address: null, age: 30 });
      expect(result.address).toBeNull();
    });

    it('should handle object with all undefined values', () => {
      const input = { a: undefined, b: undefined };
      const result = stripUndefined(input);
      expect(result).toEqual({});
    });

    it('should handle empty object', () => {
      expect(stripUndefined({})).toEqual({});
    });
  });

  describe('nested objects', () => {
    it('should recursively remove undefined from nested objects', () => {
      const input = {
        user: {
          name: 'John',
          details: {
            age: undefined,
            city: 'NYC'
          }
        }
      };
      const result = stripUndefined(input);
      expect(result).toEqual({
        user: {
          name: 'John',
          details: {
            city: 'NYC'
          }
        }
      });
    });

    it('should preserve null in nested objects', () => {
      const input = {
        user: {
          name: 'John',
          details: {
            address: null
          }
        }
      };
      const result = stripUndefined(input);
      expect(result).toEqual({
        user: {
          name: 'John',
          details: {
            address: null
          }
        }
      });
    });

    it('should handle deeply nested objects', () => {
      const input = {
        level1: {
          level2: {
            level3: {
              value: 'deep',
              deleted: undefined
            }
          }
        }
      };
      const result = stripUndefined(input);
      expect(result).toEqual({
        level1: {
          level2: {
            level3: {
              value: 'deep'
            }
          }
        }
      });
    });

    it('should handle objects that become empty after stripping (keeps empty objects)', () => {
      const input = {
        user: {
          onlyUndefined: undefined
        }
      };
      const result = stripUndefined(input);
      expect(result).toEqual({ user: {} });
      expect(result.user).toEqual({});
    });
  });

  describe('arrays', () => {
    it('should process arrays and clean their elements', () => {
      const input = {
        items: [
          { name: 'a', value: undefined },
          { name: 'b', value: 2 },
          { name: 'c', value: undefined }
        ]
      };
      const result = stripUndefined(input);
      expect(result).toEqual({
        items: [
          { name: 'a' },
          { name: 'b', value: 2 },
          { name: 'c' }
        ]
      });
    });

    it('should preserve null within arrays', () => {
      const input = {
        items: [
          { name: 'a', value: null },
          { name: 'b', value: 2 }
        ]
      };
      const result = stripUndefined(input);
      expect(result).toEqual({
        items: [
          { name: 'a', value: null },
          { name: 'b', value: 2 }
        ]
      });
    });

    it('should preserve arrays including undefined (maps elements but does not filter)', () => {
      const input = {
        tags: ['react', undefined, 'typescript', null, undefined]
      };
      const result = stripUndefined(input);
      expect(result.tags.length).toBe(5);
      expect(result.tags).toContain('react');
      expect(result.tags).toContain('typescript');
      expect(result.tags).toContain(null);
    });

    it('should handle empty array', () => {
      expect(stripUndefined({ items: [] })).toEqual({ items: [] });
    });

    it('should handle nested arrays (processes objects inside arrays)', () => {
      const input = {
        matrix: [
          [{ a: 1 }, { a: undefined }],
          [{ b: undefined }, { b: 2 }]
        ]
      };
      const result = stripUndefined(input);
      expect(result.matrix[0][0]).toEqual({ a: 1 });
      expect(result.matrix[0][1]).toEqual({});
      expect(result.matrix[1][1]).toEqual({ b: 2 });
    });
  });

  describe('mixed structures', () => {
    it('should handle complex real-world data structure', () => {
      const input = {
        id: 'doc-123',
        title: 'Event Title',
        description: undefined,
        date: '2024-01-15',
        metadata: {
          author: 'John',
          tags: ['event', 'important'],
          stats: {
            views: 100,
            likes: undefined,
            shares: 5
          }
        },
        optionalFields: {
          url: null,
          imageUrl: undefined,
          videoUrl: null
        }
      };
      const result = stripUndefined(input);
      expect(result).toEqual({
        id: 'doc-123',
        title: 'Event Title',
        date: '2024-01-15',
        metadata: {
          author: 'John',
          tags: ['event', 'important'],
          stats: {
            views: 100,
            shares: 5
          }
        },
        optionalFields: {
          url: null,
          videoUrl: null
        }
      });
    });
  });

  describe('edge cases', () => {
    it('should handle Date objects as plain objects', () => {
      const date = new Date('2024-01-15T10:00:00.000Z');
      const input = { createdAt: date };
      const result = stripUndefined(input);
      expect(result.createdAt).toEqual({});
    });

    it('should handle functions (pass through)', () => {
      const fn = () => {};
      const input = { callback: fn };
      const result = stripUndefined(input);
      expect(result.callback).toBe(fn);
    });
  });
});
