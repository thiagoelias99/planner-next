import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

import { UserStock } from '@/models/user-stock'
import useToken from '../use-token'
import { Stock, StockCreateDto } from '@/models/assets/stock'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const useStocks = () => {
  const router = useRouter()
  const { token } = useToken()

  const getStocks = useQuery('stocks', async () => {
    try {
      const { data: response } = await axios.get<Stock[]>(`${apiUrl}/stocks`, {
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

  const createStock = useMutation({
    mutationFn: async (stock: StockCreateDto) => {
      await axios.post(`${apiUrl}/stocks`, stock, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      getStocks.refetch()
    }
  })


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

  return { getStocksFromUser, getStocks, createStock }
}

export default useStocks