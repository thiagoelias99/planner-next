import { Header1 } from '@/components/ui/typography'
import React from 'react'
import SummaryCard from './summary-card'

export default function SummarySection() {
  return (
    <section className='px-4'>
      <Header1>Sumário</Header1>
      <div className='w-full mt-2 grid grid-cols-3 gap-2'>
        <SummaryCard title='Renda' value={899.99} previewValue={1799.99} />
        <SummaryCard title='Despesa' value={50} previewValue={500} />
        <SummaryCard title='Saldo' value={849.99} previewValue={1299.99} />
      </div>
    </section>
  )
}
