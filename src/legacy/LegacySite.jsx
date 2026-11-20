import React, { lazy, Suspense, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarDesktop from '../../legacy-v0/src/navigation/NavbarDesktop'
import { ThemeProvider } from '../../legacy-v0/src/ThemeContext'

const loaders = import.meta.glob('../../legacy-v0/src/screens/*Screen.tsx')
const names = {
  inicio: ['HomeScreen','Inicio'], nosotros: ['NosotrosScreen','Nosotros'], pastores: ['PastoresScreen','Pastores'],
  predicas: ['PredicasScreen','Prédicas'], biblioteca: ['BibliotecaScreen','Biblioteca'], envivo: ['EnVivoScreen','En vivo'],
  devocional: ['DevocionalScreen','Devocional'], sedes: ['SedesScreen','Sedes'], ministerios: ['MinisteriosScreen','Ministerios'],
  celulas: ['CelulasScreen','Células'], oracion: ['OracionScreen','Oración'], nuevo: ['NuevoScreen','Soy nuevo'],
  calendario: ['CalendarioScreen','Calendario'], donaciones: ['DonacionesScreen','Donaciones'], boletin: ['BoletinScreen','Boletín'],
  redes: ['RedesScreen','Redes'], privacidad: ['PrivacidadScreen','Privacidad'], contacto: ['ContactoScreen','Contacto'],
}
const screens = Object.fromEntries(Object.entries(names).map(([page,[file]]) => [page,lazy(async()=>{
  const module = await loaders[`../../legacy-v0/src/screens/${file}.tsx`]()
  return {default:module.default || module[file]}
})]))

export default function LegacySite() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menu,setMenu] = useState(false)
  const page = location.pathname === '/' ? 'inicio' : location.pathname.slice(1)
  const Screen = screens[page]
  function go(next) {
    if(next==='admin'){ window.location.assign('/service/admin'); return }
    setMenu(false)
    navigate(next==='inicio' ? '/' : `/${next}`)
    window.scrollTo(0,0)
  }
  return <ThemeProvider>
    <div className="legacy-site">
      <a className="skip-link" href="#public-main">Saltar al contenido</a>
      <div className="legacy-desktop-header"><NavbarDesktop activePage={page} onNavigate={go} onSecretTap={()=>go('inicio')} isScrolled={page!=='inicio'} /></div>
      <header className="legacy-mobile-header">
        <a className="brand" href="/">La Voz <strong>Misionera</strong></a>
        <button className="button button-navy" aria-expanded={menu} aria-controls="public-menu" onClick={()=>setMenu(!menu)}>Menú</button>
      </header>
      {menu && <nav id="public-menu" className="legacy-mobile-menu" aria-label="Páginas públicas">
        {Object.entries(names).map(([key,[,label]])=><a key={key} href={key==='inicio'?'/':`/${key}`} onClick={event=>{event.preventDefault();go(key)}}>{label}</a>)}
      </nav>}
      <main id="public-main" className={page==='inicio'?'legacy-home':'legacy-page'}>
        <Suspense fallback={<p role="status">Cargando…</p>}>
          {Screen ? <Screen key={page} onNavigate={go} onBack={()=>go('inicio')} onSecretTap={()=>go('inicio')} /> : <h1>Página no encontrada</h1>}
        </Suspense>
      </main>
      <a className="legacy-worship-link button button-gold" href="/app">Ingresar a Worship ↗</a>
    </div>
  </ThemeProvider>
}
