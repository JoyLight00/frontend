'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../components'
import { Mark } from '../brand/Mark'
import { useSession } from '../app/providers'

/**
 * TopBar — persistent nav rendered by the root layout. Analemma mark + Explore /
 * How it works / Learn, network status dot, language switcher, Connect. The whole
 * platform is explorable before connecting; that openness is the first act of
 * acceptance. Active state derives from the route; connection from the session.
 */
const NAV = [
  { href: '/explore', label: 'Explore' },
  { href: '/#how', label: 'How it works' },
  { href: '/#verify', label: 'Learn' },
] as const

export function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { connected } = useSession()

  // Scroll-spy for the anchor nav items (How it works / Learn). usePathname()
  // drops the hash, so those links can't derive an active state from the path —
  // observe their landing sections instead. SSR-safe: starts empty, fills client-side.
  const [activeHash, setActiveHash] = useState('')
  useEffect(() => {
    if (pathname !== '/') {
      setActiveHash('')
      return
    }
    const sections = ['how', 'verify']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top) setActiveHash(`#${top.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        padding: '0 32px',
        height: 68,
        background: 'color-mix(in srgb, var(--canvas) 86%, transparent)',
        backdropFilter: 'saturate(140%) blur(12px)',
        WebkitBackdropFilter: 'saturate(140%) blur(12px)',
        borderBottom: '1px solid var(--ink-12)',
      }}
    >
      <Link
        href="/"
        aria-label="Heliobond — home"
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
      >
        <Mark />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
          heliobond
        </span>
      </Link>

      <nav className="hb-topbar-nav" style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
        {NAV.map(({ href, label }) => {
          const active = href.includes('#')
            ? pathname === '/' && activeHash === href.slice(href.indexOf('#'))
            : pathname === href
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              style={{
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-body)',
                fontSize: 14.5,
                fontWeight: 500,
                color: active ? 'var(--ink)' : 'var(--ink-60)',
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-data)', fontSize: 12, color: 'var(--ink-60)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--growth)', boxShadow: '0 0 0 3px var(--growth-12)' }} />
          Testnet
        </span>
        <button
          aria-label="Language: English — change language"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--ink-60)',
          }}
        >
          EN
          <ChevronDown />
        </button>
        {connected ? (
          <button
            onClick={() => router.push('/portfolio')}
            aria-label="Your portfolio"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface)',
              border: '1px solid var(--ink-12)',
              borderRadius: 'var(--radius-pill)',
              height: 40,
              padding: '0 6px 0 14px',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontFamily: 'var(--font-data)', fontSize: 13, color: 'var(--ink)' }}>GBQH…9XQ</span>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--solar)' }} />
          </button>
        ) : (
          <Button variant="primary" size="md" onClick={() => router.push('/connect')}>
            Connect
          </Button>
        )}
      </div>
    </header>
  )
}

/** 1.5px-stroke chevron, matching the Lucide line-icon spec used system-wide. */
function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
