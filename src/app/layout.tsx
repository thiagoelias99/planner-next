import './globals.css'
import localFont from 'next/font/local'
import Providers from '@/providers'
import { Suspense } from 'react'
import PageLoading from '@/components/page-loading'

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

  return (
    <html lang="pt-BR" className='dark'>
      <body className={`overflow-y-auto [&::-webkit-scrollbar]:hidden ${virgil.className}`}>
        <Providers>
          <Suspense fallback={<PageLoading />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}