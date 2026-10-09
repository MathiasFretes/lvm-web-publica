import { useState } from 'react'
import { PageBanner, PreviewNote } from '../components/Shell'
import { usePublicContent } from '../data/PublicContentContext'

export function SermonsPage() {
  const { content: { sermons } } = usePublicContent()
  const series = ['Todas', ...new Set(sermons.map((sermon) => sermon.series))]
  const [activeSeries, setActiveSeries] = useState('Todas')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const shown = sermons.filter((sermon) =>
    (activeSeries === 'Todas' || sermon.series === activeSeries) &&
    `${sermon.title} ${sermon.speaker} ${sermon.series}`.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')),
  )

  return (
    <>
      <PageBanner eyebrow="ARCHIVO" title="Prédicas y" accent="series" />
      <div className="page-content container">
        <PreviewNote />
        <div className="listing-heading"><div><p className="eyebrow">MENSAJES PARA EL CAMINO</p><h2>Enseñanzas para volver a escuchar</h2></div><label className="search-field">Buscar prédicas<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Título, serie o predicador" /></label></div>
        <div className="filter-chips" role="group" aria-label="Filtrar por serie">
          {series.map((name) => <button key={name} type="button" className={activeSeries === name ? 'active' : ''} aria-pressed={activeSeries === name} onClick={() => { setActiveSeries(name); setSelected(null) }}>{name}</button>)}
        </div>
        {shown.length ? <div className="sermon-grid">{shown.map((sermon, index) => <article className="sermon-card" key={sermon.id}><div className={`sermon-art art-${index % 3}`} aria-hidden="true"><span>✦</span></div><div className="sermon-card-body"><span className="tag">{sermon.series}</span><h3>{sermon.title}</h3><p>{sermon.speaker} · {sermon.duration}</p><button type="button" className="text-button" aria-expanded={selected === sermon.id} onClick={() => setSelected(selected === sermon.id ? null : sermon.id)}>{selected === sermon.id ? 'Cerrar resumen' : 'Leer resumen'} <span aria-hidden="true">→</span></button>{selected === sermon.id && <p className="sermon-summary">{sermon.summary}<br /><small>Recurso de video/audio pendiente de publicación.</small></p>}</div></article>)}</div> : <div className="empty-state"><h3>No encontramos prédicas de ejemplo</h3><p>Probá otra búsqueda o elegí otra serie.</p><button className="text-button" onClick={() => { setQuery(''); setActiveSeries('Todas') }}>Mostrar todas</button></div>}
      </div>
    </>
  )
}
