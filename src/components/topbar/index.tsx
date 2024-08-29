'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CheckIcon, Loader2Icon, Menu } from 'lucide-react'

import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'
import LinkItem from './link-item'
import useLogin from '@/hooks/use-login'

const TopBar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isServerOnline, setIsServerOnline] = useState(false)
  const { logout } = useLogin()
  const router = useRouter()

  function handleLogout() {
    logout()
    setIsSheetOpen(false)
    router.push('/login')
  }

  const checkServer = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string)
      if (response.ok) {
        setIsServerOnline(true)
      }
    } catch (error) {
      setIsServerOnline(false)
    }
  }

  useEffect(() => {
    checkServer()
  }, [])

  return (
    <header className='w-screen fixed h-12 px-4 bg-card flex flex-row justify-between items-center z-10'>
      <Sheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <SheetTrigger asChild>
          <Button size='icon' variant='ghost'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='h-full flex flex-col px-4 mx-0'>
          <SheetHeader className='w-full flex justify-center items-center'>
            <div className='relative w-20 h-20 '>
              <Image
                src="/logo-1024.png"
                alt="App logo"
                fill
                objectFit='contain'
              />
            </div>
          </SheetHeader>
          <div className='flex-1'>
            <nav>
              <ul className='flex flex-col gap-4'
                onClick={() => setIsSheetOpen(false)}>
                <LinkItem href='/' label='Home' />
                <LinkItem href='/todo' label='To-Dos' />
                <LinkItem href='/assets' label='Assets' />
                <LinkItem href='/budgets' label='Budgets' />
              </ul>
            </nav>
          </div>
          <SheetFooter className='w-full px-2 flex flex-col justify-start items-start'>
            <p className='w-full text-lg hover:bg-primary px-2 py-2 rounded hover:text-primary-foreground cursor-pointer transition-colors duration-300'
              onClick={handleLogout}
            >Logout</p>

            <p className='mt-4 w-full text-center text-sm text-gray-500'>
              Thiago Elias © 2024 All rights reserved
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className='flex flex-row justify-end items-center gap-2'>
        <span className='text-sm'>Server</span>
        {isServerOnline ? <CheckIcon className='' /> : <Loader2Icon className='animate-spin' />}
      </div>
    </header>
  )
}

export default TopBar