import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules() })
describe('published public content', () => {
  it('selects a singleton by its canonical ID and reports an initial request failure', async () => {
    vi.useFakeTimers()
    try {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([
        { collection: 'contenido', id: 'home', data: { heroTitle: 'Inicio' } },
        { collection: 'contenido', id: 'general', data: { devocionalTitulo: 'Lectura' } },
      ]))))
      // @ts-expect-error JavaScript compatibility adapter has no declaration file
      const { contenidoService } = await import('./contentService.js')
      const callback = vi.fn()
      const unsubscribe = contenidoService.subscribeGeneral(callback)
      await vi.waitFor(() => expect(callback).toHaveBeenCalledWith({ id: 'general', devocionalTitulo: 'Lectura' }, null))
      unsubscribe()
      vi.resetModules()
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Offline')))
      // @ts-expect-error JavaScript compatibility adapter has no declaration file
      const failed = await import('./contentService.js')
      const onFailure = vi.fn()
      const stop = failed.contenidoService.subscribeGeneral(onFailure)
      await vi.waitFor(() => expect(onFailure).toHaveBeenCalledWith(null, expect.objectContaining({ message: 'Offline' })))
      stop()
    } finally { vi.useRealTimers() }
  })
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
