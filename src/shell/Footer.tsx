import { Mark } from '../brand/Mark'

/**
 * Footer — quiet, honest. Includes "Talk to a human" because trust is shown,
 * not claimed.
 */
export function Footer() {
  const links = ['Verify everything', 'Risk disclosure', 'Learn']
  return (
    <footer style={{ borderTop: '1px solid var(--ink-12)', background: 'var(--surface)' }}>
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '40px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mark size={24} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--ink)' }}>heliobond</span>
        </div>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-60)', flexWrap: 'wrap' }}>
          {links.map((l) => (
            <button
              key={l}
              className="hb-textlink"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--ink-60)' }}
            >
              {l}
            </button>
          ))}
          <button
            className="hb-textlink"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--ink)', fontWeight: 600 }}
          >
            Talk to a human
          </button>
        </div>
      </div>
    </footer>
  )
}
