import { Route, Routes } from 'react-router-dom'
import { Footer, Header, MobileNav } from './components/Shell'
import { HomePage } from './pages/HomePage'
import { EventsPage } from './pages/EventsPage'
import { SermonsPage } from './pages/SermonsPage'
import { VenuesPage } from './pages/VenuesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ImportPreviewPage } from './pages/ImportPreviewPage'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/predicas" element={<SermonsPage />} />
          <Route path="/sedes" element={<VenuesPage />} />
          <Route path="/preview/import" element={<ImportPreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}
