import { useQuery } from 'react-query'
import axios from 'axios'
import useToken from '../use-token'
import { AssetsSummary } from '@/models/assets/asset-summary'

const useAssets = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { token } = useToken()

  const getSummary = useQuery({
    queryKey: 'assetsSummary',
    queryFn: async () => {
      const { data } = await axios.get<AssetsSummary>(`${apiUrl}/assets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data
    }
  })

  return { getSummary, refresh: getSummary.refetch }
}

export default useAssets