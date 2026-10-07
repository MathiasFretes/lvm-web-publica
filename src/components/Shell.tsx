import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', icon: '⌂', end: true },
  { to: '/eventos', label: 'Eventos', icon: '▦' },
  { to: '/predicas', label: 'Prédicas', icon: '▣' },
  { to: '/sedes', label: 'Sedes', icon: '⌖' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className={`site-header${location.pathname === '/' ? ' site-header-home' : ''}`}>
        <div className="header-inner container">
          <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label="La Voz Misionera, ir al inicio">
            <span className="brand-mark" aria-hidden="true">✦</span>
            <span>La Voz <strong>Misionera</strong></span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link className="header-cta" to="/sedes">Conocé nuestras sedes <span aria-hidden="true">↗</span></Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Menú móvil">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  )
}

export function MobileNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => isActive ? 'bottom-link active' : 'bottom-link'}>
          <span aria-hidden="true">{link.icon}</span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true">✦</span> La Voz <strong>Misionera</strong></Link>
          <p>Un lugar para encontrar comunidad, esperanza y propósito.</p>
        </div>
        <div>
          <h2>Explorá</h2>
          {links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
        </div>
        <div>
          <h2>Esta preview</h2>
          <p>Contenido de demostración. La publicación real dependerá de LVM Service.</p>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} La Voz Misionera · Preview M7.9A</div>
    </footer>
  )
}

export function PageBanner({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <section className="page-banner">
      <div className="container">
        <Link className="back-link" to="/">← Volver al inicio</Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title} {accent && <em>{accent}</em>}</h1>
        <span className="gold-rule" aria-hidden="true" />
      </div>
    </section>
  )
}

export function PreviewNote() {
  return <p className="preview-note" role="note">Vista de ejemplo · El contenido final será publicado desde LVM Service.</p>
}
