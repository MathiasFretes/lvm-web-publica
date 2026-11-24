import { serializeDoc } from '../serializeDoc';
import { describe, it, expect } from 'vitest';

describe('serializeDoc', () => {
  describe('null handling', () => {
    it('should preserve null values', () => {
      const input = { name: 'John', address: null, age: 30 };
      const result = serializeDoc(input);
      expect(result).toEqual({ name: 'John', address: null, age: 30 });
      expect(result.address).toBeNull();
    });

    it('should convert undefined to null', () => {
      const input = { name: 'John', address: undefined, age: 30 } as any;
      const result = serializeDoc(input);
      expect(result).toEqual({ name: 'John', address: null, age: 30 });
      expect(result.address).toBeNull();
    });

    it('should handle mixed null and undefined', () => {
      const input = {
        field1: null,
        field2: undefined,
        field3: 'value'
      } as any;
      const result = serializeDoc(input);
      expect(result).toEqual({
        field1: null,
        field2: null,
        field3: 'value'
      });
    });
  });

  describe('primitive values', () => {
    it('should preserve strings', () => {
      const input = { name: 'Hello World' };
      expect(serializeDoc(input)).toEqual({ name: 'Hello World' });
    });

    it('should preserve numbers', () => {
      const input = { count: 42, price: 3.14 };
      expect(serializeDoc(input)).toEqual({ count: 42, price: 3.14 });
    });

    it('should preserve booleans', () => {
      const input = { active: true, deleted: false };
      expect(serializeDoc(input)).toEqual({ active: true, deleted: false });
    });
  });

  describe('Firestore Timestamp conversion', () => {
    it('should convert Firestore Timestamp to ISO string', () => {
      const timestamp = {
        toDate: () => new Date('2024-06-15T10:30:00.000Z')
      };
      const input = { createdAt: timestamp };
      const result = serializeDoc(input);
      expect(result.createdAt).toBe('2024-06-15T10:30:00.000Z');
    });

    it('should handle multiple timestamps', () => {
      const timestamp1 = {
        toDate: () => new Date('2024-01-01T00:00:00.000Z')
      };
      const timestamp2 = {
        toDate: () => new Date('2024-12-31T23:59:59.000Z')
      };
      const input = { startDate: timestamp1, endDate: timestamp2 };
      const result = serializeDoc(input);
      expect(result.startDate).toBe('2024-01-01T00:00:00.000Z');
      expect(result.endDate).toBe('2024-12-31T23:59:59.000Z');
    });
  });

  describe('Date object conversion', () => {
    it('should convert Date objects to ISO string', () => {
      const input = { timestamp: new Date('2024-06-15T10:30:00.000Z') };
      const result = serializeDoc(input);
      expect(result.timestamp).toBe('2024-06-15T10:30:00.000Z');
    });
  });

  describe('array handling', () => {
    it('should preserve simple arrays', () => {
      const input = { tags: ['react', 'typescript'] };
      expect(serializeDoc(input)).toEqual({ tags: ['react', 'typescript'] });
    });

    it('should convert Timestamps in arrays', () => {
      const timestamp = {
        toDate: () => new Date('2024-06-15T10:30:00.000Z')
      };
      const input = { timestamps: [timestamp, 'plain string'] };
      const result = serializeDoc(input);
      expect(result.timestamps).toEqual(['2024-06-15T10:30:00.000Z', 'plain string']);
    });
  });

  describe('nested objects', () => {
    it('should recursively serialize nested objects', () => {
      const timestamp = {
        toDate: () => new Date('2024-06-15T10:30:00.000Z')
      };
      const input = {
        user: {
          name: 'John',
          createdAt: timestamp
        }
      };
      const result = serializeDoc(input);
      expect(result).toEqual({
        user: {
          name: 'John',
          createdAt: '2024-06-15T10:30:00.000Z'
        }
      });
    });

    it('should handle deeply nested objects', () => {
      const timestamp = {
        toDate: () => new Date('2024-06-15T10:30:00.000Z')
      };
      const input = {
        level1: {
          level2: {
            level3: {
              createdAt: timestamp
            }
          }
        }
      };
      const result = serializeDoc(input);
      expect(result.level1.level2.level3.createdAt).toBe('2024-06-15T10:30:00.000Z');
    });

    it('should convert undefined to null in nested objects', () => {
      const input = {
        outer: {
          inner: undefined
        }
      } as any;
      const result = serializeDoc(input);
      expect(result).toEqual({
        outer: {
          inner: null
        }
      });
    });
  });

  describe('real-world Firestore document', () => {
    it('should handle complete event document', () => {
      const createdAt = { toDate: () => new Date('2024-01-15T10:00:00.000Z') };
      const input = {
        id: 'event-123',
        titulo: 'Sunday Service',
        descripcion: 'Weekly worship service',
        fecha: '2024-01-15',
        ubicacion: null,
        url: undefined,
        createdAt,
        updatedAt: createdAt,
        metadata: {
          authorId: 'user-456',
          tags: ['service', 'worship'],
          stats: {
            attendance: 150
          }
        }
      } as any;
      const result = serializeDoc(input);
      expect((result as any).id).toBeUndefined();
      expect(result).toEqual({
        titulo: 'Sunday Service',
        descripcion: 'Weekly worship service',
        fecha: '2024-01-15',
        ubicacion: null,
        url: null,
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z',
        metadata: {
          authorId: 'user-456',
          tags: ['service', 'worship'],
          stats: {
            attendance: 150
          }
        }
      });
    });
  });

  describe('id field handling', () => {
    it('should strip id field', () => {
      const input = { id: 'doc-123', name: 'Test' };
      const result = serializeDoc<{ name: string }>(input);
      expect((result as any).id).toBeUndefined();
      expect(result.name).toBe('Test');
    });
  });
});
