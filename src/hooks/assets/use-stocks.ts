import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

import { UserStock } from '@/models/user-stock'
import useToken from '../use-token'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const useStocks = () => {
  const router = useRouter()
  const { token } = useToken()

  const getStocksFromUser = useQuery('stocksFromUser', async () => {
    if (!token) {
      return
    }
    try {
      const { data: response } = await axios.get<UserStock>(`${apiUrl}/stocks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            router.push('/login')
            break
          default:
            break
        }
        return
      }

      throw error
    }
  })

  return { getStocksFromUser }
}

export default useStocks