import React from 'react'

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
    <div>{params.slug}</div>
  )
}
