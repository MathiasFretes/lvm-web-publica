import { createContext, useContext, useState, type ReactNode } from 'react'
import { parsePublicContent, type PublicContent } from './publicContent'
import { events, sermons, venues } from './preview'

const storageKey = 'lvm.public-content.preview.0.1'
const fixture: PublicContent = {
  schemaVersion: '0.1',
  generatedAt: '2026-10-07T00:00:00.000Z',
  events,
  sermons,
  venues,
}

type PreviewState = { content: PublicContent; source: 'fixture' | 'imported' }
type PreviewContext = PreviewState & {
  importContent: (value: unknown) => void
  reset: () => void
}

const Context = createContext<PreviewContext | null>(null)

function initialState(): PreviewState {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved) return { content: parsePublicContent(JSON.parse(saved)), source: 'imported' }
  } catch {
    // An invalid local preview never prevents the public site from opening.
  }
  return { content: fixture, source: 'fixture' }
}

export function PublicContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState)

  function importContent(value: unknown) {
    const content = parsePublicContent(value)
    localStorage.setItem(storageKey, JSON.stringify(content))
    setState({ content, source: 'imported' })
  }

  function reset() {
    localStorage.removeItem(storageKey)
    setState({ content: fixture, source: 'fixture' })
  }

  return <Context.Provider value={{ ...state, importContent, reset }}>{children}</Context.Provider>
}

export function usePublicContent(): PreviewContext {
  const value = useContext(Context)
  if (!value) throw new Error('PublicContentProvider is missing')
  return value
}
