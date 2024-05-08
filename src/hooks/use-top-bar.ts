import { LucideIcon, Plus } from 'lucide-react'
import { use, useEffect, useState } from 'react'

export interface ITopBarLink {
  Icon: LucideIcon
  onClick?: () => void
}

const useTopBar = () => {
  const [links, setLinks] = useState<ITopBarLink[]>([])

  useEffect(() => {
    console.log(links)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links])

  return { links, setLinks }
}

export default useTopBar