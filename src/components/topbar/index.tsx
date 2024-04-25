'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Menu } from 'lucide-react'

import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'
import LinkItem from './link-item'
import useLogin from '@/hooks/use-login'

const TopBar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { logout } = useLogin()
  const router = useRouter()

  function handleLogout() {
    logout()
    setIsSheetOpen(false)
    router.push('/login')
  }

  return (
    <header className='w-screen fixed h-12 px-4 bg-card flex flex-row justify-start items-center'>
      <Sheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <SheetTrigger asChild>
          <Button size='icon' variant='ghost'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='h-full flex flex-col'>
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
              <ul className='flex flex-col gap-4 px-4'
                onClick={() => setIsSheetOpen(false)}>
                <LinkItem href='/' label='Home' />
                <LinkItem href='/stocks' label='Stocks' />
                <LinkItem href='/budgets' label='Orçamento' />
              </ul>
            </nav>
          </div>
          <SheetFooter>

            <p className='text-lg w-full cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </p>

            <p className='mt-4 text-center text-sm text-gray-500'>
              Thiago Elias © 2024 All rights reserved
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default TopBar