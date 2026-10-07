import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageBanner, PreviewNote } from '../components/Shell'
import { venues } from '../data/preview'

export function VenuesPage() {
  const [selectedId, setSelectedId] = useState(venues[0].id)
  const selected = venues.find((venue) => venue.id === selectedId) ?? venues[0]

  return (
    <>
      <PageBanner eyebrow="UBICACIONES" title="Nuestras" accent="sedes" />
      <div className="page-content container">
        <PreviewNote />
        <div className="venues-layout">
          <section aria-label="Elegir una sede" className="venue-list">
            {venues.map((venue) => <button key={venue.id} type="button" className={`venue-option${selectedId === venue.id ? ' selected' : ''}`} aria-pressed={selectedId === venue.id} onClick={() => setSelectedId(venue.id)}><span className="venue-option-top"><strong>{venue.name}</strong><span className="tag">{venue.isMain ? 'Principal' : 'Anexo'}</span></span><span>{venue.zone}</span></button>)}
          </section>
          <section className="venue-detail" aria-live="polite" aria-label="Detalles de la sede seleccionada">
            <div className="venue-map-placeholder"><span className="map-pin" aria-hidden="true">⌖</span><span>{selected.name}</span></div>
            <div className="venue-detail-body"><p className="eyebrow">VENÍ A CONOCERNOS</p><h2>{selected.name}</h2><dl><div><dt>Zona</dt><dd>{selected.zone}</dd></div><div><dt>Dirección</dt><dd>{selected.address}</dd></div><div><dt>Horarios</dt><dd>{selected.hours}</dd></div></dl><p>La ubicación y los horarios se confirmarán antes de publicar esta página.</p><Link className="button button-navy" to="/eventos">Explorar encuentros</Link></div>
          </section>
        </div>
      </div>
    </>
  )
}
