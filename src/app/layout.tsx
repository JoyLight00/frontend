import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import { TopBar } from '../shell/TopBar'
import { Footer } from '../shell/Footer'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'Heliobond — sunlight made financial',
  description:
    'Own a piece of the energy transition. From one dollar. A transparent pool funding verified green projects on Stellar.',
  icons: { icon: '/assets/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#F3F5F1',
}

/**
 * Root layout (Server Component). Holds the persistent shell — TopBar + Footer —
 * around the routed page. The client SessionProvider wraps everything so wallet
 * state survives client-side navigation between routes.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
