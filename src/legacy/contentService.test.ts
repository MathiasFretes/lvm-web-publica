import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules() })
describe('published public content', () => {
  it('requests only published data without an administrator cookie', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify([
      { collection: 'eventos', id: 'event', data: { name: 'Encuentro' } },
    ]), { status: 200 }))
    vi.stubGlobal('fetch', fetch)
    // The legacy adapter is intentionally JavaScript, shared with V0 consumers.
    // @ts-expect-error JavaScript compatibility adapter has no declaration file
    const { eventosService } = await import('./contentService.js')
    expect(await eventosService.getAll()).toEqual([{ id: 'event', name: 'Encuentro' }])
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('published=eq.true'), { credentials: 'omit', cache: 'no-store' })
  })
})
