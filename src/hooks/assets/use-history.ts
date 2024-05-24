import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

import { UserStock } from '@/models/user-stock'
import useToken from '../use-token'
import { AssetHistory } from '@/models/assets/history'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const useAssetHistory = () => {
  const router = useRouter()
  const { token } = useToken()

  const getAssetHistoryFromUser = useQuery('assetHistoryFromUser', async () => {
    if (!token) {
      return
    }
    try {
      const { data: response } = await axios.get<AssetHistory>(`${apiUrl}/stocks/history`, {
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

  return { getAssetHistoryFromUser }
}

export default useAssetHistory