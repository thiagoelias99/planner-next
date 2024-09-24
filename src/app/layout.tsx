// 'use client'

// import { usePathname } from 'next/navigation'
// import type { Metadata } from 'next'
// import { Roboto, Mali } from 'next/font/google'
import './globals.css'
// import { QueryClientProvider } from 'react-query'
// import { queryClient } from '@/services/webclient/queryClient'
import localFont from 'next/font/local'

// import TopBar from '@/components/topbar'
// import { useEffect } from 'react'
// import { Toaster } from '@/components/ui/toaster'
import Providers from '@/providers'
import { Suspense } from 'react'
import PageLoading from '@/components/page-loading'

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: '400'
// })

// const mali = Mali({
//   subsets: ['latin'],
//   weight: ['300', '400', '600', '700']
// })

const virgil = localFont({
  src: '/fonts/virgil.woff2',
  weight: '400',
  style: 'normal'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // const pathname = usePathname()

  return (
    <html lang="pt-BR" className='dark'>
      {/* <QueryClientProvider client={queryClient}> */}
      <body className={`overflow-y-auto [&::-webkit-scrollbar]:hidden ${virgil.className}`}>
        <Providers>
          {/* If current route is login, don't show the top bar */}
          {/* {pathname !== '/login' && <TopBar />} */}
          {/* <main className={`${pathname === '/login' ? 'pt-0' : 'pt-12'}`}          > */}
          <Suspense fallback={<PageLoading />}>
            {children}
          </Suspense>
          {/* </main> */}
          {/* <Toaster /> */}
        </Providers>
      </body>
      {/* </QueryClientProvider> */}
    </html>
  )
}