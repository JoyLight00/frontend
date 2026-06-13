'use client'

import { useRouter } from 'next/navigation'
import { Deposit } from '../../screens/Deposit'
import { useSession } from '../providers'

export default function DepositPage() {
  const router = useRouter()
  const { setConnected } = useSession()
  return (
    <Deposit
      onDone={() => {
        setConnected(true)
        router.push('/portfolio')
      }}
    />
  )
}
