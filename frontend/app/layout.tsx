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
      <body className="bg-[#020617] text-slate-200 selection:bg-[#00ff88]/30 font-sans overflow-x-hidden">
        <AppContainer>
          {children}
        </AppContainer>
      </body>
    </html>
  )
}
