'use client'

import { useRouter } from 'next/navigation'
import { Connect } from '../../screens/Connect'
import { useSession } from '../providers'

export default function ConnectPage() {
  const router = useRouter()
  const { setConnected } = useSession()
  return (
    <Connect
      onConnected={() => {
        setConnected(true)
        router.push('/deposit')
      }}
      onCancel={() => router.push('/explore')}
    />
  )
}
