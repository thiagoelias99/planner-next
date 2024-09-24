import TopBar from '@/components/topbar'
import LayoutLoading from './_components/layout-loading'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutLoading>
      <TopBar />
      <main className='pt-12'>
        {children}
      </main>
    </LayoutLoading>
  )
}