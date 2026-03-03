import './globals.css'
import type { Metadata } from 'next'
import AppContainer from '../components/AppContainer'

export const metadata: Metadata = {
  title: 'Quantum Liquid System',
  description: 'Bot de trading QLC',
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
