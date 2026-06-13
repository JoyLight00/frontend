'use client'

import { useRouter } from 'next/navigation'
import { Deposit } from '../../screens/Deposit'

export default function DepositPage() {
  const router = useRouter()
  return <Deposit onDone={() => router.push('/portfolio')} />
}
