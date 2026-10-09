import { useState } from 'react'
import { PageBanner, PreviewNote } from '../components/Shell'
import { usePublicContent } from '../data/PublicContentContext'

const weekdays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']

export function monthCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  return [...Array<null>(firstDay).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)]
}

export function EventsPage() {
  const { content: { events } } = usePublicContent()
  const [month, setMonth] = useState(() => {
    const date = events[0]?.date ?? '2026-10-01'
    const [year, month] = date.split('-').map(Number)
    return new Date(year, month - 1, 1)
  })
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const year = month.getFullYear()
  const monthNumber = month.getMonth()
  const monthLabel = new Intl.DateTimeFormat('es-PY', { month: 'long', year: 'numeric' }).format(month)
  const inMonth = events.filter((event) => {
    const [eventYear, eventMonth] = event.date.split('-').map(Number)
    return eventYear === year && eventMonth === monthNumber + 1
  })
  const shown = selectedDay === null ? inMonth : inMonth.filter((event) => Number(event.date.slice(-2)) === selectedDay)

  function changeMonth(delta: number) {
    setMonth(new Date(year, monthNumber + delta, 1))
    setSelectedDay(null)
  }

  return (
    <>
      <PageBanner eyebrow="AGENDA" title="Calendario" accent="mensual" />
      <div className="page-content container">
        <PreviewNote />
        <section className="calendar-card" aria-label={`Calendario de ${monthLabel}`}>
          <div className="calendar-head">
            <h2>{monthLabel}</h2>
            <div className="calendar-controls">
              <button type="button" aria-label="Mes anterior" onClick={() => changeMonth(-1)}>‹</button>
              <button type="button" aria-label="Mes siguiente" onClick={() => changeMonth(1)}>›</button>
            </div>
          </div>
          <div className="calendar-grid calendar-weekdays">
            {weekdays.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="calendar-grid calendar-days">
            {monthCells(year, monthNumber).map((day, index) => {
              const dayEvents = inMonth.filter((event) => Number(event.date.slice(-2)) === day)
              return day === null
                ? <span key={`empty-${index}`} aria-hidden="true" />
                : <button
                    type="button"
                    key={day}
                    className={`${dayEvents.length ? 'has-event ' : ''}${selectedDay === day ? 'selected' : ''}`}
                    aria-label={`${day} de ${monthLabel}${dayEvents.length ? `, ${dayEvents.length} evento${dayEvents.length === 1 ? '' : 's'}` : ''}`}
                    aria-pressed={selectedDay === day}
                    onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                  >
                    {day}
                    {dayEvents.length > 0 && <span className={dayEvents[0].kind === 'culto' ? 'event-dot regular' : 'event-dot'} aria-hidden="true" />}
                  </button>
            })}
          </div>
          <div className="calendar-legend"><span><i className="event-dot" /> Encuentro especial</span><span><i className="event-dot regular" /> Servicio regular</span></div>
        </section>
        <section className="listing-section" aria-labelledby="events-title">
          <div className="listing-heading"><div><p className="eyebrow">PRÓXIMOS ENCUENTROS</p><h2 id="events-title">{selectedDay ? `Eventos del ${selectedDay}` : 'Compartamos juntos'}</h2></div>{selectedDay && <button className="text-button" onClick={() => setSelectedDay(null)}>Ver todo el mes</button>}</div>
          {shown.length ? <div className="event-list">{shown.map((event) => <article className="event-card" key={event.id}><div className="event-date"><strong>{Number(event.date.slice(-2))}</strong><span>{new Intl.DateTimeFormat('es-PY', { month: 'short' }).format(new Date(`${event.date}T12:00:00`))}</span></div><div><span className="tag">{event.kind === 'culto' ? 'Servicio regular' : 'Encuentro especial'}</span><h3>{event.title}</h3><p>{event.description}</p><small>{event.time} · {event.venue}</small></div></article>)}</div> : <div className="empty-state"><h3>Sin encuentros de ejemplo en este período</h3><p>Elegí otro mes para explorar la preview.</p></div>}
        </section>
      </div>
    </>
  )
}
