import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePublicContent } from '../data/PublicContentContext'
import { parsePublicContent, type PublicContent } from '../data/publicContent'

function countSummary(value: PublicContent): string {
  const count = (amount: number, singular: string, plural: string) => `${amount} ${amount === 1 ? singular : plural}`
  return [count(value.events.length, 'evento', 'eventos'), count(value.sermons.length, 'prédica', 'prédicas'), count(value.venues.length, 'sede', 'sedes')].join(' · ')
}

function serviceReturnUrl(): string {
  const candidate = new URLSearchParams(window.location.search).get('returnTo')
  if (!candidate) return ''
  try {
    const url = new URL(candidate)
    if (['127.0.0.1', 'localhost'].includes(url.hostname) && ['http:', 'https:'].includes(url.protocol))
      return url.toString()
  } catch {
    // Ignore an invalid or external return URL.
  }
  return ''
}

export function ImportPreviewPage() {
  const navigate = useNavigate()
  const { content, source, importContent, reset } = usePublicContent()
  const [pending, setPending] = useState<{ filename: string; content: PublicContent } | null>(null)
  const [error, setError] = useState('')
  const returnTo = serviceReturnUrl()

  async function selectFile(file: File) {
    try {
      const content = parsePublicContent(JSON.parse(await file.text()))
      setPending({ filename: file.name, content })
      setError('')
    } catch (cause) {
      setPending(null)
      setError(cause instanceof Error ? cause.message : 'No se pudo leer el archivo')
    }
  }

  function apply() {
    if (!pending) return
    try {
      importContent(pending.content)
      setPending(null)
      navigate('/eventos')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo guardar la preview local')
    }
  }

  return <div className="preview-import container">
    <p className="eyebrow">M7.9C · intercambio local</p>
    <h1>Cargar contenido desde LVM Service</h1>
    <p>Selecciona un archivo PublicContent 0.1. Revísalo antes de aplicarlo. La preview se guarda solo en este navegador; no publica nada en Internet.</p>
    <p className="preview-note" role="status">Origen actual: {source === 'imported' ? 'archivo importado' : 'fixtures de demostración'} · {countSummary(content)}</p>
    {error && <p role="alert" className="preview-error">{error}</p>}
    <label className="preview-file-label">Seleccionar PublicContent 0.1
      <input type="file" accept=".json,application/json" onChange={(event) => {
        const file = event.target.files?.[0]
        if (file) void selectFile(file)
        event.target.value = ''
      }} />
      <span className="preview-file-control">Elegir archivo JSON</span>
    </label>
    {pending && <section className="preview-import-review" aria-label="Revisar contenido importado">
      <h2>Revisar {pending.filename}</h2>
      <p>{countSummary(pending.content)}</p>
      <ul>
        {pending.content.events.map((item) => <li key={`event-${item.id}`}>Evento: {item.title}</li>)}
        {pending.content.sermons.map((item) => <li key={`sermon-${item.id}`}>Prédica: {item.title}</li>)}
        {pending.content.venues.map((item) => <li key={`venue-${item.id}`}>Sede: {item.name}</li>)}
      </ul>
      <div className="preview-import-actions">
        <button className="button button-gold" onClick={apply}>Aplicar a esta preview</button>
        <button className="button button-outline-navy" onClick={() => setPending(null)}>Cancelar</button>
      </div>
    </section>}
    <div className="preview-import-actions">
      <Link className="button button-outline-navy" to="/">Volver al inicio</Link>
      {returnTo && <a className="button button-outline-navy" href={returnTo} rel="noopener noreferrer">Volver a LVM Service</a>}
      {source === 'imported' && <button className="button button-outline-navy" onClick={reset}>Restaurar fixtures de demostración</button>}
    </div>
  </div>
}
