import './globals.css'
import type { Metadata } from 'next'
import AppContainer from '../components/AppContainer'

export const metadata: Metadata = {
  title: 'QLS Robô Premium',
  description: 'Bot de trading QLS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  )
}
