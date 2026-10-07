import { Link } from 'react-router-dom'
import { PreviewNote } from '../components/Shell'
import { events, sermons, venues } from '../data/preview'

export function HomePage() {
  const next = events[0]
  const featured = sermons[0]
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-overlay" />
        <div className="home-hero-content container">
          <span className="hero-location">ASUNCIÓN · PARAGUAY</span>
          <h1>Un lugar para encontrar <em>esperanza y propósito.</em></h1>
          <p>La fe se vive mejor en comunidad. Descubrí un espacio para crecer y compartir.</p>
          <div className="hero-actions">
            <Link className="button button-gold" to="/sedes">Planificá tu visita <span aria-hidden="true">↗</span></Link>
            <Link className="button button-outline-light" to="/eventos">Ver próximos encuentros</Link>
          </div>
        </div>
        <span className="hero-scroll" aria-hidden="true">DESLIZÁ PARA EXPLORAR ↓</span>
      </section>
      <section className="home-intro container">
        <PreviewNote />
        <p className="eyebrow">BIENVENIDO A CASA</p>
        <h2>Hay un lugar para vos <em>entre nosotros.</em></h2>
        <p className="section-lead">Queremos que cada persona pueda encontrar comunidad, escuchar un mensaje de esperanza y dar su próximo paso.</p>
        <div className="home-feature-grid">
          <article className="feature-card">
            <span className="feature-symbol" aria-hidden="true">◷</span>
            <p className="card-kicker">PRÓXIMO ENCUENTRO · EJEMPLO</p>
            <h3>{next.title}</h3>
            <p>{next.description}</p>
            <Link to="/eventos">Explorar agenda <span aria-hidden="true">→</span></Link>
          </article>
          <article className="feature-card">
            <span className="feature-symbol" aria-hidden="true">✧</span>
            <p className="card-kicker">MENSAJE DESTACADO · EJEMPLO</p>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            <Link to="/predicas">Ver prédicas <span aria-hidden="true">→</span></Link>
          </article>
          <article className="feature-card">
            <span className="feature-symbol" aria-hidden="true">⌖</span>
            <p className="card-kicker">CERCA DE VOS</p>
            <h3>{venues.length} sedes para explorar</h3>
            <p>Conocé dónde se reúne la comunidad de La Voz Misionera.</p>
            <Link to="/sedes">Conocer sedes <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>
      <section className="home-quote">
        <div className="container">
          <p className="eyebrow">NUESTRA INVITACIÓN</p>
          <h2>Caminar juntos hace la diferencia.</h2>
          <Link className="button button-gold" to="/sedes">Encontrá tu lugar</Link>
        </div>
      </section>
    </>
  )
}
