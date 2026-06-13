import { useState, type CSSProperties } from 'react'
import { Button, AmountInput, LiquidityMeter } from '../components'

/**
 * Withdraw — designed with the most care of all. Capped at the live liquid
 * maximum; typing past it explains instead of erroring, with one-tap max.
 * No retention friction: exit is two taps and a signature.
 */
export interface WithdrawProps {
  onDone: () => void
  onBack: () => void
}

type WithdrawStep = 'amount' | 'pending' | 'success'

export function Withdraw({ onDone, onBack }: WithdrawProps) {
  const liquid = 236 // your liquid share, $
  const [step, setStep] = useState<WithdrawStep>('amount')
  const [amount, setAmount] = useState('300')
  const n = parseFloat(amount) || 0

  return (
    <main style={{ maxWidth: 520, margin: '0 auto', padding: '48px 24px 80px' }}>
      {step === 'amount' && (
        <div style={panel}>
          <h1 style={hw}>Withdraw from the pool</h1>
          <div style={{ marginBottom: 18 }}>
            <LiquidityMeter liquid={liquid} total={482} currency="$" />
          </div>
          <AmountInput
            value={amount}
            onChange={setAmount}
            currency="USDC"
            balanceLabel="Your value"
            balance="482.00"
            chips={[25, 50, 100]}
            cap={liquid}
            capMessage={`The pool holds limited liquidity right now; the rest is working in projects. You can withdraw up to $${liquid} today, or any part of it.`}
          />
          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%', marginTop: 20 }}
            disabled={n < 1 || n > liquid}
            reason={n > liquid ? 'Amount exceeds what is liquid right now — use Max' : n < 1 ? 'Enter an amount of at least 1 USDC' : undefined}
            onClick={() => {
              setStep('pending')
              setTimeout(() => setStep('success'), 2000)
            }}
          >
            {n >= 1 && n <= liquid ? `Withdraw $${n}` : 'Withdraw'}
          </Button>
          <button
            onClick={onBack}
            className="hb-textlink"
            style={{ display: 'block', width: '100%', marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink-60)' }}
          >
            Cancel
          </button>
        </div>
      )}

      {step === 'pending' && (
        <div style={panel}>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h1 style={hw}>Processing your withdrawal</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--ink-60)', margin: 0 }}>Usually ~5 seconds on Stellar. tx 4d2c…9af1 ↗</p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div style={panel}>
          <h1 style={{ ...hw, textAlign: 'center' }}>Withdrawal settled</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-60)', textAlign: 'center', margin: '0 0 22px' }}>
            <b className="hb-data" style={{ color: 'var(--ink)' }}>${n.toFixed(2)} USDC</b> is on its way to your wallet. Thanks for being part of the pool.
          </p>
          <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={onDone}>
            Back to portfolio
          </Button>
        </div>
      )}
    </main>
  )
}

const panel: CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--ink-12)',
  borderRadius: 'var(--radius-modal)',
  padding: 28,
  boxShadow: 'var(--shadow-sm)',
}
const hw: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 23,
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  margin: '0 0 18px',
  color: 'var(--ink)',
}
