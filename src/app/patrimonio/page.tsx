'use client'

import { Button } from '@/components/ui/button'
import { Header1 } from '@/components/ui/typography'
import HistoryItem from './components/history-item'
import useAssetHistory from '@/hooks/assets/use-history'
import ModuleBar from '@/components/module-bar'
import { useRouter } from 'next/navigation'
import PageLoading from '@/components/page-loading'

export default function Assets() {
  const { getAssetHistoryFromUser } = useAssetHistory()
  const history = getAssetHistoryFromUser.data
  const router = useRouter()

  return (
    <div className='w-full h-full pb-4 max-w-[1539px] m-auto'>
      {getAssetHistoryFromUser.isLoading && <PageLoading />}
      {history && (
        <div>
          <ModuleBar
            backFunction={router.back}
            className='px-4 pt-4'
          />
          <div className='w-full p-4 flex flex-row justify-end items-center gap-2'>
            <Button>2024</Button>
            <Button>Maio</Button>
          </div>
          <section className='px-4'>
            <Header1>Resultados do Mês</Header1>
            <div className='w-full mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              <HistoryItem
                title='Investimentos'
                {...history?.general}
              />
              <HistoryItem
                title='Ações'
                {...history?.stocks}
              />
              <HistoryItem
                title='FIIs'
                {...history?.reits}
              />
              <HistoryItem
                title='Internacionais'
                {...history?.internationals}
              />
              <HistoryItem
                title='Criptomoedas'
                {...history?.cryptos}
              />
              <HistoryItem
                title='Ouro'
                {...history?.gold}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
