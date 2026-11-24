import { describe, expect, it } from 'vitest'
import { safeWebUrl } from '../../legacy-v0/src/utils/safeWebUrl'

describe('published media links', () => {
  it('opens web links while rejecting scripts and embedded credentials', () => {
    expect(safeWebUrl('https://example.com/sermon')).toBe('https://example.com/sermon')
    for (const value of ['javascript:alert(1)', 'data:text/html,test', 'https://user:password@example.com', '', null]) expect(safeWebUrl(value)).toBeNull()
  })
})
