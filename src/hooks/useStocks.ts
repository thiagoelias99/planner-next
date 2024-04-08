import { useQuery } from 'react-query'
import axios from 'axios'
import { UserStock } from '@/models/user-stock'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const testToken = process.env.NEXT_PUBLIC_TOKEN

const useStocks = () => {
  const getStocksFromUser = useQuery('stocksFromUser', async () => {
    const { data: response } = await axios.get<UserStock>(`${apiUrl}/stocks`, {
      headers: {
        Authorization: `Bearer ${testToken}`
      }
    })
    return response
  })

  return { getStocksFromUser }
}

export default useStocks