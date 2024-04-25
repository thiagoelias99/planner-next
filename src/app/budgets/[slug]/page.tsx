import React from 'react'
import { GraphSection } from './components/graph-section'
import SummarySection from './components/summary-section'

interface Props {
  params: {
    slug?: string
  }
}

export default function MonthSummary({ params }: Props) {
  if (!params.slug) {
    //TODO: redirect to 404
    return (
      <div>404</div>
    )
  }

  return (
    <div>
      <GraphSection
        incomes={100}
        expenses={100}
      />
      <SummarySection />
    </div>
  )
}
