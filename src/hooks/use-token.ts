import { useState } from 'react'

const useToken = () => {
  const [token, setToken2] = useState<string | null | undefined>(
    typeof window !== 'undefined'
      ? localStorage?.getItem('token') || sessionStorage?.getItem('token') || null
      : null
  )

  const setToken = (token: string | null, storage: 'local' | 'session' = 'local') => {
    if (token === null){
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
      }

      return
    }
    if (typeof window !== 'undefined') {
      if (storage === 'local') {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }
    }
    setToken2(token)
  }

  return { token, setToken }
}

export default useToken