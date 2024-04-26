import { useState } from 'react'

const useToken = () => {
  const [token, setToken] = useState<string | null | undefined>(
    typeof window !== 'undefined'
      ? localStorage?.getItem('token') || sessionStorage?.getItem('token') || null
      : null
  )

  return { token, setToken }
}

export default useToken