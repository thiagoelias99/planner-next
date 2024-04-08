import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { UserStock } from '@/models/user-stock'
import { useRouter } from 'next/navigation'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const testToken = process.env.NEXT_PUBLIC_TOKEN

const useStocks = () => {
  const router = useRouter()

  const getStocksFromUser = useQuery('stocksFromUser', async () => {
    try {
      const { data: response } = await axios.get<UserStock>(`${apiUrl}/stocks`, {
        headers: {
          Authorization: `Bearer ${testToken}`
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