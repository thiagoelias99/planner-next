'use client'

import { Button } from '@/components/ui/button'
import { Header1 } from '@/components/ui/typography'
import HistoryItem from './components/history-item'

export default function Assets() {
  return (
    <div className='w-full h-full'>
      <div className='w-full p-4 flex flex-row justify-end items-center gap-2'>
        <Button>2024</Button>
        <Button>Maio</Button>
      </div>
      <section className='px-4'>
        <Header1>Resultados do Mês</Header1>
        <div className='w-full mt-4 grid gap-4'>
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
        </div>
      </section>
    </div>
  )
}
