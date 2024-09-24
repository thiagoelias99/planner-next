/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import PageLoading from '@/components/page-loading'
import useToken from '@/hooks/use-token'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GetTokenPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const storage = searchParams.get('storage')
  const { setToken } = useToken()

  useEffect(() => {
    console.log(token, storage)

    if (token && storage) {
      setToken(token, storage as 'local' | 'session')
      router.push('/')
    }
  }, [token, storage])

  return (
    <PageLoading />
  )
}