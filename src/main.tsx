import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PublicContentProvider } from './data/PublicContentContext'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-800.css'
import './styles.css'

const previewMode = import.meta.env.DEV || import.meta.env.VITE_LVM_PUBLIC_PREVIEW === '1'

function UnpublishedSite() {
  return (
    <main className="unpublished-site">
      <div className="unpublished-card">
        <span className="brand-mark" aria-hidden="true" />
        <p className="eyebrow">LA VOZ MISIONERA</p>
        <h1>Estamos preparando este espacio.</h1>
        <p>El contenido público estará disponible cuando se publique desde LVM Service.</p>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {previewMode ? <PublicContentProvider><App /></PublicContentProvider> : <UnpublishedSite />}
    </BrowserRouter>
  </React.StrictMode>,
)
