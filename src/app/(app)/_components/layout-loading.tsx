/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useToken from '@/hooks/use-token'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

export default function LayoutLoading({ children }: PropsWithChildren) {
  const [isServerOnline, setIsServerOnline] = useState(false)
  const { token } = useToken()
  const router = useRouter()

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
    if (!token) {
      router.push('/login')
    }

    checkServer()
  }, [token])

  return (
    <div>
      {!isServerOnline ? (
        <div className='fixed inset-0 w-screen h-screen bg-card flex items-center justify-center'>
          <div className='flex flex-col items-center space-y-4'>
            <h1 className='text-4xl font-bold text-center'>Esperando servidor</h1>
            <Loader2Icon className='size-12 animate-spin' />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
