'use client'

import NextLink from 'next/link'

import { Button } from '@/components/ui/button'
import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Budgets() {
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return (
    <div className='flex flex-col gap-4'>
      <section className='w-full p-4 flex flex-col'>
        <NextLink
          href={`/budgets/${currentYear}-${currentMonth}`}
          className='w-full'
        >
          <Button
            className='w-full'
          >Abrir mês atual</Button>
        </NextLink>
      </section>
    </div>
  )
}