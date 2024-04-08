'use client'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/webclient/queryClient'
import { Toaster } from '@/components/ui/toaster'

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
  return (
    <html lang="pt-BR" className='dark'>
      <QueryClientProvider client={queryClient}>
        <body className={roboto.className}>
          {children}
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  )
}