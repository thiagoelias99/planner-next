'use client'

import { usePathname } from 'next/navigation'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/webclient/queryClient'
import { Toaster } from '@/components/ui/toaster'
import TopBar from '@/components/topbar'
import { useEffect } from 'react'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const pathname = usePathname()

  return (
    <html lang="pt-BR" className=''>
      <QueryClientProvider client={queryClient}>
        <body className={roboto.className}>
          {/* If current route is login, don't show the top bar */}
          {pathname !== '/login' && <TopBar />}
          <main className={`${pathname === '/login' ? 'pt-0' : 'pt-12'}`}
          >
            {children}
          </main>
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  )
}