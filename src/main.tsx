import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import LegacySite from './legacy/LegacySite'
import { PublicContentProvider } from './data/PublicContentContext'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-800.css'
import './styles.css'

const previewMode = import.meta.env.DEV || import.meta.env.VITE_LVM_PUBLIC_PREVIEW === '1'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {previewMode ? <PublicContentProvider><App /></PublicContentProvider> : <LegacySite />}
    </BrowserRouter>
  </React.StrictMode>,
)
