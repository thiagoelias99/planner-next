'use client'

import NextLink from 'next/link'

import { Button } from '@/components/ui/button'
import useToken from '@/hooks/use-token'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export default function Budgets() {
  const [date, setDate] = useState(new Date())
  // Token is required to access this page
  const { token } = useToken()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  function setInputDate(date) {
    const [year, month] = date.split('-')
    setDate(curr => new Date(Number(year), Number(month) - 1, curr.getDate()))
  }

  return (
    <div className='flex flex-col gap-4'>
      <section className='w-full p-4 flex flex-col'>
        <div className='w-full border rounded-lg'>
          <div className='w-full bg-card h-12 rounded-t-lg'></div>
          <div className='px-4 py-6 w-full flex flex-col justify-center items-center gap-4'>
            <input
              type="month"
              min="2020-01"
              value={format(date, 'yyyy-MM')}
              onChange={(e) => setInputDate(e.target.value)}
              className='bg-transparent text-xl font-semibold text-center'
            />
          </div>
        </div>
        <NextLink
          href={`/budgets/${date.getFullYear()}-${date.getMonth()}`}
          className='w-full mt-4'
        >
          <Button
            className='w-full'
          >Abrir</Button>
        </NextLink>
      </section>
    </div>
  )
}