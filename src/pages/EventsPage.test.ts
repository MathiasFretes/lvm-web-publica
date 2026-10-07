import { describe, expect, it } from 'vitest'
import { monthCells } from './EventsPage'

describe('calendar grid', () => {
  it('starts on Sunday and includes leap-day when applicable', () => {
    const cells = monthCells(2024, 1)
    expect(cells.slice(0, 4)).toEqual([null, null, null, null])
    expect(cells.at(-1)).toBe(29)
  })
})
