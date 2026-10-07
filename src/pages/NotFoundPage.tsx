import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="not-found container"><p className="eyebrow">404</p><h1>Esta página no está aquí.</h1><p>Podés volver al inicio y seguir explorando La Voz Misionera.</p><Link className="button button-gold" to="/">Volver al inicio</Link></section>
}
