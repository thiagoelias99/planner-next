import TopBar from '@/components/topbar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <main className='pt-12'>
        {children}
      </main>
    </>
  )
}