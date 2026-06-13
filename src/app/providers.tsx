'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * Session — the small bit of client state that must outlive a route change in
 * the click-through: whether a wallet is connected. It lives in the layout (so
 * it persists across client-side navigations) and is read by the TopBar and the
 * route pages. When real wiring lands, this is where the wallet kit / Soroban
 * account context would live.
 */
interface Session {
  connected: boolean
  setConnected: (value: boolean) => void
}

const SessionContext = createContext<Session | null>(null)

export function useSession(): Session {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within <Providers>')
  return ctx
}

export function Providers({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const value = useMemo(() => ({ connected, setConnected }), [connected])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
