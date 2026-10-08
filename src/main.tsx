import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PublicContentProvider } from './data/PublicContentContext'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PublicContentProvider><App /></PublicContentProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
