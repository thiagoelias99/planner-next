'use client'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/webclient/queryClient'
import { Toaster } from '@/components/ui/toaster'
import TopBar from '@/components/topbar'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})

// export const metadata: Metadata = {
//   title: 'Planner',
//   description: 'Aplicativo de planejamento financeiro pessoal.',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headerHeight = '14'

  return (
    <html lang="pt-BR" className=''>
      <QueryClientProvider client={queryClient}>
        <body className={roboto.className}>
          <TopBar height={headerHeight} />
          <main className={`pt-${headerHeight}`}>
            {children}
          </main>
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  )
}