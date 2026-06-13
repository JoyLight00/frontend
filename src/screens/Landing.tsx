import { Button, StatBlock } from '../components'
import { Helio } from '../brand/Helio'
import { HB_DATA } from '../data'
import type { Screen } from '../types'

/**
 * Landing — public hero. Helio dominates; three live counters deep-link to
 * on-chain proof. Thesis in display type, sentence case, from one dollar.
 */
export interface LandingProps {
  onConnect: () => void
  onNav: (screen: Screen) => void
}

const HOW_STEPS: [string, string][] = [
  ['Deposit USDC', 'From one dollar. You always see what you receive before you sign.'],
  ['Receive shares', 'Shares — technically SEP-41 tokens called HBS. Your stake in the whole pool.'],
  ['The pool funds projects', 'Capital is deployed to verified, oracle-scored green projects.'],
  ['Returns flow back', 'Share price reflects expected returns. Withdraw your liquid share anytime.'],
]

const VERIFY_ROWS: [string, string][] = [
  ['ProjectRegistry', 'C…7K4Z'],
  ['InvestmentVault', 'C…9QWJ'],
  ['Oracle update cadence', 'daily'],
  ['Independent audit', 'published ↗'],
]

export function Landing({ onConnect, onNav }: LandingProps) {
  const d = HB_DATA

  return (
    <main>
      {/* Hero */}
      <section
        className="hb-hero-grid hb-rise"
        style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px 40px' }}
      >
        <div>
          <div className="hb-eyebrow" style={{ marginBottom: 20 }}>Green bonds · on Stellar</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 5.4vw, 4.6rem)',
              lineHeight: 0.99,
              letterSpacing: '-0.02em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Own a piece of the energy transition.
            <span style={{ color: 'var(--ink-60)' }}> From one dollar.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 19, lineHeight: 1.5, color: 'var(--ink-60)', maxWidth: 520, margin: '22px 0 32px' }}>
            A transparent pool funding verified green projects. Every figure traces back to chain in two taps — no surprises, ever.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={onConnect}>
              Start with one dollar
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('explore')}>
              See where the pool works
            </Button>
          </div>
        </div>

        <div className="hb-hero-helio" style={{ display: 'flex', justifyContent: 'center' }}>
          <Helio size={380} motes={d.pool.projectsFunded} />
        </div>
      </section>

      {/* Live counters */}
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: '8px 32px 64px' }}>
        <div
          className="hb-counter-grid"
          style={{ background: 'var(--ink-12)', border: '1px solid var(--ink-12)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}
        >
          <div style={counterCell}>
            <StatBlock label="Pool value" value="$4,862,014" decimals=".55" size="lg" href="#" />
          </div>
          <div style={counterCell}>
            <StatBlock label="Projects funded" value="14" size="lg" href="#" />
          </div>
          <div style={counterCell}>
            <StatBlock label="Projected return rate" value="7.4" unit="%" size="lg" href="#" />
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-40)', margin: '14px 0 0', textAlign: 'center' }}>
          Live from the vault contract. Tap any figure for its on-chain proof.
        </p>
      </section>

      {/* How it works strip */}
      <section id="how" style={{ background: 'var(--surface)', borderTop: '1px solid var(--ink-12)', borderBottom: '1px solid var(--ink-12)', scrollMarginTop: 68 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-0.02em', margin: '0 0 8px', color: 'var(--ink)' }}>
            How it works
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-60)', margin: '0 0 36px', maxWidth: 560 }}>
            One pool, many projects. You deposit USDC and receive shares in a curated, oracle-scored portfolio.
          </p>
          <div className="hb-how-grid">
            {HOW_STEPS.map(([t, b], i) => (
              <div key={t}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: 13, color: 'var(--solar)', marginBottom: 10 }}>
                  <span style={{ color: 'var(--ink)' }}>0{i + 1}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, margin: '0 0 6px', color: 'var(--ink)' }}>{t}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-60)', margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verify everything */}
      <section id="verify" className="hb-verify-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px 80px', scrollMarginTop: 68 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-0.02em', margin: '0 0 14px', color: 'var(--ink)' }}>
            Verify everything
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-60)', margin: '0 0 16px' }}>
            Trust is shown, not claimed. The contracts are public, the oracle cadence is documented, and the return formula is written out in plain sight.
          </p>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: 14, color: 'var(--ink)', background: 'var(--ink-06)', borderRadius: 'var(--radius-input)', padding: '14px 16px' }}>
            expected return = investment × (credit + green) ÷ 200
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--ink-12)', border: '1px solid var(--ink-12)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
          {VERIFY_ROWS.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', padding: '16px 18px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--ink-60)' }}>{k}</span>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: 13.5, color: 'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

const counterCell = { background: 'var(--surface)', padding: '28px 24px' } as const
