import React from 'react'
import AssetsContainer from './assets-container'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NextLink from 'next/link'

interface Props {
  className?: ClassNameValue
}

export default function AssetsSection({ className }: Props) {
  return (
    <section className={cn('', className)}>
      <Card>
        <CardHeader>
          <NextLink href='/assets'>
            <CardTitle>Assets</CardTitle>
          </NextLink>
        </CardHeader>
        <CardContent>
          <AssetsContainer />
        </CardContent>
      </Card>
    </section>
  )
}
