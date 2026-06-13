'use client'

import { useRouter } from 'next/navigation'
import { Explore } from '../../screens/Explore'
import { useSession } from '../providers'

export default function ExplorePage() {
  const router = useRouter()
  const { connected } = useSession()
  return <Explore onOpen={() => router.push(connected ? '/deposit' : '/connect')} />
}
