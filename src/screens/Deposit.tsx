'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Button, AmountInput } from '../components'
import { Helio } from '../brand/Helio'
import { vault } from '../wallet/vault'

/**
 * Deposit — the flow that must be perfect. One column, one decision per step:
 * amount (live preview from the vault) -> review in plain words -> pending (hash
 * from second zero) -> success (impact, not hype). Errors name cause + fix.
 */
export interface DepositProps {
  onDone: () => void
}

type DepositStep = 'amount' | 'review' | 'pending' | 'success'

const num = (chunks: ReactNode) => (
  <b className="hb-data" style={{ color: 'var(--ink)' }}>
    {chunks}
  </b>
)
const strong = (chunks: ReactNode) => <b style={{ color: 'var(--ink)' }}>{chunks}</b>

export function Deposit({ onDone }: DepositProps) {
  const t = useTranslations('Deposit')
  const [step, setStep] = useState<DepositStep>('amount')
  const [amount, setAmount] = useState('100')
  const n = parseFloat(amount) || 0
  const price = vault.sharePrice()
  const shares = vault.convertToShares(n)

  return (
    <main style={{ maxWidth: 520, margin: '0 auto', padding: '48px 24px 80px' }}>
      <Stepper step={step} />

      {step === 'amount' && (
        <Panel>
          <h1 style={h1Style}>{t('amountH1')}</h1>
          <AmountInput
            value={amount}
            onChange={setAmount}
            currency="USDC"
            balance="240.00"
            chips={[25, 50, 100]}
            preview={
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-60)' }}>
                {t.rich('preview', { shares: shares.toFixed(4), price, num })}
              </span>
            }
          />
          <p style={liqLine}>{t.rich('liquidLine', { b: strong })}</p>
          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%', marginTop: 20 }}
            disabled={n < 1}
            reason={n < 1 ? t('reasonMin') : undefined}
            onClick={() => setStep('review')}
          >
            {n >= 1 ? t('investCta', { amount: n }) : t('investCtaEmpty')}
          </Button>
        </Panel>
      )}

      {step === 'review' && (
        <Panel>
          <h1 style={h1Style}>{t('reviewH1', { amount: n })}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--ink-12)', borderRadius: 'var(--radius-input)', overflow: 'hidden', margin: '6px 0 20px' }}>
            <Row k={t('rowPay')} v={`${n.toFixed(2)} USDC`} />
            <Row k={t('rowReceive')} v={`≈ ${shares.toFixed(4)} HBS`} />
            <Row k={t('rowPrice')} v={`${price}`} />
            <Row k={t('rowFee')} v="< $0.01" />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-60)', margin: '0 0 20px' }}>{t('reviewBody')}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost" onClick={() => setStep('amount')}>
              {t('back')}
            </Button>
            <Button
              variant="primary"
              size="lg"
              style={{ flex: 1 }}
              onClick={() => {
                setStep('pending')
                setTimeout(() => setStep('success'), 2200)
              }}
            >
              {t('confirm')}
            </Button>
          </div>
        </Panel>
      )}

      {step === 'pending' && (
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '12px 0' }}>
            <PendingDot />
            <h1 style={{ ...h1Style, textAlign: 'center', marginTop: 18 }}>{t('pendingH1')}</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--ink-60)', margin: '0 0 14px' }}>{t('pendingSub')}</p>
            <span style={{ fontFamily: 'var(--font-data)', fontSize: 12.5, color: 'var(--ink-40)' }}>{t('pendingTx')}</span>
          </div>
        </Panel>
      )}

      {step === 'success' && (
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 6px' }}>
            <Helio size={160} motes={14} />
          </div>
          <h1 style={{ ...h1Style, textAlign: 'center' }}>{t('successH1')}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-60)', textAlign: 'center', margin: '0 0 22px' }}>
            {t.rich('successBody', { shares: shares.toFixed(4), num, b: strong })}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="secondary" style={{ flex: 1 }}>
              {t('viewExpert')}
            </Button>
            <Button variant="primary" style={{ flex: 1 }} onClick={onDone}>
              {t('goPortfolio')}
            </Button>
          </div>
        </Panel>
      )}
    </main>
  )
}

function Stepper({ step }: { step: DepositStep }) {
  const t = useTranslations('Deposit')
  const order: DepositStep[] = ['amount', 'review', 'pending', 'success']
  const labels: Record<DepositStep, string> = {
    amount: t('stepAmount'),
    review: t('stepReview'),
    pending: t('stepSign'),
    success: t('stepDone'),
  }
  const idx = order.indexOf(step)
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
      {order.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: i <= idx ? 'var(--solar)' : 'var(--ink-12)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600, color: i <= idx ? 'var(--ink)' : 'var(--ink-40)' }}>{labels[s]}</span>
          {i < order.length - 1 && <span style={{ width: 20, height: 1, background: 'var(--ink-12)' }} />}
        </div>
      ))}
    </div>
  )
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--ink-12)', borderRadius: 'var(--radius-modal)', padding: 28, boxShadow: 'var(--shadow-sm)' }}>
      {children}
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface)', padding: '13px 16px' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-60)' }}>{k}</span>
      <span style={{ fontFamily: 'var(--font-data)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{v}</span>
    </div>
  )
}

function PendingDot() {
  return (
    <div style={{ position: 'relative', width: 56, height: 56 }}>
      <svg width="56" height="56" viewBox="0 0 56 56" className="hb-orbit" style={{ animation: 'hb-orbit 1.2s linear infinite', transformOrigin: '28px 28px' }}>
        <circle cx="28" cy="28" r="22" fill="none" stroke="var(--ink-12)" strokeWidth="3" />
        <circle cx="28" cy="6" r="5" fill="var(--solar)" />
      </svg>
    </div>
  )
}

const h1Style: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 23,
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  margin: '0 0 18px',
  color: 'var(--ink)',
}
const liqLine: CSSProperties = { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-60)', margin: '14px 0 0' }
