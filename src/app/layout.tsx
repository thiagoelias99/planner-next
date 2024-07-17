'use client'

import { usePathname } from 'next/navigation'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/webclient/queryClient'

import TopBar from '@/components/topbar'
import { useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'

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
    <html lang="pt-BR" className='dark'>
      <QueryClientProvider client={queryClient}>
        <body className={`overflow-y-auto [&::-webkit-scrollbar]:hidden ${roboto.className}`}>
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